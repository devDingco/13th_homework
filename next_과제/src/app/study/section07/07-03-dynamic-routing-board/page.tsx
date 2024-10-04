"use client";

import { useRouter } from "next/navigation";

export default function StaticRoutingPage() {
  const router = useRouter();

  const onClickSubmit_1 = () => {
    // 1. 게시글 등록
    // 2. 등록된 페이지로 이동하기
    router.push("/section07/07-03-dynamic-routing-board-moved/1");
  };

  const onClickSubmit_2 = () => {
    router.push("/section07/07-03-dynamic-routing-board-moved/2");
  };

  const onClickSubmit_3 = () => {
    router.push("/section07/07-03-dynamic-routing-board-moved/100");
  };

  return (
    <div className="flex gap-5">
      <button className="btn" onClick={() => onClickSubmit_1()}>
        1번 게시글 등록하기
      </button>
      <button className="btn" onClick={() => onClickSubmit_2()}>
        2번 게시글 등록하기
      </button>
      <button className="btn" onClick={() => onClickSubmit_3()}>
        100번 게시글 등록하기
      </button>
    </div>
  );
}
