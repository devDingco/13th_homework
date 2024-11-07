/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type SignupMutationVariables = Types.Exact<{
	signUpUser: Types.SignUpUser;
}>;

export type SignupMutation = {
	__typename?: 'Mutation';
	signup: { __typename?: 'UserSchema'; name: string; email: string };
};

export const SignupDocument = gql`
	mutation Signup($signUpUser: signUpUser!) {
		signup(signUpUser: $signUpUser) {
			name
			email
		}
	}
`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signUpUser: // value for 'signUpUser'
 *   },
 * });
 */
export function useSignupMutation(
	baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
	SignupMutation,
	SignupMutationVariables
>;
