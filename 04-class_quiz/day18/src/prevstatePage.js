import React, { useState } from "react";

export default function PrevstatePage() {
  const [state, setState] = useState(0);

  function sumAll() {
    console.log(state);
    setState((prev) => prev + 1); //1
    setState((prev) => prev + 2); //1+2
    setState((prev) => prev + 3); //1+2+3
    setState((prev) => prev + 4); //1+2+3+4
  }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}
