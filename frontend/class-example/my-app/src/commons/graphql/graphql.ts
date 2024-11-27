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
  Date: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type BoardReturn = {
  __typename?: 'BoardReturn';
  contents?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  like?: Maybe<Scalars['Int']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  writer?: Maybe<Scalars['String']['output']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateProductInput = {
  detail?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<Return>;
  createProduct?: Maybe<Return>;
  createProfile?: Maybe<Return>;
  deleteBoard?: Maybe<Return>;
  deleteProduct?: Maybe<Return>;
  deleteProfile?: Maybe<Return>;
  updateBoard?: Maybe<Return>;
  updateProduct?: Maybe<Return>;
  updateProfile?: Maybe<Return>;
};


export type MutationCreateBoardArgs = {
  contents?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  writer?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
  seller?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProfileArgs = {
  age?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteBoardArgs = {
  number?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteProductArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteProfileArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBoardArgs = {
  contents?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  writer?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProductArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  age?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
};

export type ProductReturn = {
  __typename?: 'ProductReturn';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  detail?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  seller?: Maybe<Scalars['String']['output']>;
};

export type ProfileReturn = {
  __typename?: 'ProfileReturn';
  age?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  school?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  fetchBoard?: Maybe<BoardReturn>;
  fetchBoards?: Maybe<Array<BoardReturn>>;
  fetchBoardsCount: Scalars['Int']['output'];
  fetchProduct?: Maybe<ProductReturn>;
  fetchProducts?: Maybe<Array<ProductReturn>>;
  fetchProductsCount: Scalars['Int']['output'];
  fetchProfile?: Maybe<ProfileReturn>;
  fetchProfiles?: Maybe<Array<ProfileReturn>>;
  fetchProfilesCount: Scalars['Int']['output'];
};


export type QueryFetchBoardArgs = {
  number?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFetchBoardsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFetchProductArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFetchProductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFetchProfileArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFetchProfilesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Return = {
  __typename?: 'Return';
  _id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
};

export type UpdateProductInput = {
  detail?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateBoard06_03MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontent?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard06_03Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateBoard06_04MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontent?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard06_04Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateBoard06_05MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontent?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard06_05Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateProductMutationVariables = Exact<{
  seller?: InputMaybe<Scalars['String']['input']>;
  createProductInput: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type FetchBoardQueryVariables = Exact<{
  mynumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchBoardQuery = { __typename?: 'Query', fetchBoard?: { __typename?: 'BoardReturn', number?: number | null, writer?: string | null, title?: string | null, contents?: string | null } | null };

export type CreateBoard07_04MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontent?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard07_04Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type DeleteBoardMutationVariables = Exact<{
  mynumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateBoard10_01MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontent?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard10_01Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type FetchBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoardsQuery = { __typename?: 'Query', fetchBoards?: Array<{ __typename?: 'BoardReturn', number?: number | null, writer?: string | null, title?: string | null, contents?: string | null }> | null };

export type CreateBoard09_03MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontents?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard09_03Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type UpdateBoardMutationVariables = Exact<{
  mynumber?: InputMaybe<Scalars['Int']['input']>;
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontents?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateBoard09_04MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontents?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard09_04Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateBoardMutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontents?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateBoard09_06MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontents?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard09_06Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };

export type CreateBoard09_07MutationVariables = Exact<{
  mywriter?: InputMaybe<Scalars['String']['input']>;
  mytitle?: InputMaybe<Scalars['String']['input']>;
  mycontents?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBoard09_07Mutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Return', _id?: string | null, number?: number | null, message?: string | null } | null };


export const CreateBoard06_03Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard06_03"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard06_03Mutation, CreateBoard06_03MutationVariables>;
export const CreateBoard06_04Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard06_04"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard06_04Mutation, CreateBoard06_04MutationVariables>;
export const CreateBoard06_05Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard06_05"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard06_05Mutation, CreateBoard06_05MutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seller"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"seller"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seller"}}},{"kind":"Argument","name":{"kind":"Name","value":"createProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const FetchBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mynumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mynumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoardQuery, FetchBoardQueryVariables>;
export const CreateBoard07_04Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard07_04"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard07_04Mutation, CreateBoard07_04MutationVariables>;
export const DeleteBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mynumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mynumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const CreateBoard10_01Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard10_01"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard10_01Mutation, CreateBoard10_01MutationVariables>;
export const FetchBoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<FetchBoardsQuery, FetchBoardsQueryVariables>;
export const CreateBoard09_03Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard09_03"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard09_03Mutation, CreateBoard09_03MutationVariables>;
export const UpdateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mynumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mynumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const CreateBoard09_04Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard09_04"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard09_04Mutation, CreateBoard09_04MutationVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const CreateBoard09_06Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard09_06"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard09_06Mutation, CreateBoard09_06MutationVariables>;
export const CreateBoard09_07Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard09_07"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mywriter"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mytitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mycontents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateBoard09_07Mutation, CreateBoard09_07MutationVariables>;