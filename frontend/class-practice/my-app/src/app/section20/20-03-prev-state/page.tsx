"use client"; //리액트 구버전 방식으로 실행해줘(리액트 훅 못씀)
import { useState } from "react";

const 카운터 = () => {
  const [카운트변수, 카운트바꿔주는함수] = useState(0);

  const 카운트올리는기능 = () => {
    // 1. 기본방법
    카운트바꿔주는함수((prev) => prev + 1);

    // 2. 함수선언식
    카운트바꿔주는함수(function (prev) {
      //로직 추가 가능 if등....
      return prev + 1;
    });

    // 3. 매개변수 변경 가능
    카운트바꿔주는함수((asdadaasd) => asdadaasd + 1);
  };

  //함수의 리턴은 한개만 할 수 있음. 따라서 하나로 묶어줌 빈<>로 묶던지 <div>로 묶던지...
  return (
    <div>
      <div>{카운트변수}</div>
      <button onClick={카운트올리는기능}>카운트 올리기</button> <br />
    </div>
  );
};

export default 카운터;
