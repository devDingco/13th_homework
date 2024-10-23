"use client";

import { useState } from "react";

export default function myPage() {
  const 영희의인풋 = () => {
    const 나만의초기메시지 = "비밀번호를 입력하세요";
  };

  // 버튼 누르면 카운트 1씩 증가하는 함수 만들기 스테이트 변수 만들기
  const [count, setCount] = useState(0);

  const zzz = () => {
    setCount(count + 1);
  };

  return;
  <div>
    {/* {철수의버튼}
        <br />
        {영희의인풋}( {
            철수가방: 철수의사과,
            영희가방: 영희의사과,
            나는누구게:"함수"

        }) */}
    <div>{count}</div>
    <button onClick={zzz}>버튼</button>

    <영희의인풋
      철수가방={철수의사과}
      영희가방={영희의사과}
      나는누구게="컴포넌트"
    />

    <input type="text" placeholder={나만의초기메시지} />
  </div>;
}
