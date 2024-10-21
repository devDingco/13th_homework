import * as Types from '../generated/types';

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
  DateTime: { input: any; output: any; }
};

export type BoardAddressInput = {
  address: Scalars['String']['input'];
  detailAddress: Scalars['String']['input'];
  zoneCode: Scalars['Int']['input'];
};

export type BoardAddressOutput = {
  __typename?: 'BoardAddressOutput';
  address: Scalars['String']['output'];
  detailAddress: Scalars['String']['output'];
  zoneCode: Scalars['Int']['output'];
};

export type BoardCommentResponseDto = {
  __typename?: 'BoardCommentResponseDTO';
  _id: Scalars['ID']['output'];
  author: Scalars['String']['output'];
  boardId: Scalars['Float']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  replies?: Maybe<Array<BoardCommentResponseDto>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardPaginationResponse = {
  __typename?: 'BoardPaginationResponse';
  result: Array<BoardSchema>;
  totalCount: Scalars['Int']['output'];
};

export type BoardReactionSchema = {
  __typename?: 'BoardReactionSchema';
  _id: Scalars['ID']['output'];
  boardId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  hate: Scalars['Int']['output'];
  like: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardSchema = {
  __typename?: 'BoardSchema';
  _id: Scalars['ID']['output'];
  author: Scalars['String']['output'];
  boardAddressOutput?: Maybe<BoardAddressOutput>;
  boardId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  imageUrl?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type CreateBoardCommentInput = {
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateBoardInput = {
  author: Scalars['String']['input'];
  boardAddressInput?: InputMaybe<Array<BoardAddressInput>>;
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
  password: Scalars['String']['input'];
  title: Scalars['String']['input'];
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  clearBoard: Scalars['Boolean']['output'];
  createBoard: BoardSchema;
  createBoardComment: BoardCommentResponseDto;
  deleteBoard: Scalars['Boolean']['output'];
  deleteBoardComment: Scalars['Boolean']['output'];
  isPasswordCorrect: Scalars['Boolean']['output'];
  updateBoard: BoardSchema;
  updateBoardComment: BoardCommentResponseDto;
};


export type MutationCreateBoardArgs = {
  createBoardInput: CreateBoardInput;
};


export type MutationCreateBoardCommentArgs = {
  boardId: Scalars['Int']['input'];
  createBoardComment: CreateBoardCommentInput;
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
  updateBoardInput: UpdateBoardInput;
};


export type MutationUpdateBoardCommentArgs = {
  boardId: Scalars['Int']['input'];
  commentId: Scalars['String']['input'];
  updateBoardComment: UpdateBoardCommentInput;
};

export type Query = {
  __typename?: 'Query';
  getBoard: BoardSchema;
  getBoardComment: Array<BoardCommentResponseDto>;
  getBoardReaction: BoardReactionSchema;
  getBoards: BoardPaginationResponse;
};


export type QueryGetBoardArgs = {
  boardId: Scalars['Int']['input'];
};


export type QueryGetBoardCommentArgs = {
  boardId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBoardReactionArgs = {
  boardId: Scalars['Int']['input'];
};


export type QueryGetBoardsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBoardCommentInput = {
  content: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBoardInput = {
  boardAddressInput?: InputMaybe<Array<BoardAddressInput>>;
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBoardCommentMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
  createBoardComment: Types.CreateBoardCommentInput;
}>;


export type CreateBoardCommentMutation = { __typename?: 'Mutation', createBoardComment: { __typename?: 'BoardCommentResponseDTO', author: string, content: string, rating?: number | null, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponseDTO', author: string, content: string, createdAt: any }> | null } };

export type UpdateBoardCommentMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
  updateBoardComment: Types.UpdateBoardCommentInput;
  commentId: Types.Scalars['String']['input'];
}>;


export type UpdateBoardCommentMutation = { __typename?: 'Mutation', updateBoardComment: { __typename?: 'BoardCommentResponseDTO', author: string, content: string, rating?: number | null, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponseDTO', author: string, content: string, createdAt: any }> | null } };

export type DeleteBoardCommentMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
  commentId: Types.Scalars['String']['input'];
}>;


export type DeleteBoardCommentMutation = { __typename?: 'Mutation', deleteBoardComment: boolean };


export const CreateBoardCommentDocument = gql`
    mutation CreateBoardComment($boardId: Int!, $createBoardComment: CreateBoardCommentInput!) {
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
    mutation UpdateBoardComment($boardId: Int!, $updateBoardComment: UpdateBoardCommentInput!, $commentId: String!) {
  updateBoardComment(
    boardId: $boardId
    updateBoardComment: $updateBoardComment
    commentId: $commentId
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
 *      commentId: // value for 'commentId'
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