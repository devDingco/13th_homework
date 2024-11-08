import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchBoardQueryVariables = Types.Exact<{
  boardId: Types.Scalars['ID']['input'];
}>;

export type FetchBoardQuery = {
  __typename?: 'Query';
  fetchBoard: {
    __typename?: 'Board';
    _id: string;
    writer?: string | null;
    title: string;
    contents: string;
    createdAt: Date;
    images?: Array<string> | null;
    likeCount: number;
    dislikeCount: number;
    youtubeUrl?: string | null;
    boardAddress?: {
      __typename?: 'BoardAddress';
      _id: string;
      address?: string | null;
      zipcode?: string | null;
      addressDetail?: string | null;
    } | null;
  };
};

export const FetchBoardDocument = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      images
      likeCount
      dislikeCount
      boardAddress {
        _id
        address
        zipcode
        addressDetail
      }
      youtubeUrl
    }
  }
`;

/**
 * __useFetchBoardQuery__
 *
 * To run a query within a React component, call `useFetchBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useFetchBoardQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchBoardQuery,
    FetchBoardQueryVariables
  > &
    (
      | { variables: FetchBoardQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchBoardQuery, FetchBoardQueryVariables>(
    FetchBoardDocument,
    options
  );
}
export function useFetchBoardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchBoardQuery,
    FetchBoardQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchBoardQuery, FetchBoardQueryVariables>(
    FetchBoardDocument,
    options
  );
}
export function useFetchBoardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<FetchBoardQuery, FetchBoardQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<FetchBoardQuery, FetchBoardQueryVariables>(
    FetchBoardDocument,
    options
  );
}
export type FetchBoardQueryHookResult = ReturnType<typeof useFetchBoardQuery>;
export type FetchBoardLazyQueryHookResult = ReturnType<
  typeof useFetchBoardLazyQuery
>;
export type FetchBoardSuspenseQueryHookResult = ReturnType<
  typeof useFetchBoardSuspenseQuery
>;
export type FetchBoardQueryResult = Apollo.QueryResult<
  FetchBoardQuery,
  FetchBoardQueryVariables
>;
