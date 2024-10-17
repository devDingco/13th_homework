"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FunctionalCounterPage() {
  const [count, setCount] = useState(0);

  // ! 의존성 배열[]에 아무것도 넣지 않으면 Mount시에만 렌더해주고 끝나게 됩니다.(1번만 실행)
  // ! componentDidMount 와 동일
  useEffect(() => {
    console.log("1.그려지고 나서 실행!");
  }, []);

  // ============================================================

  // ! componentDidMount + componentDidUpdate 와 동일
  useEffect(() => {
    console.log("2-1.변경되고 나서 실행!");
  });

  // ! count가 수정될때만 리렌더 해주기
  useEffect(() => {
    console.log("2-2.변경되고 나서 실행!");
  }, [count]);

  // ============================================================

  // ! componentWillUnmount 와 동일 => clean up function 이라고 부름
  useEffect(() => {
    return () => {
      console.log("3.사라지기 전에 실행!");
    };
  }, []);

  const onClickCountUp = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-red-500 font-bold">함수형 컴포넌트로 만든 카운터</h1>
      <p>{count}</p>
      <button className="btn" onClick={onClickCountUp}>
        카운트 올리는 버튼
      </button>
      <Link href="/">나가기</Link>
    </div>
  );
}
