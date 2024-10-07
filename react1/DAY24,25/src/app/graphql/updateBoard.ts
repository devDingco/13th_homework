import { gql } from '@apollo/client';

export const UPDATE_BOARD = gql`
mutation updateBoard (
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
)
updateBoard(
    updateBoard: $updateBoard
    password: $password
    boardId: $boardId
    ){
    _id
    writer
    title
    contents
    createdAt
}
`;
