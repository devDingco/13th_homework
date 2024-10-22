/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type ClearBoardMutationVariables = Types.Exact<{ [key: string]: never }>;

export type ClearBoardMutation = { __typename?: 'Mutation'; clearBoard: boolean };

export const ClearBoardDocument = gql`
	mutation ClearBoard {
		clearBoard
	}
`;
export type ClearBoardMutationFn = Apollo.MutationFunction<
	ClearBoardMutation,
	ClearBoardMutationVariables
>;

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
export function useClearBoardMutation(
	baseOptions?: Apollo.MutationHookOptions<ClearBoardMutation, ClearBoardMutationVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<ClearBoardMutation, ClearBoardMutationVariables>(
		ClearBoardDocument,
		options,
	);
}
export type ClearBoardMutationHookResult = ReturnType<typeof useClearBoardMutation>;
export type ClearBoardMutationResult = Apollo.MutationResult<ClearBoardMutation>;
export type ClearBoardMutationOptions = Apollo.BaseMutationOptions<
	ClearBoardMutation,
	ClearBoardMutationVariables
>;
