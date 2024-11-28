"use client";
import { useState, useMemo, useCallback } from "react";
import { Button } from "antd";
import ChildPage from "../02-child/page";

export default function RerenderPage() {
  console.log("컴포넌트가 렌더링된다~~~");
  // useState를 사용하면, state가 변경되면 해당하는 컴포넌트가 리렌더링된다.
  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // ! 2.함수 기억 => useCallback
  const onClickLet = useCallback(() => {
    console.log(countLet);
    countLet += 1;
  }, []);

  // ! 2.함수 기억 => useCallback
  const onClickState = useCallback(() => {
    setCountState((prev) => prev + 1);
  }, []);

  return (
    <div>
      카운트(let): {countLet}
      <br />
      <Button onClick={onClickLet}>카운트(let) +1 올리기</Button>
      <br />
      <br />
      카운트(state): {countState}
      <br />
      <Button onClick={onClickState}>카운트(state) +1 올리기</Button>
      <div>===========================================</div>
      {/* 자식에 memo 한 경우, 자식 리렌더링 되지 않음 */}
      <ChildPage />
      {/* 자시에 memo를 했더라도, props가 넘어가게되면 리렌더링됨 */}
      {/* <ChildPage countState={countState} /> */}
    </div>
  );
}
