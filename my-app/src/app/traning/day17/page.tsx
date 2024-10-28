"use client";

import { on } from "events";
import { useState } from "react";

// export default function hello() {
//   let onCilckSubmit = () => {
//     document.getElementById("aaa").innerText = "반갑습니다";
//   };
//   return (
//     <button id="aaa" onClick={onCilckSubmit}>
//       안녕하세요
//     </button>
//   );
// }

// export default function hello2() {
//   // const [state, setState] = useState("안녕하세요");
//   // const onClickSubmit = () => {
//   //   setState("반갑습니다");
//   // };
//   return (
//     // <button onClick={onClickSubmit}>{state}</button>)
//   )
//   }

// export default function hello2() {
//   const [count, setCount] = useState(0);

//   const onClickSubmit = () => {
//     setCount(count + 1);
//     // setCount((prevCount) => {
//     //   prevCount + 1;
//     // });
//   };

//   return (
//     <>
//       <div>{count}</div>
//       <button onClick={onClickSubmit}>카운트증가</button>
//     </>
//   );
// }

export default function counter() {
  let aaa = 1;
  // let plus = aaa + 1;
  const onClickSubmit = () => {
    document.getElementById("start").innerText = aaa++;
  };

  return (
    <>
      <div id="start">0</div>
      <button onClick={onClickSubmit}>카운트증가</button>
    </>
  );
}
