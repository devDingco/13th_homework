import { gql } from "@apollo/client";

const FETCH_BOARDS = gql`
    query fetchBoardSearch($mypage: Int, $mysearch: String) {
        fetchBoards(page: $mypage, search: $mysearch) {
        _id
        writer
        title
        contents
     }
   }
`