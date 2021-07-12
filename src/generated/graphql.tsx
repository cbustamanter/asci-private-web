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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Course = {
  __typename?: 'Course';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  status: Scalars['Int'];
  hasTest: Scalars['Boolean'];
  courseDetail: CourseDetail;
  users?: Maybe<Array<User>>;
  totalUsers: Scalars['Int'];
  statusText: Scalars['String'];
  hasTestText: Scalars['String'];
};

export type CourseDetail = {
  __typename?: 'CourseDetail';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  coverPhoto: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  classUrl: Scalars['String'];
  courseSessions: Array<CourseSession>;
};

export type CourseSession = {
  __typename?: 'CourseSession';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  recordingUrl: Scalars['String'];
  courseDetail: CourseDetail;
  sessionFiles?: Maybe<Array<SessionFile>>;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  errors?: Maybe<Array<FieldError>>;
  response?: Maybe<Scalars['Boolean']>;
};

export type InputCourseDetail = {
  hasTest: Scalars['Boolean'];
  name: Scalars['String'];
  description: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  classUrl: Scalars['String'];
  coverPhoto: Scalars['Upload'];
};

export type InputCourseSession = {
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  recordingUrl: Scalars['String'];
  files?: Maybe<Array<Scalars['Upload']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: Course;
  removeSessionFile: Scalars['Boolean'];
  singleUpload: UploadedFileResponse;
  createUser: UserResponse;
  login?: Maybe<UserResponse>;
  changeUserStatus: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  updateUser: UserResponse;
  forgotPassword: ForgotPasswordResponse;
  changePassword: UserResponse;
};


export type MutationCreateCourseArgs = {
  courseSessions: Array<InputCourseSession>;
  courseDetail: InputCourseDetail;
};


export type MutationRemoveSessionFileArgs = {
  courseSessionId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
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


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  prev?: Maybe<Scalars['Int']>;
  data: Array<Course>;
  totalPages: Scalars['Int'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users: Array<User>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  courses: PaginatedCourses;
  course?: Maybe<Course>;
  me?: Maybe<User>;
  getUsers: PaginatedUsers;
  getUser: User;
};


export type QueryCoursesArgs = {
  per_page?: Maybe<Scalars['Int']>;
  page: Scalars['Int'];
};


export type QueryCourseArgs = {
  id: Scalars['String'];
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

export type SessionFile = {
  __typename?: 'SessionFile';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  filename?: Maybe<Scalars['String']>;
  courseSession: CourseSession;
};


export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  url: Scalars['String'];
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
  courses?: Maybe<Array<Course>>;
  genderText: Scalars['String'];
  statusText: Scalars['String'];
  statusAction: Scalars['String'];
  totalCourses: Scalars['Int'];
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
  & Pick<User, 'id' | 'names' | 'surnames' | 'email' | 'status' | 'statusText' | 'statusAction' | 'cellphone' | 'gender' | 'genderText' | 'role' | 'country' | 'createdAt' | 'totalCourses'>
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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ChangeUserStatusMutationVariables = Exact<{
  id: Scalars['String'];
  status: Scalars['Int'];
}>;


export type ChangeUserStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeUserStatus'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateCourseMutationVariables = Exact<{
  courseDetail: InputCourseDetail;
  courseSessions: Array<InputCourseSession> | InputCourseSession;
}>;


export type CreateCourseMutation = (
  { __typename?: 'Mutation' }
  & { createCourse: (
    { __typename?: 'Course' }
    & Pick<Course, 'status'>
    & { courseDetail: (
      { __typename?: 'CourseDetail' }
      & Pick<CourseDetail, 'coverPhoto' | 'name'>
      & { courseSessions: Array<(
        { __typename?: 'CourseSession' }
        & Pick<CourseSession, 'name'>
        & { sessionFiles?: Maybe<Array<(
          { __typename?: 'SessionFile' }
          & Pick<SessionFile, 'filename'>
        )>> }
      )> }
    ) }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'ForgotPasswordResponse' }
    & Pick<ForgotPasswordResponse, 'response'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
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

export type RemoveSessionFileMutationVariables = Exact<{
  id: Scalars['String'];
  courseSessionId: Scalars['String'];
}>;


export type RemoveSessionFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeSessionFile'>
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  input: UserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CourseQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course?: Maybe<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'hasTest'>
    & { courseDetail: (
      { __typename?: 'CourseDetail' }
      & Pick<CourseDetail, 'id' | 'name' | 'description' | 'coverPhoto' | 'classUrl' | 'startDate' | 'endDate'>
      & { courseSessions: Array<(
        { __typename?: 'CourseSession' }
        & Pick<CourseSession, 'id' | 'name' | 'startTime' | 'endTime' | 'recordingUrl'>
        & { sessionFiles?: Maybe<Array<(
          { __typename?: 'SessionFile' }
          & Pick<SessionFile, 'id' | 'filename'>
        )>> }
      )> }
    ) }
  )> }
);

