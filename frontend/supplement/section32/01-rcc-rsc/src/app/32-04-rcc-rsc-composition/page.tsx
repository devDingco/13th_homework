//"use client" => 페이지는 RSC로 시작하자(그렇지 않으면하위 모두 RCC됨)

import Rcc from "@/components/32-04-rcc-rsc-composition/01-rcc";
import Rsc from "@/components/32-04-rcc-rsc-composition/02-rsc";

export default function RccRscCompositionPage() {
  console.log("서버컴포넌트가 랜더링되었습니다.");
  return (
    <>
      <div>저는 페이지입니다.</div>
      <Rcc>
        <Rsc />
      </Rcc>
    </>
  );
}
