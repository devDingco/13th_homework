/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type GetBoardQueryVariables = Types.Exact<{
	boardId: Types.Scalars['Int']['input'];
}>;

export type GetBoardQuery = {
	__typename?: 'Query';
	getBoard: {
		__typename?: 'BoardSchema';
		author: string;
		title: string;
		content: string;
		imageUrl?: Array<string> | null;
		youtubeUrl?: string | null;
		createdAt: Date;
		boardAddressOutput?: {
			__typename?: 'BoardAddressOutput';
			zoneCode: number;
			address: string;
			detailAddress: string;
		} | null;
	};
};

export const GetBoardDocument = gql`
	query GetBoard($boardId: Int!) {
		getBoard(boardId: $boardId) {
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
export function useGetBoardQuery(
	baseOptions: Apollo.QueryHookOptions<GetBoardQuery, GetBoardQueryVariables> &
		({ variables: GetBoardQueryVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
}
export function useGetBoardLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
}
export function useGetBoardSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>,
) {
	const options =
		baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<GetBoardQuery, GetBoardQueryVariables>(
		GetBoardDocument,
		options,
	);
}
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<typeof useGetBoardLazyQuery>;
export type GetBoardSuspenseQueryHookResult = ReturnType<typeof useGetBoardSuspenseQuery>;
export type GetBoardQueryResult = Apollo.QueryResult<GetBoardQuery, GetBoardQueryVariables>;
