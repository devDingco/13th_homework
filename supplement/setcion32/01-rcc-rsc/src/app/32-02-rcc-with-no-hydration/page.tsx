// "use client"; 해당 선언이 없으면 서버사이드 렌더링이 되는 컴포넌트입니다.

export default function RscWithCachePage() {
  console.log("요청이 완료되었습니다.");
  return <button>요청하기</button>;
}
