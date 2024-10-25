//등록페이지
"use client";

import BoardsWrite from "src/components/boards-write";

// import React, { ChangeEvent, useState } from "react";
// import styles from "./styles.module.css";
// import Image from "next/image";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/navigation";

// import addImage from "@assets/add_image.png";
// import { MouseEvent } from "react";

// 서버에 보낼 GraphQL 쿼리를 작성합니다.
// 게시물을 생성하기 위한 정보를 서버에 보내는 구조입니다.
// const 나의그래프큐엘셋팅 = gql`
//   mutation createBoard(
//     $writer: String
//     $password: String
//     $title: String!
//     $contents: String!
//     $youtubeUrl: String
//     $images: [String!]
//     $boardAddress: BoardAddressInput
//   ) {
//     createBoard(
//       createBoardInput: {
//         writer: $writer
//         password: $password
//         title: $title
//         contents: $contents
//         youtubeUrl: $youtubeUrl
//         images: $images
//         boardAddress: $boardAddress
//       }
//     ) {
//       _id
//     }
//   }
// `;

// 게시물 작성 페이지를 나타내는 함수입니다.
export default function BoardsNewPage() {
  return (
    <>
      <BoardsWrite isEdit={false} />
    </>
  );
}
