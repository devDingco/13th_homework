"use client";

// import styles from "./styles.module.css";
// import Image from "next/image";
import BoardsWrite from "@/app/components/boards";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

// 데이터 불러오기
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;

const BoardsEdit = () => {
  const params = useParams();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  console.log(data?.fetchBoard);

  return <BoardsWrite isEdit={true} data={data} />;
};

export default BoardsEdit;
