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

export type Answer = {
  __typename?: 'Answer';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  text: Scalars['String'];
  isCorrect: Scalars['Boolean'];
  question: Question;
};

export type Course = {
  __typename?: 'Course';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  status: Scalars['Int'];
  courseDetail: CourseDetail;
  quizz?: Maybe<Quizz>;
  users?: Maybe<Array<User>>;
  totalUsers: Scalars['Int'];
  statusText: Scalars['String'];
  statusAction: Scalars['String'];
  hasTestText: Scalars['String'];
};

export type CourseDetail = {
  __typename?: 'CourseDetail';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  coverPhoto?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  classUrl: Scalars['String'];
  hasTest: Scalars['Boolean'];
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
  courseSessionFiles?: Maybe<Array<SessionFile>>;
  condition: SessionStatus;
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

export type InputAnswers = {
  id?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  isCorrect: Scalars['Boolean'];
};

export type InputCourseDetail = {
  hasTest?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  classUrl?: Maybe<Scalars['String']>;
  coverPhoto?: Maybe<Scalars['Upload']>;
};

export type InputCourseSession = {
  name?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  recordingUrl?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Scalars['Upload']>>;
};

export type InputCourseSessionUpdate = {
  name?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  recordingUrl?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Scalars['Upload']>>;
  id?: Maybe<Scalars['String']>;
  courseSessionFiles?: Maybe<Array<SessionFileType>>;
};

export type InputQuestion = {
  id?: Maybe<Scalars['String']>;
  statement: Scalars['String'];
  score: Scalars['Int'];
  answers?: Maybe<Array<Maybe<InputAnswers>>>;
};

export type InputQuizz = {
  id: Scalars['String'];
  description: Scalars['String'];
  availableTime: Scalars['Int'];
  timeToComplete: Scalars['Int'];
  questions?: Maybe<Array<Maybe<InputQuestion>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: Scalars['Boolean'];
  updateCourse: Scalars['Boolean'];
  deleteSession: Scalars['Boolean'];
  changeCourseStatus: Scalars['Boolean'];
  updateQuizz: Scalars['Boolean'];
  createUser: UserResponse;
  login?: Maybe<UserResponse>;
  changeUserStatus: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  usersToCourse?: Maybe<Scalars['Boolean']>;
  updateUser: UserResponse;
  forgotPassword: ForgotPasswordResponse;
  changePassword: UserResponse;
};


export type MutationCreateCourseArgs = {
  courseSessions?: Maybe<Array<Maybe<InputCourseSession>>>;
  courseDetail: InputCourseDetail;
};


export type MutationUpdateCourseArgs = {
  courseSessions?: Maybe<Array<Maybe<InputCourseSessionUpdate>>>;
  courseDetail?: Maybe<InputCourseDetail>;
  id: Scalars['String'];
};


export type MutationDeleteSessionArgs = {
  id: Scalars['String'];
};


export type MutationChangeCourseStatusArgs = {
  status: Scalars['Int'];
  id: Scalars['String'];
};


export type MutationUpdateQuizzArgs = {
  args: InputQuizz;
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


export type MutationUsersToCourseArgs = {
  courseId: Scalars['String'];
  ids: Array<Scalars['String']>;
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

export type PaginatedArgs = {
  status?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
  per_page?: Maybe<Scalars['Int']>;
};

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  prev?: Maybe<Scalars['Int']>;
  totalPages: Scalars['Int'];
  data: Array<Course>;
};

export type PaginatedQuizzes = {
  __typename?: 'PaginatedQuizzes';
  prev?: Maybe<Scalars['Int']>;
  totalPages: Scalars['Int'];
  data: Array<Quizz>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  prev?: Maybe<Scalars['Int']>;
  totalPages: Scalars['Int'];
  data: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  courses: PaginatedCourses;
  course?: Maybe<Course>;
  userCourse: CourseDetail;
  session?: Maybe<CourseSession>;
  quizzes: PaginatedQuizzes;
  quizz: Quizz;
  me?: Maybe<User>;
  users: PaginatedUsers;
  getUser: User;
  searchUsers?: Maybe<Array<User>>;
  userCourses: Array<Course>;
};


export type QueryCoursesArgs = {
  args: PaginatedArgs;
};


export type QueryCourseArgs = {
  id: Scalars['String'];
};


export type QueryUserCourseArgs = {
  courseId: Scalars['String'];
};


export type QuerySessionArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryQuizzesArgs = {
  args: PaginatedArgs;
};


export type QueryQuizzArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  args: PaginatedArgs;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  courseId: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  statement: Scalars['String'];
  score: Scalars['Int'];
  answers?: Maybe<Array<Answer>>;
  quizzDetail: QuizzDetail;
};

export type Quizz = {
  __typename?: 'Quizz';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  status: Scalars['Int'];
  course: Course;
  quizzDetail?: Maybe<QuizzDetail>;
  statusText: Scalars['String'];
};

export type QuizzDetail = {
  __typename?: 'QuizzDetail';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  description: Scalars['String'];
  availableTime: Scalars['Int'];
  timeToComplete: Scalars['Int'];
  quizz: Quizz;
  questions: Array<Question>;
};

export type SessionFile = {
  __typename?: 'SessionFile';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  filename?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  encoding?: Maybe<Scalars['String']>;
  courseSession: CourseSession;
};

export type SessionFileType = {
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  encoding?: Maybe<Scalars['String']>;
};

export type SessionStatus = {
  __typename?: 'SessionStatus';
  text: Scalars['String'];
  status: Scalars['Int'];
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

export type RegularQuizzFragment = (
  { __typename?: 'Quizz' }
  & Pick<Quizz, 'id' | 'status' | 'statusText'>
  & { course: (
    { __typename?: 'Course' }
    & Pick<Course, 'id'>
    & { courseDetail: (
      { __typename?: 'CourseDetail' }
      & Pick<CourseDetail, 'name' | 'endDate'>
    ) }
  ), quizzDetail?: Maybe<(
    { __typename?: 'QuizzDetail' }
    & Pick<QuizzDetail, 'id' | 'description' | 'availableTime' | 'timeToComplete'>
    & { questions: Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'statement' | 'score'>
      & { answers?: Maybe<Array<(
        { __typename?: 'Answer' }
        & Pick<Answer, 'id' | 'text' | 'isCorrect'>
      )>> }
    )> }
  )> }
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

export type ChangeCourseStatusMutationVariables = Exact<{
  id: Scalars['String'];
  status: Scalars['Int'];
}>;


export type ChangeCourseStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeCourseStatus'>
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
  & Pick<Mutation, 'createCourse'>
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

export type DeleteSessionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSessionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSession'>
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

export type UpdateCourseMutationVariables = Exact<{
  id: Scalars['String'];
  courseDetail?: Maybe<InputCourseDetail>;
  courseSessions?: Maybe<Array<Maybe<InputCourseSessionUpdate>> | Maybe<InputCourseSessionUpdate>>;
}>;


export type UpdateCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCourse'>
);

export type UpdateQuizzMutationVariables = Exact<{
  args: InputQuizz;
}>;


export type UpdateQuizzMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateQuizz'>
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

export type UsersToCourseMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
  courseId: Scalars['String'];
}>;


