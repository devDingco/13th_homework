import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
    query fetchBoards($page: Int) {
        fetchBoards(page: $page) {
            _id
            title
            writer
            contents
            createdAt
            boardAddress {
                _id
                zipcode
                address
                addressDetail
            }
        }
    }
`;