export type CoursesQueryVariables = Exact<{
  page: Scalars['Int'];
  per_page?: Maybe<Scalars['Int']>;
}>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: (
    { __typename?: 'PaginatedCourses' }
    & Pick<PaginatedCourses, 'prev' | 'totalPages'>
    & { data: Array<(
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'totalUsers' | 'statusText' | 'hasTestText'>
      & { courseDetail: (
        { __typename?: 'CourseDetail' }
        & Pick<CourseDetail, 'name' | 'coverPhoto'>
        & { courseSessions: Array<(
          { __typename?: 'CourseSession' }
          & Pick<CourseSession, 'name'>
          & { sessionFiles?: Maybe<Array<(
            { __typename?: 'SessionFile' }
            & Pick<SessionFile, 'id' | 'filename'>
          )>> }
        )> }
      ) }
    )> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
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
  statusAction
  cellphone
  gender
  genderText
  role
  country
  createdAt
  totalCourses
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ChangeUserStatusDocument = gql`
    mutation changeUserStatus($id: String!, $status: Int!) {
  changeUserStatus(id: $id, status: $status)
}
    `;

export function useChangeUserStatusMutation() {
  return Urql.useMutation<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>(ChangeUserStatusDocument);
};
export const ChangePasswordDocument = gql`
    mutation changePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCourseDocument = gql`
    mutation createCourse($courseDetail: InputCourseDetail!, $courseSessions: [InputCourseSession!]!) {
  createCourse(courseDetail: $courseDetail, courseSessions: $courseSessions) {
    status
    courseDetail {
      coverPhoto
      name
      courseSessions {
        name
        sessionFiles {
          filename
        }
      }
    }
  }
}
    `;

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const CreateUserDocument = gql`
    mutation createUser($input: UserInput!) {
  createUser(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      ...RegularError
    }
    response
  }
}
    ${RegularErrorFragmentDoc}`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
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
export const RemoveSessionFileDocument = gql`
    mutation removeSessionFile($id: String!, $courseSessionId: String!) {
  removeSessionFile(id: $id, courseSessionId: $courseSessionId)
}
    `;

export function useRemoveSessionFileMutation() {
  return Urql.useMutation<RemoveSessionFileMutation, RemoveSessionFileMutationVariables>(RemoveSessionFileDocument);
};
export const UpdateUserDocument = gql`
    mutation updateUser($id: String!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const CourseDocument = gql`
    query course($id: String!) {
  course(id: $id) {
    id
    hasTest
    courseDetail {
      id
      name
      description
      coverPhoto
      classUrl
      startDate
      endDate
      courseSessions {
        id
        name
        startTime
        endTime
        recordingUrl
        sessionFiles {
          id
          filename
        }
      }
    }
  }
}
    `;

export function useCourseQuery(options: Omit<Urql.UseQueryArgs<CourseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseQuery>({ query: CourseDocument, ...options });
};
export const CoursesDocument = gql`
    query courses($page: Int!, $per_page: Int) {
  courses(page: $page, per_page: $per_page) {
    prev
    totalPages
    data {
      id
      totalUsers
      statusText
      hasTestText
      courseDetail {
        name
        coverPhoto
        courseSessions {
          name
          sessionFiles {
            id
            filename
          }
        }
      }
    }
  }
}
    `;

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
};
export const GetUserDocument = gql`
    query getUser($id: String!) {
  getUser(id: $id) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
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