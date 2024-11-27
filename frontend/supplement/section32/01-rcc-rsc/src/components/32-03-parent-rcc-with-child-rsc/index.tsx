// 'use client' 를 붙이지 않았지만 부모가 RCC이므로, 자식도 RCC 작동

export default function Rsc() {
  console.log("???컴포넌트가 랜더링되었습니다 "); //브라우저에 콘솔이 실행된다면 클라이언트 컨포넌트이다
  return <div>저는 자식입니다.</div>;
}
