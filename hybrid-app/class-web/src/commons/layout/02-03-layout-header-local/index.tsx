import { HeaderGlobal } from "./header";

// 글로벌 헤더와 로컬 헤더를 렌더링하는 레이아웃
export default function LayoutGlobalAndLocal({
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
