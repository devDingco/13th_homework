/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateBoardCommentDto = {
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  password: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};

export type CreateBoardDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  detailAddress?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
  password: Scalars['String']['input'];
  title: Scalars['String']['input'];
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardCommentDto = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  password: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBoardDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  detailAddress?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBoardCommentMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  createBoardComment: CreateBoardCommentDto;
}>;


export type CreateBoardCommentMutation = { __typename?: 'Mutation', createBoardComment: { __typename?: 'BoardCommentResponse', author: string, content: string, rating: number, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, createdAt: any }> | null } };

export type UpdateBoardCommentMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  updateBoardComment: UpdateBoardCommentDto;
  parentId: Scalars['String']['input'];
}>;


export type UpdateBoardCommentMutation = { __typename?: 'Mutation', updateBoardComment: { __typename?: 'BoardCommentResponse', author: string, content: string, rating: number, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, createdAt: any }> | null } };

export type DeleteBoardCommentMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  commentId: Scalars['String']['input'];
}>;


export type DeleteBoardCommentMutation = { __typename?: 'Mutation', deleteBoardComment: boolean };

export type IsPasswordCorrectMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
}>;


export type IsPasswordCorrectMutation = { __typename?: 'Mutation', isPasswordCorrect: boolean };

export type CreateBoardMutationVariables = Exact<{
  createBoard: CreateBoardDto;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'BoardResponseDto', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, address?: string | null, createdAt: any } };

export type UpdateBoardMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  updateBoard: UpdateBoardDto;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'BoardResponseDto', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, address?: string | null, createdAt: any } };

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: boolean };

export type ClearBoardMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearBoardMutation = { __typename?: 'Mutation', clearBoard: boolean };

export type GetBoardCommentQueryVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type GetBoardCommentQuery = { __typename?: 'Query', getBoardComment: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, rating: number, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, createdAt: any }> | null }> };

export type GetBoardReactionQueryVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type GetBoardReactionQuery = { __typename?: 'Query', getBoardReaction: { __typename?: 'BoardReaction', like: number, hate: number } };

export type GetBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardsQuery = { __typename?: 'Query', getBoards: Array<{ __typename?: 'BoardResponseDto', author: string, title: string, boardId: number, createdAt: any }> };

export type GetBoardQueryVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type GetBoardQuery = { __typename?: 'Query', getBoard: { __typename?: 'BoardResponseDto', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, address?: string | null, createdAt: any } };


export const CreateBoardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBoardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBoardComment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardCommentDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"createBoardComment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBoardComment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>;
export const UpdateBoardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBoardComment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardCommentDto"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateBoardComment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBoardComment"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>;
export const DeleteBoardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBoardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>;
export const IsPasswordCorrectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsPasswordCorrect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isPasswordCorrect"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<IsPasswordCorrectMutation, IsPasswordCorrectMutationVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBoard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBoard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBoard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const UpdateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBoard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateBoard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBoard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const DeleteBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}]}]}}]} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const ClearBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearBoard"}}]}}]} as unknown as DocumentNode<ClearBoardMutation, ClearBoardMutationVariables>;
export const GetBoardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBoardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBoardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetBoardCommentQuery, GetBoardCommentQueryVariables>;
export const GetBoardReactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBoardReaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBoardReaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"hate"}}]}}]}}]} as unknown as DocumentNode<GetBoardReactionQuery, GetBoardReactionQueryVariables>;
export const GetBoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"boardId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetBoardsQuery, GetBoardsQueryVariables>;
export const GetBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetBoardQuery, GetBoardQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BoardCommentResponse = {
  __typename?: 'BoardCommentResponse';
  _id: Scalars['ID']['output'];
  author: Scalars['String']['output'];
  boardId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  rating: Scalars['Int']['output'];
  replies?: Maybe<Array<BoardCommentResponse>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardReaction = {
  __typename?: 'BoardReaction';
  _id: Scalars['ID']['output'];
  boardId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  hate: Scalars['Int']['output'];
  like: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardResponseDto = {
  __typename?: 'BoardResponseDto';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  author: Scalars['String']['output'];
  boardId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  detailAddress?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type CreateBoardCommentDto = {
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  password: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};

export type CreateBoardDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  detailAddress?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
  password: Scalars['String']['input'];
  title: Scalars['String']['input'];
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  clearBoard: Scalars['Boolean']['output'];
  createBoard: BoardResponseDto;
  createBoardComment: BoardCommentResponse;
  deleteBoard: Scalars['Boolean']['output'];
  deleteBoardComment: Scalars['Boolean']['output'];
  isPasswordCorrect: Scalars['Boolean']['output'];
  updateBoard: BoardResponseDto;
  updateBoardComment: BoardCommentResponse;
};


export type MutationCreateBoardArgs = {
  createBoard: CreateBoardDto;
};


export type MutationCreateBoardCommentArgs = {
  boardId: Scalars['Int']['input'];
  createBoardComment: CreateBoardCommentDto;
};


export type MutationDeleteBoardArgs = {
  boardId: Scalars['Int']['input'];
};


export type MutationDeleteBoardCommentArgs = {
  boardId: Scalars['Int']['input'];
  commentId: Scalars['String']['input'];
};


export type MutationIsPasswordCorrectArgs = {
  boardId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateBoardArgs = {
  boardId: Scalars['Int']['input'];
  updateBoard: UpdateBoardDto;
};


export type MutationUpdateBoardCommentArgs = {
  boardId: Scalars['Int']['input'];
  parentId: Scalars['String']['input'];
  updateBoardComment: UpdateBoardCommentDto;
};

export type Query = {
  __typename?: 'Query';
  getBoard: BoardResponseDto;
  getBoardComment: Array<BoardCommentResponse>;
  getBoardReaction: BoardReaction;
  getBoards: Array<BoardResponseDto>;
};


export type QueryGetBoardArgs = {
  boardId: Scalars['Int']['input'];
};


export type QueryGetBoardCommentArgs = {
  boardId: Scalars['Int']['input'];
};


export type QueryGetBoardReactionArgs = {
  boardId: Scalars['Int']['input'];
};

export type UpdateBoardCommentDto = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  password: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBoardDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  detailAddress?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBoardCommentMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  createBoardComment: CreateBoardCommentDto;
}>;


export type CreateBoardCommentMutation = { __typename?: 'Mutation', createBoardComment: { __typename?: 'BoardCommentResponse', author: string, content: string, rating: number, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, createdAt: any }> | null } };

export type UpdateBoardCommentMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  updateBoardComment: UpdateBoardCommentDto;
  parentId: Scalars['String']['input'];
}>;


