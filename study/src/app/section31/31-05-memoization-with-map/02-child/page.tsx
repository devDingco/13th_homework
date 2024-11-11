import { memo } from "react";

function Word({ text }) {
  console.log("자식이 렌더링된다~~~", text);
  // memo 를 활용하게 되면 변경된 부분에 대해서만 리렌더링이 일어난다.
  return <>{text} </>;
}

export default memo(Word);

// export default function Word({ text }) {
//   console.log("자식이 렌더링된다~~~", text);
//   return <>{text} </>;
// }
