import { useState } from "react";

export default function JestUnitTestEventPage() {
  const [count, setCount] = useState(0);

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div role="count">카운트 : {count}</div>
      <button role="count-button" onClick={onClickCountUp}>
        카운트 올리기
      </button>
    </>
  );
}
