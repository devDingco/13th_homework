import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBoardMutationVariables = Types.Exact<{
  updateBoardInput: Types.UpdateBoardInput;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  boardId: Types.Scalars['ID']['input'];
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'Board', _id: string, writer?: string | null, title: string, contents: string, createdAt: Date, updatedAt: Date, images?: Array<string> | null, youtubeUrl?: string | null, likeCount: number, dislikeCount: number, boardAddress?: { __typename?: 'BoardAddress', _id: string, zipcode?: string | null, address?: string | null, addressDetail?: string | null } | null } };


export const UpdateBoardDocument = gql`
    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {
  updateBoard(
    updateBoardInput: $updateBoardInput
    password: $password
    boardId: $boardId
  ) {
    _id
    writer
    title
    contents
    createdAt
    updatedAt
    images
    boardAddress {
      _id
      zipcode
      address
      addressDetail
    }
    youtubeUrl
    likeCount
    dislikeCount
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
 *      updateBoardInput: // value for 'updateBoardInput'
 *      password: // value for 'password'
 *      boardId: // value for 'boardId'
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