import { gql } from "@apollo/client";

export const 나의그래프큐엘셋팅 = gql `
    mutation createBoard($mywriter: String, $mytitle: String, $mycontents: String) { 
        createBoard (
        writer: $mywriter
        title: $mytitle
        contents: $mycontents
        
    ) {
        _id
        number
        message
     } 
    }
` ;

export const UPDATE_BOARD = gql`
    mutation updateBoard($mynumber: Int, $mywriter: String, $mytitle: String, $mycontents: String) {
        updateBoard(number: $mynumber, writer: $mywriter, title: $mytitle, contents: $mycontents) {
            _id
            number
            message
        }
    }
`;

export const FETCH_BOARD = gql`
    query fetchBoard($mynumber: Int) {
    fetchBoard(number: $mynumber){
        number
        writer
        title
        contents
    }
    }
`