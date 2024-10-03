"use client"
import BoardWrite from '../../../../component/board-write'
import { gql, useQuery } from '@apollo/client';
import { useParams } from "next/navigation";

const FetchBoard = gql`
  query fetchBoard($myboardId: ID!) {
    fetchBoard(boardId: $myboardId) {
      _id
      writer
      title
      contents
      createdAt
      # boardAddress {
      #   address
      #   zipcode
      #   addressDetail
      # }
    }
  }
`;


export default function BoardEditPage() {
    const params = useParams();
    const { data } = useQuery(FetchBoard, {
        variables: {
          myboardId: params.boardId
        },
      });
      console.log(data)
    return(<>{ 
       data && <BoardWrite isEdit={true} data={data}/>
      //  data가 존재하는 경우에만 BoardWrite 렌더링
      }</>)
}
