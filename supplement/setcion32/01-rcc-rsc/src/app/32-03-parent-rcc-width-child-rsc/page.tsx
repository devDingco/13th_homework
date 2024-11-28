"use client";

import Rsc from "@/components/32-03-parent-rcc-with-child-rsc";

export default function ParentRccWidthChildRscPage() {
  console.log("클라이언트 컴포넌트가 렌더링되었습니다.");

  // 부모가 RCC이므로, 자식도 RCC로 작동됨
  return (
    <>
      <div>저는 부모입니다.</div>
      <Rsc />
    </>
  );
}
