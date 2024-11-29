import { HeaderGlobal } from "./header";

// 글로벌 헤더(투명 포함) + 로컬 헤더(투명 포함) 렌더링하는 레이아웃
export default function LayoutHeaderTransparent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderGlobal />
      {children}
    </>
  );
}
