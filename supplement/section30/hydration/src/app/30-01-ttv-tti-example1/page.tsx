"use client";

export default function TtvTtiExample1Page() {
  return (
    <>
      <div>
        <div>브라우저에서도 그려지고 서버에서도 그려질꺼야! 철수</div>
        {process.browser && <div>브라우저에서만 보여지는 내용 영희</div>}
        {typeof window !== "undefined" && (
          <div>브라우저에서만 보여지는 내용 훈이</div>
        )}
      </div>
    </>
  );
}
