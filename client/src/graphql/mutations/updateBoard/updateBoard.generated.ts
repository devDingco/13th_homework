import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBoardMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int']['input'];
  updateBoardInput: Types.UpdateBoardInput;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'BoardSchema', author: string, title: string, content: string, imageUrl?: Array<string> | null, youtubeUrl?: string | null, createdAt: Date, boardAddressOutput?: { __typename?: 'BoardAddressOutput', zoneCode: number, address: string, detailAddress: string } | null } };


export const UpdateBoardDocument = gql`
    mutation UpdateBoard($boardId: Int!, $updateBoardInput: UpdateBoardInput!) {
  updateBoard(boardId: $boardId, updateBoardInput: $updateBoardInput) {
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
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      updateBoardInput: // value for 'updateBoardInput'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;