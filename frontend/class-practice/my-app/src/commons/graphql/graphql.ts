/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type BoardAddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressDetail?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBoardCommentInput = {
  contents: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Float']['input'];
  writer?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBoardInput = {
  boardAddress?: InputMaybe<BoardAddressInput>;
  contents: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  password?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  writer?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTravelproductInput = {
  contents: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  remarks: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  travelproductAddress?: InputMaybe<TravelproductAddressInput>;
};

export type CreateTravelproductQuestionAnswerInput = {
  contents: Scalars['String']['input'];
};

export type CreateTravelproductQuestionInput = {
  contents: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type TravelproductAddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressDetail?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardCommentInput = {
  contents?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateBoardInput = {
  boardAddress?: InputMaybe<BoardAddressInput>;
  contents?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTravelproductInput = {
  contents?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  travelproductAddress?: InputMaybe<TravelproductAddressInput>;
};

export type UpdateTravelproductQuestionAnswerInput = {
  contents: Scalars['String']['input'];
};

export type UpdateTravelproductQuestionInput = {
  contents: Scalars['String']['input'];
};

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type FetchBoards14_01QueryVariables = Exact<{
  mypage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoards14_01Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoards14_02QueryVariables = Exact<{
  mypage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoards14_02Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoards14_03QueryVariables = Exact<{
  mypage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoards14_03Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoardsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoardsCountQuery = { __typename?: 'Query', fetchBoardsCount: number };

export type FetchBoards14_05QueryVariables = Exact<{
  mypage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoards14_05Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoards14_06QueryVariables = Exact<{
  mypage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoards14_06Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoardshelloQueryVariables = Exact<{
  mypage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoardshelloQuery = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'FileManager', url: string } };

export type CreateBoardMutationVariables = Exact<{
  createBoardInput: CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string } };

export type FetchBoards19_01QueryVariables = Exact<{
  mypage?: InputMaybe<Scalars['Int']['input']>;
  mysearch?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchBoards19_01Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoardsWithSearchQueryVariables = Exact<{
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchBoardsWithSearchQuery = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoards3QueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoards3Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoards1QueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoards1Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null }> };

export type FetchBoards4QueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoards4Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type UpdateBoardMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string } };

export type FetchUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserLoggedInQuery = { __typename?: 'Query', fetchUserLoggedIn: { __typename?: 'User', _id: string, email: string, name: string } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'Token', accessToken: string } };

export type FetchBoards5QueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoards5Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string }> };

export type FetchBoards2QueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoards2Query = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string }> };


export const FetchBoards14_01Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards14_01"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards14_01Query, FetchBoards14_01QueryVariables>;
export const FetchBoards14_02Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards14_02"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards14_02Query, FetchBoards14_02QueryVariables>;
export const FetchBoards14_03Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards14_03"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards14_03Query, FetchBoards14_03QueryVariables>;
export const FetchBoardsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoardsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoardsCount"}}]}}]} as unknown as DocumentNode<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>;
export const FetchBoards14_05Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards14_05"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards14_05Query, FetchBoards14_05QueryVariables>;
export const FetchBoards14_06Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards14_06"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards14_06Query, FetchBoards14_06QueryVariables>;
export const FetchBoardshelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoardshello"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoardshelloQuery, FetchBoardshelloQueryVariables>;
export const UploadFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadFileMutation, UploadFileMutationVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBoardInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBoardInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBoardInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const FetchBoards19_01Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards19_01"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mysearch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mypage"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mysearch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards19_01Query, FetchBoards19_01QueryVariables>;
export const FetchBoardsWithSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoardsWithSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoardsWithSearchQuery, FetchBoardsWithSearchQueryVariables>;
export const FetchBoards3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards3Query, FetchBoards3QueryVariables>;
export const FetchBoards1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}}]}}]}}]} as unknown as DocumentNode<FetchBoards1Query, FetchBoards1QueryVariables>;
export const FetchBoards4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards4Query, FetchBoards4QueryVariables>;
export const UpdateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"StringValue","value":"671e27735413b3002914e0e4","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"StringValue","value":"1234","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"updateBoardInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"StringValue","value":"zzz1234","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"contents"},"value":{"kind":"StringValue","value":"zzz1234","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const FetchUserLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchUserLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchUserLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FetchUserLoggedInQuery, FetchUserLoggedInQueryVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const FetchBoards5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards5"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoards5Query, FetchBoards5QueryVariables>;
export const FetchBoards2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FetchBoards2Query, FetchBoards2QueryVariables>;