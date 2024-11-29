"use client";

import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./contants";

interface IHeaderProps {
  hasBack: boolean;
  hasLogo: boolean;
  title?: string;
  children?: React.ReactNode;
  isTransparent?: boolean;
}

// 1. 베이스헤더
const HeaderBase = ({
  children,
  hasBack,
  hasLogo,
  title,
  isTransparent,
}: IHeaderProps) => {
  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100vw",
          height: "3.125rem",
          gap: "3.125rem",
          backgroundColor: isTransparent ? "transparent" : "lightgray",
          // 02-04-layout-header-transparent에서 추가된 속성 => 투명한 헤더 만들기 처리용
          // 1. 투명한 영역 아래에 사진, 지도 등이 보이기, 2. 게시글 등록 등 헤더 아래로 스크롤 하기
          position: "fixed",
          zIndex: 100, // position으로 쌓임 맥락을 형성한 다른 요소가 있더라도, z-index값이 다른 요소보다 높으면 위에 나타남
        }}
      >
        {hasBack && <button>뒤로가기</button>}
        {hasLogo && <h1>로고</h1>}
        {title ? <h1>{title}</h1> : <></>}
        {children ? children : <></>}
      </header>

      {/* 02-04-layout-header-transparent : fixed시에 해당 영역만큼의 높이값이 없어지는것을 방지하기 위함임 */}
      {isTransparent ? <></> : <div style={{ height: "3.125rem" }}></div>}
    </>
  );
};

// 2. 글로벌헤더
export function HeaderGlobal() {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).GLOBAL[pathname];
  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} />
    </div>
  );
}

// 3. 로컬헤더
export function Header({ children, ...rest }: IHeaderProps) {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).LOCAL[pathname];
  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} {...rest}>
        {children}
      </HeaderBase>
    </div>
  );
}
