/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type DeleteBoardMutationVariables = Types.Exact<{
	boardId: Types.Scalars['Int']['input'];
}>;

export type DeleteBoardMutation = { __typename?: 'Mutation'; deleteBoard: boolean };

export const DeleteBoardDocument = gql`
	mutation DeleteBoard($boardId: Int!) {
		deleteBoard(boardId: $boardId)
	}
`;
export type DeleteBoardMutationFn = Apollo.MutationFunction<
	DeleteBoardMutation,
	DeleteBoardMutationVariables
>;

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
export function useDeleteBoardMutation(
	baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
		DeleteBoardDocument,
		options,
	);
}
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<
	DeleteBoardMutation,
	DeleteBoardMutationVariables
>;
