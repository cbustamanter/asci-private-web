import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
  login?: Maybe<UserResponse>;
  changeUserStatus: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  updateUser: UserResponse;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationChangeUserStatusArgs = {
  status: Scalars['Int'];
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UserInput;
  id: Scalars['String'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users: Array<User>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUsers: PaginatedUsers;
  getUser: User;
};


export type QueryGetUsersArgs = {
  cursor?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  names: Scalars['String'];
  surnames: Scalars['String'];
  gender: Scalars['Int'];
  cellphone: Scalars['String'];
  email: Scalars['String'];
  status: Scalars['Int'];
  role: Scalars['Int'];
  country: Scalars['String'];
  genderText: Scalars['String'];
  statusText: Scalars['String'];
};

export type UserInput = {
  names?: Maybe<Scalars['String']>;
  surnames?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  cellphone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'names' | 'surnames' | 'email' | 'status' | 'statusText' | 'cellphone' | 'gender' | 'genderText' | 'role' | 'country'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangeUserStatusMutationVariables = Exact<{
  id: Scalars['String'];
  status: Scalars['Int'];
}>;


export type ChangeUserStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeUserStatus'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  )> }
);

export type GetUsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: (
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'hasMore'>
    & { users: Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  names
  surnames
  email
  status
  statusText
  cellphone
  gender
  genderText
  role
  country
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangeUserStatusDocument = gql`
    mutation changeUserStatus($id: String!, $status: Int!) {
  changeUserStatus(id: $id, status: $status)
}
    `;

export function useChangeUserStatusMutation() {
  return Urql.useMutation<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>(ChangeUserStatusDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const GetUsersDocument = gql`
    query getUsers($limit: Int!, $cursor: String, $status: Int, $search: String) {
  getUsers(limit: $limit, cursor: $cursor, status: $status, search: $search) {
    users {
      ...RegularUser
    }
    hasMore
  }
}
    ${RegularUserFragmentDoc}`;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};