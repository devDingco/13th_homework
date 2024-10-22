/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type IsPasswordCorrectMutationVariables = Types.Exact<{
	boardId: Types.Scalars['Int']['input'];
	password: Types.Scalars['String']['input'];
}>;

export type IsPasswordCorrectMutation = { __typename?: 'Mutation'; isPasswordCorrect: boolean };

export const IsPasswordCorrectDocument = gql`
	mutation IsPasswordCorrect($boardId: Int!, $password: String!) {
		isPasswordCorrect(boardId: $boardId, password: $password)
	}
`;
export type IsPasswordCorrectMutationFn = Apollo.MutationFunction<
	IsPasswordCorrectMutation,
	IsPasswordCorrectMutationVariables
>;

/**
 * __useIsPasswordCorrectMutation__
 *
 * To run a mutation, you first call `useIsPasswordCorrectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIsPasswordCorrectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [isPasswordCorrectMutation, { data, loading, error }] = useIsPasswordCorrectMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useIsPasswordCorrectMutation(
	baseOptions?: Apollo.MutationHookOptions<
		IsPasswordCorrectMutation,
		IsPasswordCorrectMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<IsPasswordCorrectMutation, IsPasswordCorrectMutationVariables>(
		IsPasswordCorrectDocument,
		options,
	);
}
export type IsPasswordCorrectMutationHookResult = ReturnType<typeof useIsPasswordCorrectMutation>;
export type IsPasswordCorrectMutationResult = Apollo.MutationResult<IsPasswordCorrectMutation>;
export type IsPasswordCorrectMutationOptions = Apollo.BaseMutationOptions<
	IsPasswordCorrectMutation,
	IsPasswordCorrectMutationVariables
>;
