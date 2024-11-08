"use client";

export default function TtvTtiExample1Page() {
  return (
    <div>
      <div>브라우저 + 서버 철수</div>
      {process.browser && <div>브라우저에서만 그려짐 영희</div>}
      {typeof window !== "undefined" && <div>브라우저 훈이</div>}
      <div>브라우저 + 서버 맹구</div>
    </div>
  );
}
//    <div>브라우저 + 서버 철수</div> <div>브라우저 + 서버 맹구</div> 먼저있다가
//    {process.browser && <div>브라우저에서만 그려짐 영희</div>}
//   {typeof window !== "undefined" && <div>브라우저 훈이</div>} 뒤늦게 나옴
