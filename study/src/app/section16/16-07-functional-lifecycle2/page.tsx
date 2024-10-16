"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FunctionalCounterPage() {
  const [count, setCount] = useState(0);

  //! useEffect 하나로 합치기
  useEffect(() => {
    console.log("1.그려지고 나서 실행!");
    return () => {
      console.log("3.사라지기 전에 실행!");
    };
  }, []);
  // # 배열이 있으면 처음 한번만 실행
  // # 페이지가 업데이트 될때마다 실행하기 원할 경우 배열 없이 사용
  // # 변경되는 값에 따라 실행하기 원할 경우 배열에 해당 값 넣기

  // ! 의존성 배열을 잘못쓰게 될 경우 무한루프에 빠질 수 있음
  // ! 잘못된 사용법 예시
  // # 가급적이면 useEffect안에 useState를 사용하지 않는 것이 좋음
  // useEffect(() => {
  //   setCount(count + 1);
  // }, [count]);

  const onClickCountUp = () => {
    setCount(count + 1);
  };

  console.log("나는 언제 실행될까요?");

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
