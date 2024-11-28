"use client";

export default function TtvTtiExample2Page() {
  const onClickButton = () => {
    alert("버튼이 클릭되었습니다 TTI 완료! 클릭도 되지롱");
  };
  return (
    <>
      <button onClick={onClickButton}>
        버튼을 클릭하세요! TTV 보이기만 하지롱
      </button>
    </>
  );
}
