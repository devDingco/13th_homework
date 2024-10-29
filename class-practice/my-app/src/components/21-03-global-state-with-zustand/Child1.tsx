"use client";
import { useCountStore } from "@/commons/stores/21-03-count-store";
import React from "react";

const Child1 = (props) => {
  const { count, setCount } = useCountStore;
  const onClickCountUP = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <div>자식1의 카운트: {count}</div>
      <button onClick={onClickCountUP}>카운트 올리기</button> <br />
    </div>
  );
};

export default Child1;
