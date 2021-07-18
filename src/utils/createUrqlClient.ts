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

const invalidateList = (cache: Cache, key: string, field: string) => {
  const allFields = cache.inspectFields(key);
  const fieldInfos = allFields.filter((info) => info.fieldName === field);
  fieldInfos.forEach((fi) => {
    cache.invalidate(key, field, fi.arguments || {});
  });
};

const invalidateAllUsers = (cache: Cache) => {
  const key = "Query";
  const field = "users";
  invalidateList(cache, key, field);
};

const invalidateAllCourses = (cache: Cache) => {
  const key = "Query";
  const field = "courses";
  invalidateList(cache, key, field);
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
          Query: {},
        },
        updates: {
          Mutation: {
            createUser: (_result, args, cache, info) => {
              invalidateAllUsers(cache);
            },
            updateUser: (_result, args, cache, info) => {
              invalidateAllUsers(cache);
            },
            changeUserStatus: (_result, args, cache, info) => {
              invalidateAllUsers(cache);
            },
            createCourse: (_result, args, cache, info) => {
              invalidateAllCourses(cache);
            },
            updateCourse: (_result, args, cache, info) => {
              invalidateAllCourses(cache);
            },
            changeCourseStatus: (_result, args, cache, info) => {
              invalidateAllCourses(cache);
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
