import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchBoardsCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchBoardsCountQuery = { __typename?: 'Query', fetchBoardsCount: number };


export const FetchBoardsCountDocument = gql`
    query fetchBoardsCount {
  fetchBoardsCount
}
    `;

/**
 * __useFetchBoardsCountQuery__
 *
 * To run a query within a React component, call `useFetchBoardsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchBoardsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchBoardsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchBoardsCountQuery(baseOptions?: Apollo.QueryHookOptions<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>(FetchBoardsCountDocument, options);
      }
export function useFetchBoardsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>(FetchBoardsCountDocument, options);
        }
export function useFetchBoardsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>(FetchBoardsCountDocument, options);
        }
export type FetchBoardsCountQueryHookResult = ReturnType<typeof useFetchBoardsCountQuery>;
export type FetchBoardsCountLazyQueryHookResult = ReturnType<typeof useFetchBoardsCountLazyQuery>;
export type FetchBoardsCountSuspenseQueryHookResult = ReturnType<typeof useFetchBoardsCountSuspenseQuery>;
export type FetchBoardsCountQueryResult = Apollo.QueryResult<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>;