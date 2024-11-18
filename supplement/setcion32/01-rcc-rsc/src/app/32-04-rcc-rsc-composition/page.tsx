// "use client" 페이지 컴포넌트에서는 use client 쓰지말고 Rsc로 시작하자! 그렇지 않으면 하위는 자동으로 RCC로 작동되기 때문에!

import Rsc from "@/components/32-04-rcc-rsc-composition/02-rsc";
import Rcc from "@/components/32-04-rcc-rsc-composition/01-rcc";

export default function RccRscCompositionPage() {
  console.log("서버 컴포넌트가 렌더링되었습니다.");
  return (
    <>
      <div>저는 페이지 컴포넌트입니다.</div>
      <Rcc>
        <Rsc />
      </Rcc>
    </>
  );
}
