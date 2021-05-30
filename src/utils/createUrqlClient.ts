import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import Router from "next/router";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import { LoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from "./isServer";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error) {
          if (error?.message.includes("not authenticated")) {
            Router.replace("/login");
          }
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const inCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "users"
    );
    info.partial = !inCache;
    const result: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "users") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      result.push(...data);
    });
    return {
      __typename: "PaginatedUsers",
      hasMore,
      users: result,
    };
  };
};

const invalidateAllUsers = (cache: Cache) => {
  const key = "Query";
  const field = "getUsers";
  const allFields = cache.inspectFields(key);
  const fieldInfos = allFields.filter((info) => info.fieldName === field);
  fieldInfos.forEach((fi) => {
    cache.invalidate(key, field, fi.arguments || {});
  });
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedUsers: () => null,
        },
        resolvers: {
          Query: {
            users: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            changeUserStatus: (_result, args, cache, info) => {
              invalidateAllUsers(cache);
              // console.log(cache);
              // const key = "Query";
              // const fields = cache
              //   .inspectFields(key)
              //   .filter((field) => (field.fieldName = "User"))
              //   .forEach((field) => {
              //     console.log(field);
              //     cache.invalidate(key, field.fieldName, field.arguments);
              //   });
              // cache.invalidate({
              //   __typename: "User",
              //   id: (args as ChangeUserStatusMutationVariables).id,
              // });
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login?.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login?.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
