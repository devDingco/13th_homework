"use client";

import { use, useCallback, useMemo, useState } from "react";

export default function ReRenderPage() {
  console.log("컴포넌트가 랜더링 되었습니다.");

  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // 1. 변수 기억 => useMemo (함수의 리턴 값으로 기억하게 하고싶은 값을 넣어주면 된다)
  // const aaa = Math.random();
  // console.log(aaa);
  const aaa = useMemo(() => Math.random(), []);
  console.log(aaa);

  // 2. 함수 기억 => useCallback
  const onClickCountLet = useCallback(() => {
    console.log(countLet + 1);
    countLet += 1; // countLet = countLet + 1
  }, []);

  // 3. useCallback 주의사항 => state까지 기억됨
  const onCLickCountState = useCallback(() => {
    // console.log(countState + 1);
    // setCountState(countState + 1); // 1만 계속 찍히고 카운트 안됨 (state가 기억됨)
    setCountState((prev) => prev + 1); //이렇게해야 올라감
  }, []);

  return (
    <>
      <div>카운트(let): {countLet}</div>
      <button onClick={onClickCountLet}>카운트(let) + 1 올리기</button>

      <div>카운트(state): {countState}</div>
      <button onClick={onCLickCountState}>카운트(state) + 1 올리기</button>
    </>
  );
}
