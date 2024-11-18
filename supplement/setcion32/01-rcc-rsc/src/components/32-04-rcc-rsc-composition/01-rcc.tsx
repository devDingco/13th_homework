"use client"; // 클라이언트 컴포넌트 (RCC) 설정

import Rsc from "@/components/32-04-rcc-rsc-composition/02-rsc";

export default function Rcc({ children }) {
  console.log("클라이언트 컴포넌트가 렌더링되었습니다.");
  return (
    <>
      <div>저는 RCC 컴포넌트입니다.</div>
      {children}
      {/* <Rsc /> 
      Rsc가 서버컴포넌트여도 여기서 실행되면 부모가 클라이언트 이기 때문에 
      클라이언트 컴포넌트로 작동한다. 
      하지만 props.children으로 넘겨주게되면
      서버컴포넌트로 작동한다.
      */}
    </>
  );
}