export type UpdateBoardCommentMutation = { __typename?: 'Mutation', updateBoardComment: { __typename?: 'BoardCommentResponse', author: string, content: string, rating: number, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, createdAt: any }> | null } };

export type DeleteBoardCommentMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  commentId: Scalars['String']['input'];
}>;


export type DeleteBoardCommentMutation = { __typename?: 'Mutation', deleteBoardComment: boolean };

export type IsPasswordCorrectMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
}>;


export type IsPasswordCorrectMutation = { __typename?: 'Mutation', isPasswordCorrect: boolean };

export type CreateBoardMutationVariables = Exact<{
  createBoard: CreateBoardDto;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'BoardResponseDto', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, address?: string | null, createdAt: any } };

export type UpdateBoardMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
  updateBoard: UpdateBoardDto;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'BoardResponseDto', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, address?: string | null, createdAt: any } };

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: boolean };

export type ClearBoardMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearBoardMutation = { __typename?: 'Mutation', clearBoard: boolean };

export type GetBoardCommentQueryVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type GetBoardCommentQuery = { __typename?: 'Query', getBoardComment: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, rating: number, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponse', author: string, content: string, createdAt: any }> | null }> };

export type GetBoardReactionQueryVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type GetBoardReactionQuery = { __typename?: 'Query', getBoardReaction: { __typename?: 'BoardReaction', like: number, hate: number } };

export type GetBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardsQuery = { __typename?: 'Query', getBoards: Array<{ __typename?: 'BoardResponseDto', author: string, title: string, boardId: number, createdAt: any }> };

export type GetBoardQueryVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type GetBoardQuery = { __typename?: 'Query', getBoard: { __typename?: 'BoardResponseDto', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, address?: string | null, createdAt: any } };


export const CreateBoardCommentDocument = gql`
    mutation CreateBoardComment($boardId: Int!, $createBoardComment: CreateBoardCommentDto!) {
  createBoardComment(boardId: $boardId, createBoardComment: $createBoardComment) {
    author
    content
    rating
    parentId
    _id
    createdAt
    replies {
      author
      content
      createdAt
    }
  }
}
    `;
export type CreateBoardCommentMutationFn = Apollo.MutationFunction<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>;

/**
 * __useCreateBoardCommentMutation__
 *
 * To run a mutation, you first call `useCreateBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardCommentMutation, { data, loading, error }] = useCreateBoardCommentMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      createBoardComment: // value for 'createBoardComment'
 *   },
 * });
 */
export function useCreateBoardCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>(CreateBoardCommentDocument, options);
      }
