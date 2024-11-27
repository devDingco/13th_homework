"use client";

import FetchPolicyExample from "@/components/21-01-fetch-policy";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards1 {
    fetchBoards {
      _id
      writer
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onClickIsOpen = () => {
    setIsOpen(true);
  };
  const onClickMove = () => {
    router.push("/section21/21-01-fetch-policy-moved");
  };

  return (
    <div>
      <button onClick={onClickIsOpen}>1. 클릭 시 새로운 컨포넌트 나타남</button>
      {isOpen && <FetchPolicyExample />}
      <br />
      =========================================
      <br />
      <button onClick={onClickMove}>2. 클릭 시 페이지가 이동</button>
    </div>
  );
}
