"use client"; //리액트 구버전 방식으로 실행해줘(리액트 훅 못씀)
import Child1 from "@/components/21-03-global-state-with-zustand/Child1";
import Child2 from "@/components/21-03-global-state-with-zustand/Child2";

const 카운터 = () => {
  return (
    <>
      <Child1 />
      <div>==========================</div>
      <Child2 />
    </>
  );
};

export default 카운터;
