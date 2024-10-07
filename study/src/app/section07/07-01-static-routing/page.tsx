"use client";

import { useRouter } from "next/navigation";

export default function StaticRoutingPage() {
  const router = useRouter();

  const onClickSubmit = () => {
    // 1. 게시글 등록
    // 2. 등록된 페이지로 이동하기
    router.push("/section07/07-01-static-routing-moved");
  };

  return (
    <button className="btn" onClick={() => onClickSubmit()}>
      게시글 등록하기
    </button>
  );
}
