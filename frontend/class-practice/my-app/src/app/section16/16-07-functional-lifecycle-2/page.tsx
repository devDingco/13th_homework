"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FunctionalCounterPage() {
  const [count, setCount] = useState(1);

  // 1. useEffect 하나로 합치기
  useEffect(() => {
    console.log("그려지고 나서 실행!");

    return () => {
      console.log("사라지기 전에 실행");
    };
  }, [count]);

  // 2. useEffect 잘못된 사용법( 1-추가랜더링, 2-무한루프에 빠질수 있음)
  // useEffect(() => {
  //   setCount(10)
  // }, [count]);

  const onClickCountUp = () => {
    //해결방법 1 화살표함수
    setCount(count + 1);
    //setState기능은 상속받은 Component에 내장되어있었음
  };

  console.log("나는 언제 실행되게?");

  return (
    <>
      <div>{count}</div>
      {/* 해결방법2 로직상의 this를 연결 */}
      <button onClick={onClickCountUp}>카운트 올리는 버튼</button>
      <Link href={"/"}>나가기</Link>
    </>
  );
}
