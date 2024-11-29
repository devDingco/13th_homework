import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchBoardsQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchBoardsQuery = { __typename?: 'Query', fetchBoards: Array<{ __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string, createdAt: Date }> };


export const FetchBoardsDocument = gql`
    query fetchBoards($page: Int, $search: String) {
  fetchBoards(page: $page, search: $search) {
    _id
    writer
    title
    contents
    createdAt
  }
}
    `;

/**
 * __useFetchBoardsQuery__
 *
 * To run a query within a React component, call `useFetchBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchBoardsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchBoardsQuery(baseOptions?: Apollo.QueryHookOptions<FetchBoardsQuery, FetchBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument, options);
      }
export function useFetchBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchBoardsQuery, FetchBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument, options);
        }
export function useFetchBoardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FetchBoardsQuery, FetchBoardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument, options);
        }
export type FetchBoardsQueryHookResult = ReturnType<typeof useFetchBoardsQuery>;
export type FetchBoardsLazyQueryHookResult = ReturnType<typeof useFetchBoardsLazyQuery>;
export type FetchBoardsSuspenseQueryHookResult = ReturnType<typeof useFetchBoardsSuspenseQuery>;
export type FetchBoardsQueryResult = Apollo.QueryResult<FetchBoardsQuery, FetchBoardsQueryVariables>;