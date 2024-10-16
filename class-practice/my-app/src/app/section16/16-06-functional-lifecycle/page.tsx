"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FunctionalCounterPage() {
  const [count, setCount] = useState(1);

  // 1.componentDidMount와 동일
  useEffect(() => {
    console.log("그려지고 나서 실행!");
  }, []);

  // 2. componentDidMount + componentDidUpdate 동일
  useEffect(() => {
    console.log("변경되고 나서 실행!");
  }, []);

  useEffect(() => {
    //3. componentWillUnmount 동일 ==> clean-up function 이라고 부름
    return () => {
      console.log("사라지기 전에 실행");
    };
  }, []);

  const onClickCountUp = () => {
    //해결방법 1 화살표함수
    setCount(count + 1);
    //setState기능은 상속받은 Component에 내장되어있었음
  };

  return (
    <>
      <div>{count}</div>
      {/* 해결방법2 로직상의 this를 연결 */}
      <button onClick={onClickCountUp}>카운트 올리는 버튼</button>
      <Link href={"/"}>나가기</Link>
    </>
  );
}