export type UsersToCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'usersToCourse'>
);

export type CourseQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course?: Maybe<(
    { __typename?: 'Course' }
    & Pick<Course, 'id'>
    & { courseDetail: (
      { __typename?: 'CourseDetail' }
      & Pick<CourseDetail, 'id' | 'hasTest' | 'name' | 'description' | 'coverPhoto' | 'classUrl' | 'startDate' | 'endDate'>
      & { courseSessions: Array<(
        { __typename?: 'CourseSession' }
        & Pick<CourseSession, 'id' | 'name' | 'startTime' | 'endTime' | 'recordingUrl'>
        & { courseSessionFiles?: Maybe<Array<(
          { __typename?: 'SessionFile' }
          & Pick<SessionFile, 'id' | 'filename' | 'name' | 'createdAt' | 'updatedAt' | 'mimetype' | 'encoding'>
        )>> }
      )> }
    ) }
  )> }
);

export type CoursesQueryVariables = Exact<{
  args: PaginatedArgs;
}>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: (
    { __typename?: 'PaginatedCourses' }
    & Pick<PaginatedCourses, 'prev' | 'totalPages'>
    & { data: Array<(
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'totalUsers' | 'status' | 'statusAction' | 'statusText' | 'hasTestText'>
      & { courseDetail: (
        { __typename?: 'CourseDetail' }
        & Pick<CourseDetail, 'id' | 'name' | 'coverPhoto'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type QuizzQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type QuizzQuery = (
  { __typename?: 'Query' }
  & { quizz: (
    { __typename?: 'Quizz' }
    & RegularQuizzFragment
  ) }
);

export type QuizzesQueryVariables = Exact<{
  args: PaginatedArgs;
}>;


export type QuizzesQuery = (
  { __typename?: 'Query' }
  & { quizzes: (
    { __typename?: 'PaginatedQuizzes' }
    & Pick<PaginatedQuizzes, 'prev' | 'totalPages'>
    & { data: Array<(
      { __typename?: 'Quizz' }
      & RegularQuizzFragment
    )> }
  ) }
);

export type SearchUsersQueryVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { searchUsers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'names' | 'surnames' | 'email'>
  )>> }
);

export type SessionQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { session?: Maybe<(
    { __typename?: 'CourseSession' }
    & Pick<CourseSession, 'id' | 'name' | 'startTime' | 'recordingUrl'>
    & { condition: (
      { __typename?: 'SessionStatus' }
      & Pick<SessionStatus, 'text' | 'status'>
    ), courseDetail: (
      { __typename?: 'CourseDetail' }
      & Pick<CourseDetail, 'id' | 'name' | 'description' | 'classUrl'>
    ) }
  )> }
);

export type UserCourseQueryVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type UserCourseQuery = (
  { __typename?: 'Query' }
  & { userCourse: (
    { __typename?: 'CourseDetail' }
    & Pick<CourseDetail, 'id' | 'name' | 'description' | 'hasTest' | 'startDate' | 'endDate' | 'coverPhoto'>
    & { courseSessions: Array<(
      { __typename?: 'CourseSession' }
      & Pick<CourseSession, 'id' | 'name'>
      & { courseSessionFiles?: Maybe<Array<(
        { __typename?: 'SessionFile' }
        & Pick<SessionFile, 'id' | 'name' | 'filename'>
      )>>, condition: (
        { __typename?: 'SessionStatus' }
        & Pick<SessionStatus, 'status' | 'text'>
      ) }
    )> }
  ) }
);

export type UserCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCoursesQuery = (
  { __typename?: 'Query' }
  & { userCourses: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'id'>
    & { courseDetail: (
      { __typename?: 'CourseDetail' }
      & Pick<CourseDetail, 'id' | 'name' | 'description' | 'coverPhoto'>
    ) }
  )> }
);

export type UsersQueryVariables = Exact<{
  args: PaginatedArgs;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'prev' | 'totalPages'>
    & { data: Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export const RegularQuizzFragmentDoc = gql`
    fragment RegularQuizz on Quizz {
  id
  status
  statusText
  course {
    id
    courseDetail {
      name
      endDate
    }
  }
  quizzDetail {
    id
    description
    availableTime
    timeToComplete
    questions {
      id
      statement
      score
      answers {
        id
        text
        isCorrect
      }
    }
  }
}
    `;
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
export const ChangeCourseStatusDocument = gql`
    mutation changeCourseStatus($id: String!, $status: Int!) {
  changeCourseStatus(id: $id, status: $status)
}
    `;

export function useChangeCourseStatusMutation() {
  return Urql.useMutation<ChangeCourseStatusMutation, ChangeCourseStatusMutationVariables>(ChangeCourseStatusDocument);
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
  createCourse(courseDetail: $courseDetail, courseSessions: $courseSessions)
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
export const DeleteSessionDocument = gql`
    mutation deleteSession($id: String!) {
  deleteSession(id: $id)
}
    `;

export function useDeleteSessionMutation() {
  return Urql.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(DeleteSessionDocument);
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
export const UpdateCourseDocument = gql`
    mutation updateCourse($id: String!, $courseDetail: InputCourseDetail, $courseSessions: [InputCourseSessionUpdate]) {
  updateCourse(
    id: $id
    courseDetail: $courseDetail
    courseSessions: $courseSessions
  )
}
    `;

export function useUpdateCourseMutation() {
  return Urql.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument);
};
export const UpdateQuizzDocument = gql`
    mutation updateQuizz($args: InputQuizz!) {
  updateQuizz(args: $args)
}
    `;

export function useUpdateQuizzMutation() {
  return Urql.useMutation<UpdateQuizzMutation, UpdateQuizzMutationVariables>(UpdateQuizzDocument);
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
export const UsersToCourseDocument = gql`
    mutation usersToCourse($ids: [String!]!, $courseId: String!) {
  usersToCourse(ids: $ids, courseId: $courseId)
}
    `;

export function useUsersToCourseMutation() {
  return Urql.useMutation<UsersToCourseMutation, UsersToCourseMutationVariables>(UsersToCourseDocument);
};
export const CourseDocument = gql`
    query course($id: String!) {
  course(id: $id) {
    id
    courseDetail {
      id
      hasTest
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
        courseSessionFiles {
          id
          filename
          name
          createdAt
          updatedAt
          mimetype
          encoding
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
    query courses($args: PaginatedArgs!) {
  courses(args: $args) {
    prev
    totalPages
    data {
      id
      totalUsers
      status
      statusAction
      statusText
      hasTestText
      courseDetail {
        id
        name
        coverPhoto
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
export const QuizzDocument = gql`
    query quizz($id: String!) {
  quizz(id: $id) {
    ...RegularQuizz
  }
}
    ${RegularQuizzFragmentDoc}`;

export function useQuizzQuery(options: Omit<Urql.UseQueryArgs<QuizzQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuizzQuery>({ query: QuizzDocument, ...options });
};
export const QuizzesDocument = gql`
    query quizzes($args: PaginatedArgs!) {
  quizzes(args: $args) {
    prev
    totalPages
    data {
      ...RegularQuizz
    }
  }
}
    ${RegularQuizzFragmentDoc}`;

export function useQuizzesQuery(options: Omit<Urql.UseQueryArgs<QuizzesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuizzesQuery>({ query: QuizzesDocument, ...options });
};
export const SearchUsersDocument = gql`
    query searchUsers($courseId: String!) {
  searchUsers(courseId: $courseId) {
    id
    names
    surnames
    email
  }
}
    `;

export function useSearchUsersQuery(options: Omit<Urql.UseQueryArgs<SearchUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchUsersQuery>({ query: SearchUsersDocument, ...options });
};
export const SessionDocument = gql`
    query session($id: String) {
  session(id: $id) {
    id
    name
    startTime
    recordingUrl
    condition {
      text
      status
    }
    courseDetail {
      id
      name
      description
      classUrl
    }
  }
}
    `;

export function useSessionQuery(options: Omit<Urql.UseQueryArgs<SessionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SessionQuery>({ query: SessionDocument, ...options });
};
export const UserCourseDocument = gql`
    query userCourse($courseId: String!) {
  userCourse(courseId: $courseId) {
    id
    name
    description
    hasTest
    startDate
    endDate
    coverPhoto
    courseSessions {
      id
      name
      courseSessionFiles {
        id
        name
        filename
      }
      condition {
        status
        text
      }
    }
  }
}
    `;

export function useUserCourseQuery(options: Omit<Urql.UseQueryArgs<UserCourseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserCourseQuery>({ query: UserCourseDocument, ...options });
};
export const UserCoursesDocument = gql`
    query userCourses {
  userCourses {
    id
    courseDetail {
      id
      name
      description
      coverPhoto
    }
  }
}
    `;

export function useUserCoursesQuery(options: Omit<Urql.UseQueryArgs<UserCoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserCoursesQuery>({ query: UserCoursesDocument, ...options });
};
export const UsersDocument = gql`
    query users($args: PaginatedArgs!) {
  users(args: $args) {
    prev
    totalPages
    data {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};