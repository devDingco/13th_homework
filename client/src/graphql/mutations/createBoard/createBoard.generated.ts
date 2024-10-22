/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type CreateBoardMutationVariables = Types.Exact<{
	createBoardInput: Types.CreateBoardInput;
}>;

export type CreateBoardMutation = {
	__typename?: 'Mutation';
	createBoard: {
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

export const CreateBoardDocument = gql`
	mutation CreateBoard($createBoardInput: CreateBoardInput!) {
		createBoard(createBoardInput: $createBoardInput) {
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
export type CreateBoardMutationFn = Apollo.MutationFunction<
	CreateBoardMutation,
	CreateBoardMutationVariables
>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      createBoardInput: // value for 'createBoardInput'
 *   },
 * });
 */
export function useCreateBoardMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
		CreateBoardDocument,
		options,
	);
}
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<
	CreateBoardMutation,
	CreateBoardMutationVariables
>;
