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

export type CreateBoardMutationVariables = Types.Exact<{
  createBoardInput: Types.CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'BoardSchema', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, createdAt: any, boardAddressOutput?: { __typename?: 'BoardAddressOutput', zoneCode: number, address: string, detailAddress: string } | null } };

export type UpdateBoardMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
  updateBoardInput: Types.UpdateBoardInput;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'BoardSchema', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, createdAt: any, boardAddressOutput?: { __typename?: 'BoardAddressOutput', zoneCode: number, address: string, detailAddress: string } | null } };

export type DeleteBoardMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: boolean };

export type ClearBoardMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type ClearBoardMutation = { __typename?: 'Mutation', clearBoard: boolean };


export const CreateBoardDocument = gql`
    mutation CreateBoard($createBoardInput: CreateBoardInput!) {
  createBoard(createBoardInput: $createBoardInput) {
    author
    title
    content
    imageUrl
    youtubeUrl
    boardAddressOutput {
      zoneCode
      address
      detailAddress
    }
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
 *      createBoardInput: // value for 'createBoardInput'
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
    mutation UpdateBoard($boardId: Int!, $updateBoardInput: UpdateBoardInput!) {
  updateBoard(boardId: $boardId, updateBoardInput: $updateBoardInput) {
    author
    title
    content
    imageUrl
    youtubeUrl
    boardAddressOutput {
      zoneCode
      address
      detailAddress
    }
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
 *      updateBoardInput: // value for 'updateBoardInput'
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