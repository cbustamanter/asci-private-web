import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import Router from "next/router";
import { dedupExchange, Exchange, stringifyVariables } from "urql";
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
const invalidateAllUsers = (cache: Cache) => {
  const key = "Query";
  const field = "getUsers";
  const allFields = cache.inspectFields(key);
  const fieldInfos = allFields.filter((info) => info.fieldName === field);
  fieldInfos.forEach((fi) => {
    cache.invalidate(key, field, fi.arguments || {});
  });
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
    let result: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "users") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      result = data;
    });
    return {
      __typename: "PaginatedUsers",
      hasMore,
      users: result,
    };
  };
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
          PaginatedCourses: () => null,
          CourseDetail: () => null,
          CourseSession: () => null,
        },
        resolvers: {
          Query: {
            getUsers: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            createUser: (_result, args, cache, info) => {
              invalidateAllUsers(cache);
            },
            changeUserStatus: (_result, args, cache, info) => {
              invalidateAllUsers(cache);
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
      multipartFetchExchange,
    ],
  };
};
