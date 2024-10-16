import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
    query fetchBoards {
        fetchBoards {
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
