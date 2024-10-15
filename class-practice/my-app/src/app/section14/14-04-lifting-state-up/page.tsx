"use client"; //리액트 구버전 방식으로 실행해줘(리액트 훅 못씀)
import Child1 from "@/components/14-04-lifting-state-up/Child1";
import Child2 from "@/components/14-04-lifting-state-up/Child2";
import { useState } from "react";

const 카운터 = () => {
  const [카운트변수, 카운트바꿔주는함수] = useState(0);

  const 카운트올리는기능 = () => {
    카운트바꿔주는함수(카운트변수 + 1);
  };

  //함수의 리턴은 한개만 할 수 있음. 따라서 하나로 묶어줌 빈<>로 묶던지 <div>로 묶던지...
  return (
    <>
      <Child1 카운트변수={카운트변수} 카운트바꿔주는함수={카운트바꿔주는함수} />
      <div>==========================</div>
      <Child2 카운트변수={카운트변수} 카운트올리는기능={카운트올리는기능} />
    </>
  );
};

export default 카운터;