export type CreateBoardCommentMutationHookResult = ReturnType<typeof useCreateBoardCommentMutation>;
export type CreateBoardCommentMutationResult = Apollo.MutationResult<CreateBoardCommentMutation>;
export type CreateBoardCommentMutationOptions = Apollo.BaseMutationOptions<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>;
export const UpdateBoardCommentDocument = gql`
    mutation UpdateBoardComment($boardId: Int!, $updateBoardComment: UpdateBoardCommentDto!, $parentId: String!) {
  updateBoardComment(
    boardId: $boardId
    updateBoardComment: $updateBoardComment
    parentId: $parentId
  ) {
    author
    content
    rating
    parentId
    _id
    createdAt
    replies {
      author
      content
      createdAt
    }
  }
}
    `;
export type UpdateBoardCommentMutationFn = Apollo.MutationFunction<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>;

/**
 * __useUpdateBoardCommentMutation__
 *
 * To run a mutation, you first call `useUpdateBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardCommentMutation, { data, loading, error }] = useUpdateBoardCommentMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      updateBoardComment: // value for 'updateBoardComment'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useUpdateBoardCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>(UpdateBoardCommentDocument, options);
      }
export type UpdateBoardCommentMutationHookResult = ReturnType<typeof useUpdateBoardCommentMutation>;
export type UpdateBoardCommentMutationResult = Apollo.MutationResult<UpdateBoardCommentMutation>;
export type UpdateBoardCommentMutationOptions = Apollo.BaseMutationOptions<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>;
export const DeleteBoardCommentDocument = gql`
    mutation DeleteBoardComment($boardId: Int!, $commentId: String!) {
  deleteBoardComment(boardId: $boardId, commentId: $commentId)
}
    `;
export type DeleteBoardCommentMutationFn = Apollo.MutationFunction<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>;

/**
 * __useDeleteBoardCommentMutation__
 *
 * To run a mutation, you first call `useDeleteBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardCommentMutation, { data, loading, error }] = useDeleteBoardCommentMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteBoardCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>(DeleteBoardCommentDocument, options);
      }
export type DeleteBoardCommentMutationHookResult = ReturnType<typeof useDeleteBoardCommentMutation>;
export type DeleteBoardCommentMutationResult = Apollo.MutationResult<DeleteBoardCommentMutation>;
export type DeleteBoardCommentMutationOptions = Apollo.BaseMutationOptions<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>;
export const IsPasswordCorrectDocument = gql`
    mutation IsPasswordCorrect($boardId: Int!, $password: String!) {
  isPasswordCorrect(boardId: $boardId, password: $password)
}
    `;
export type IsPasswordCorrectMutationFn = Apollo.MutationFunction<IsPasswordCorrectMutation, IsPasswordCorrectMutationVariables>;

/**
 * __useIsPasswordCorrectMutation__
 *
 * To run a mutation, you first call `useIsPasswordCorrectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIsPasswordCorrectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [isPasswordCorrectMutation, { data, loading, error }] = useIsPasswordCorrectMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useIsPasswordCorrectMutation(baseOptions?: Apollo.MutationHookOptions<IsPasswordCorrectMutation, IsPasswordCorrectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IsPasswordCorrectMutation, IsPasswordCorrectMutationVariables>(IsPasswordCorrectDocument, options);
      }
export type IsPasswordCorrectMutationHookResult = ReturnType<typeof useIsPasswordCorrectMutation>;
export type IsPasswordCorrectMutationResult = Apollo.MutationResult<IsPasswordCorrectMutation>;
export type IsPasswordCorrectMutationOptions = Apollo.BaseMutationOptions<IsPasswordCorrectMutation, IsPasswordCorrectMutationVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($createBoard: CreateBoardDto!) {
  createBoard(createBoard: $createBoard) {
    author
    title
    content
    imageUrl
    youtubeUrl
    address
    createdAt
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      createBoard: // value for 'createBoard'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const UpdateBoardDocument = gql`
    mutation UpdateBoard($boardId: Int!, $updateBoard: UpdateBoardDto!) {
  updateBoard(boardId: $boardId, updateBoard: $updateBoard) {
    author
    title
    content
    imageUrl
    youtubeUrl
    address
    createdAt
  }
}
    `;
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      updateBoard: // value for 'updateBoard'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation DeleteBoard($boardId: Int!) {
  deleteBoard(boardId: $boardId)
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, options);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const ClearBoardDocument = gql`
    mutation ClearBoard {
  clearBoard
}
    `;
export type ClearBoardMutationFn = Apollo.MutationFunction<ClearBoardMutation, ClearBoardMutationVariables>;

/**
 * __useClearBoardMutation__
 *
 * To run a mutation, you first call `useClearBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearBoardMutation, { data, loading, error }] = useClearBoardMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearBoardMutation(baseOptions?: Apollo.MutationHookOptions<ClearBoardMutation, ClearBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearBoardMutation, ClearBoardMutationVariables>(ClearBoardDocument, options);
      }
export type ClearBoardMutationHookResult = ReturnType<typeof useClearBoardMutation>;
export type ClearBoardMutationResult = Apollo.MutationResult<ClearBoardMutation>;
export type ClearBoardMutationOptions = Apollo.BaseMutationOptions<ClearBoardMutation, ClearBoardMutationVariables>;
export const GetBoardCommentDocument = gql`
    query GetBoardComment($boardId: Int!) {
  getBoardComment(boardId: $boardId) {
    author
    content
    rating
    parentId
    _id
    createdAt
    replies {
      author
      content
      createdAt
    }
  }
}
    `;

/**
 * __useGetBoardCommentQuery__
 *
 * To run a query within a React component, call `useGetBoardCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardCommentQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardCommentQuery(baseOptions: Apollo.QueryHookOptions<GetBoardCommentQuery, GetBoardCommentQueryVariables> & ({ variables: GetBoardCommentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardCommentQuery, GetBoardCommentQueryVariables>(GetBoardCommentDocument, options);
      }
export function useGetBoardCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardCommentQuery, GetBoardCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardCommentQuery, GetBoardCommentQueryVariables>(GetBoardCommentDocument, options);
        }
export function useGetBoardCommentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardCommentQuery, GetBoardCommentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardCommentQuery, GetBoardCommentQueryVariables>(GetBoardCommentDocument, options);
        }
export type GetBoardCommentQueryHookResult = ReturnType<typeof useGetBoardCommentQuery>;
export type GetBoardCommentLazyQueryHookResult = ReturnType<typeof useGetBoardCommentLazyQuery>;
export type GetBoardCommentSuspenseQueryHookResult = ReturnType<typeof useGetBoardCommentSuspenseQuery>;
export type GetBoardCommentQueryResult = Apollo.QueryResult<GetBoardCommentQuery, GetBoardCommentQueryVariables>;
export const GetBoardReactionDocument = gql`
    query GetBoardReaction($boardId: Int!) {
  getBoardReaction(boardId: $boardId) {
    like
    hate
  }
}
    `;

/**
 * __useGetBoardReactionQuery__
 *
 * To run a query within a React component, call `useGetBoardReactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardReactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardReactionQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardReactionQuery(baseOptions: Apollo.QueryHookOptions<GetBoardReactionQuery, GetBoardReactionQueryVariables> & ({ variables: GetBoardReactionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardReactionQuery, GetBoardReactionQueryVariables>(GetBoardReactionDocument, options);
      }
export function useGetBoardReactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardReactionQuery, GetBoardReactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardReactionQuery, GetBoardReactionQueryVariables>(GetBoardReactionDocument, options);
        }
export function useGetBoardReactionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardReactionQuery, GetBoardReactionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardReactionQuery, GetBoardReactionQueryVariables>(GetBoardReactionDocument, options);
        }
export type GetBoardReactionQueryHookResult = ReturnType<typeof useGetBoardReactionQuery>;
export type GetBoardReactionLazyQueryHookResult = ReturnType<typeof useGetBoardReactionLazyQuery>;
export type GetBoardReactionSuspenseQueryHookResult = ReturnType<typeof useGetBoardReactionSuspenseQuery>;
export type GetBoardReactionQueryResult = Apollo.QueryResult<GetBoardReactionQuery, GetBoardReactionQueryVariables>;
export const GetBoardsDocument = gql`
    query GetBoards {
  getBoards {
    author
    title
    boardId
    createdAt
  }
}
    `;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
      }
export function useGetBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
        }
export function useGetBoardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
        }
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<typeof useGetBoardsLazyQuery>;
export type GetBoardsSuspenseQueryHookResult = ReturnType<typeof useGetBoardsSuspenseQuery>;
export type GetBoardsQueryResult = Apollo.QueryResult<GetBoardsQuery, GetBoardsQueryVariables>;
export const GetBoardDocument = gql`
    query GetBoard($boardId: Int!) {
  getBoard(boardId: $boardId) {
    author
    title
    content
    imageUrl
    youtubeUrl
    address
    createdAt
  }
}
    `;

/**
 * __useGetBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardQuery(baseOptions: Apollo.QueryHookOptions<GetBoardQuery, GetBoardQueryVariables> & ({ variables: GetBoardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
      }
export function useGetBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
        }
export function useGetBoardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
        }
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<typeof useGetBoardLazyQuery>;
export type GetBoardSuspenseQueryHookResult = ReturnType<typeof useGetBoardSuspenseQuery>;
export type GetBoardQueryResult = Apollo.QueryResult<GetBoardQuery, GetBoardQueryVariables>;