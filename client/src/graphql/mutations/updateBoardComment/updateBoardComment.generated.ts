import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBoardCommentMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
  updateBoardComment: Types.UpdateBoardCommentInput;
  commentId: Types.Scalars['String']['input'];
}>;


export type UpdateBoardCommentMutation = { __typename?: 'Mutation', updateBoardComment: { __typename?: 'BoardCommentResponseDTO', author: string, content: string, rating?: number | null, parentId?: string | null, _id: string, createdAt: Date, replies?: Array<{ __typename?: 'BoardCommentResponseDTO', author: string, content: string, createdAt: Date }> | null } };


export const UpdateBoardCommentDocument = gql`
    mutation UpdateBoardComment($boardId: Int!, $updateBoardComment: UpdateBoardCommentInput!, $commentId: String!) {
  updateBoardComment(
    boardId: $boardId
    updateBoardComment: $updateBoardComment
    commentId: $commentId
  ) {
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
export type UpdateBoardCommentMutationFn = Apollo.MutationFunction<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>;

/**
 * __useUpdateBoardCommentMutation__
 *
 * To run a mutation, you first call `useUpdateBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardCommentMutation, { data, loading, error }] = useUpdateBoardCommentMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      updateBoardComment: // value for 'updateBoardComment'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useUpdateBoardCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>(UpdateBoardCommentDocument, options);
      }
export type UpdateBoardCommentMutationHookResult = ReturnType<typeof useUpdateBoardCommentMutation>;
export type UpdateBoardCommentMutationResult = Apollo.MutationResult<UpdateBoardCommentMutation>;
export type UpdateBoardCommentMutationOptions = Apollo.BaseMutationOptions<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>;