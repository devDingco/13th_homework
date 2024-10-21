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

export type GetBoardCommentQueryVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetBoardCommentQuery = { __typename?: 'Query', getBoardComment: Array<{ __typename?: 'BoardCommentResponseDTO', author: string, content: string, rating?: number | null, parentId?: string | null, _id: string, createdAt: any, replies?: Array<{ __typename?: 'BoardCommentResponseDTO', author: string, content: string, createdAt: any }> | null }> };


export const GetBoardCommentDocument = gql`
    query GetBoardComment($boardId: Int!, $page: Int) {
  getBoardComment(boardId: $boardId, page: $page) {
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
 *      page: // value for 'page'
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