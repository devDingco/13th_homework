"use client";
import { useState, useMemo, useCallback } from "react";
import { Button } from "antd";

export default function RerenderPage() {
  console.log("컴포넌트가 렌더링된다~~~");
  // useState를 사용하면, state가 변경되면 해당하는 컴포넌트가 리렌더링된다.
  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // ! 1.변수 기억 => useMemo
  // 계산이 많이 들어가는 경우 useMemo를 사용하면, 리렌더링 시에 계산을 다시 하지 않고, 기존 값을 사용한다.
  // 무조건 사용하는 것은 좋지않다. => 계산이 많이 들어가는 경우에만 사용
  // const aaa = Math.random();
  // console.log(aaa);
  const aaa = useMemo(() => Math.random(), []);
  console.log(aaa);

  // ! 2.함수 기억 => useCallback
  const onClickLet = useCallback(() => {
    console.log(countLet);
    countLet += 1;
  }, []);

  // ! 2.함수 기억 => useCallback
  const onClickState = useCallback(() => {
    // ! 3.useCallback 주의사항 => state까지 기억됨
    // useCallback안에서 state를 사용하면, state까지 기억한다. 그러므로 변경되는 state를 사용하고 싶다면, prev를 사용한다.
    setCountState((prev) => prev + 1);
    // 아래처럼 사용하면, state가 변경되지 않는다.
    // setCountState(countState + 1);
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
    </div>
  );
}
