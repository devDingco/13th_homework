/** @format */

import * as Apollo from '@apollo/client';
import * as Types from '../../../types';

import { gql } from '@apollo/client';

const defaultOptions = {} as const;
export type CreateBoardCommentMutationVariables = Types.Exact<{
	boardId: Types.Scalars['Int']['input'];
	createBoardComment: Types.CreateBoardCommentInput;
}>;

export type CreateBoardCommentMutation = {
	__typename?: 'Mutation';
	createBoardComment: {
		__typename?: 'BoardCommentResponseDTO';
		author: string;
		content: string;
		rating?: number | null;
		parentId?: string | null;
		_id: string;
		createdAt: Date;
		replies?: Array<{
			__typename?: 'BoardCommentResponseDTO';
			author: string;
			content: string;
			createdAt: Date;
		}> | null;
	};
};

export const CreateBoardCommentDocument = gql`
	mutation CreateBoardComment($boardId: Int!, $createBoardComment: CreateBoardCommentInput!) {
		createBoardComment(boardId: $boardId, createBoardComment: $createBoardComment) {
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
export type CreateBoardCommentMutationFn = Apollo.MutationFunction<
	CreateBoardCommentMutation,
	CreateBoardCommentMutationVariables
>;

/**
 * __useCreateBoardCommentMutation__
 *
 * To run a mutation, you first call `useCreateBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardCommentMutation, { data, loading, error }] = useCreateBoardCommentMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      createBoardComment: // value for 'createBoardComment'
 *   },
 * });
 */
export function useCreateBoardCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateBoardCommentMutation,
		CreateBoardCommentMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>(
		CreateBoardCommentDocument,
		options,
	);
}
export type CreateBoardCommentMutationHookResult = ReturnType<typeof useCreateBoardCommentMutation>;
export type CreateBoardCommentMutationResult = Apollo.MutationResult<CreateBoardCommentMutation>;
export type CreateBoardCommentMutationOptions = Apollo.BaseMutationOptions<
	CreateBoardCommentMutation,
	CreateBoardCommentMutationVariables
>;
