"use client";

export default function TtvTtiExample2Page() {
  // 하이드레이션 이전에는 클릭 안됨
  const onClickButton = () => {
    alert("현재까지 TTI까지 완료");
  };
  return (
    <div>
      <button onClick={onClickButton}>버튼을 클릭하세요(TTV)</button>
    </div>
  );
}
