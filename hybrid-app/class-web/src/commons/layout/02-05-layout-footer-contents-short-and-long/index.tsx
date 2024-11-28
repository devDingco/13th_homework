import { HeaderGlobal } from "./header";

// 글로벌 헤더(투명 포함) + 로컬 헤더(투명 포함) + 숏컨텐츠푸터 + 롱컨텐츠푸터 렌더링하는 레이아웃
export default function LayoutFooterContentsShortAndLong({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100vw",
        // 02-05-layout-footer-contents-short-and-long : 컨텐츠가 짧을 때와 길 때의 레이아웃 변경 처리용 부모 박스 스타일 추가
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
      }}
    >
      <HeaderGlobal />
      {children}
    </div>
  );
}
