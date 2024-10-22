/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type GetBoardCommentQueryVariables = Types.Exact<{
	boardId: Types.Scalars['Int']['input'];
	page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type GetBoardCommentQuery = {
	__typename?: 'Query';
	getBoardComment: Array<{
		__typename?: 'BoardCommentResponseDTO';
		author: string;
		content: string;
		rating?: number | null;
		parentId?: string | null;
		_id: string;
		createdAt: any;
		replies?: Array<{
			__typename?: 'BoardCommentResponseDTO';
			author: string;
			content: string;
			createdAt: any;
		}> | null;
	}>;
};

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
export function useGetBoardCommentQuery(
	baseOptions: Apollo.QueryHookOptions<GetBoardCommentQuery, GetBoardCommentQueryVariables> &
		({ variables: GetBoardCommentQueryVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetBoardCommentQuery, GetBoardCommentQueryVariables>(
		GetBoardCommentDocument,
		options,
	);
}
export function useGetBoardCommentLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetBoardCommentQuery, GetBoardCommentQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetBoardCommentQuery, GetBoardCommentQueryVariables>(
		GetBoardCommentDocument,
		options,
	);
}
export function useGetBoardCommentSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetBoardCommentQuery, GetBoardCommentQueryVariables>,
) {
	const options =
		baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<GetBoardCommentQuery, GetBoardCommentQueryVariables>(
		GetBoardCommentDocument,
		options,
	);
}
export type GetBoardCommentQueryHookResult = ReturnType<typeof useGetBoardCommentQuery>;
export type GetBoardCommentLazyQueryHookResult = ReturnType<typeof useGetBoardCommentLazyQuery>;
export type GetBoardCommentSuspenseQueryHookResult = ReturnType<
	typeof useGetBoardCommentSuspenseQuery
>;
export type GetBoardCommentQueryResult = Apollo.QueryResult<
	GetBoardCommentQuery,
	GetBoardCommentQueryVariables
>;
