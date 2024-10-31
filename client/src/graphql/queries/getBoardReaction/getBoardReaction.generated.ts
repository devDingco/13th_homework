/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type GetBoardReactionQueryVariables = Types.Exact<{
	boardId: Types.Scalars['Int']['input'];
}>;

export type GetBoardReactionQuery = {
	__typename?: 'Query';
	getBoardReaction: { __typename?: 'BoardReactionSchema'; like: number; hate: number };
};

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
export function useGetBoardReactionQuery(
	baseOptions: Apollo.QueryHookOptions<GetBoardReactionQuery, GetBoardReactionQueryVariables> &
		({ variables: GetBoardReactionQueryVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetBoardReactionQuery, GetBoardReactionQueryVariables>(
		GetBoardReactionDocument,
		options,
	);
}
export function useGetBoardReactionLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetBoardReactionQuery,
		GetBoardReactionQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetBoardReactionQuery, GetBoardReactionQueryVariables>(
		GetBoardReactionDocument,
		options,
	);
}
export function useGetBoardReactionSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetBoardReactionQuery, GetBoardReactionQueryVariables>,
) {
	const options =
		baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<GetBoardReactionQuery, GetBoardReactionQueryVariables>(
		GetBoardReactionDocument,
		options,
	);
}
export type GetBoardReactionQueryHookResult = ReturnType<typeof useGetBoardReactionQuery>;
export type GetBoardReactionLazyQueryHookResult = ReturnType<typeof useGetBoardReactionLazyQuery>;
export type GetBoardReactionSuspenseQueryHookResult = ReturnType<
	typeof useGetBoardReactionSuspenseQuery
>;
export type GetBoardReactionQueryResult = Apollo.QueryResult<
	GetBoardReactionQuery,
	GetBoardReactionQueryVariables
>;
