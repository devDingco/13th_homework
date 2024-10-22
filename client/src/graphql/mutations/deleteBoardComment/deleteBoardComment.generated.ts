/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type DeleteBoardCommentMutationVariables = Types.Exact<{
	boardId: Types.Scalars['Int']['input'];
	commentId: Types.Scalars['String']['input'];
}>;

export type DeleteBoardCommentMutation = { __typename?: 'Mutation'; deleteBoardComment: boolean };

export const DeleteBoardCommentDocument = gql`
	mutation DeleteBoardComment($boardId: Int!, $commentId: String!) {
		deleteBoardComment(boardId: $boardId, commentId: $commentId)
	}
`;
export type DeleteBoardCommentMutationFn = Apollo.MutationFunction<
	DeleteBoardCommentMutation,
	DeleteBoardCommentMutationVariables
>;

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
export function useDeleteBoardCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteBoardCommentMutation,
		DeleteBoardCommentMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>(
		DeleteBoardCommentDocument,
		options,
	);
}
export type DeleteBoardCommentMutationHookResult = ReturnType<typeof useDeleteBoardCommentMutation>;
export type DeleteBoardCommentMutationResult = Apollo.MutationResult<DeleteBoardCommentMutation>;
export type DeleteBoardCommentMutationOptions = Apollo.BaseMutationOptions<
	DeleteBoardCommentMutation,
	DeleteBoardCommentMutationVariables
>;
