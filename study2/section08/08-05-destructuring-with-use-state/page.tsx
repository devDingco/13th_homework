"use client";

import { useState } from "react";

export default function DestructuringWithUseState() {
  const 결과값 = useState(0);
  const increment = () => {
    결과값[1](결과값[0] + 1);
  };
  const decrement = () => {
    결과값[1](결과값[0] - 1);
  };

  // const [count, setCount] = useState(0);

  // const increment = () => {
  //   setCount(count + 1);
  // };

  // const decrement = () => {
  //   setCount(count - 1);
  // };

  return (
    <div className="flex gap-2 items-center">
      <button className="btn" onClick={increment}>
        +
      </button>
      <div>{결과값[0]}</div>
      <button className="btn" onClick={decrement}>
        -
      </button>
      {/* <button onClick={increment}>+</button>
      <div>{count}</div>
      <button onClick={decrement}>-</button> */}
    </div>
  );
}
