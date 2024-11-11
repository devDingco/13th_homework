"use client";
import { useState } from "react";
import { Button } from "antd";

export default function RerenderPage() {
  console.log("컴포넌트가 렌더링된다~~~");
  // useState를 사용하면, state가 변경되면 해당하는 컴포넌트가 리렌더링된다.

  let countLet = 0;
  const onClickLet = () => {
    console.log(countLet);
    countLet += 1;
  };

  const [countState, setCountState] = useState(0);
  const onClickState = () => {
    setCountState((prev) => prev + 1);
  };

  return (
    <div>
      카운트(let): {countLet}
      <Button onClick={onClickLet}>카운트(let) +1 올리기</Button>
      <br />
      카운트(state): {countState}
      <Button onClick={onClickState}>카운트(state) +1 올리기</Button>
    </div>
  );
}
