"use client";
import Rsc from "../32-03-parent-rcc-with-child-rsc";

//클라이언트 컨포넌트
export default function Rcc({ children }) {
  console.log("클라이언트 컴포넌트가 랜더링되었습니다.");

  return (
    <>
      <div> 저는 클라이언트 컴포넌트입니다.</div>
      <>{children}</>
    </>
  );
}
