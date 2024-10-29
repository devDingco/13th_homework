"use client";
import React from "react";

const Child2 = (props) => {
  const { count, setCount } = useCountStore;
  const onClickCountUP = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <div>자식2의 카운트: {count}</div>
      <button onClick={onClickCountUP}>카운트 올리기</button> <br />
    </div>
  );
};

export default Child2;
