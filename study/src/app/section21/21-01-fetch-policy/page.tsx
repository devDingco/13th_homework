"use client";

import FetchPolicyComp from "@/components/21-01-fetch-policy";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";

// const FETCH_BOARDS = gql`
//   query fetchBoards {
//     fetchBoards {
//       _id
//       writer
//       title
//       createdAt
//     }
//   }
// `;

export default function FetchPolicy() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);

  const onClickIsOpen = () => {
    setIsOpen(true);
  };
  const onClickIsMove = () => {
    router.push("/section21/21-01-fetch-policy-moved");
  };

  return (
    <>
      <Button onClick={onClickIsOpen}>1.새로운 컴포넌트가 나타난다.</Button>
      {isOpen && <FetchPolicyComp />}
      <br />
      ==================================================================================================
      <br />
      <Button onClick={onClickIsMove}>2.페이지가 이동됩니다.</Button>
    </>
  );
}
