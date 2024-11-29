"use client";

import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./contants";

interface IHeaderProps {
  hasBack: boolean;
  hasLogo: boolean;
  title: string;
  children?: React.ReactNode;
}

// 1. 베이스헤더
const HeaderBase = ({ children, hasBack, hasLogo, title }: IHeaderProps) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100vw",
        height: "3.125rem",
        gap: "3.125rem",
        backgroundColor: "lightgray",
      }}
    >
      {hasBack && <button>뒤로가기</button>}
      {hasLogo && <h1>로고</h1>}
      {title ? <h1>{title}</h1> : <></>}
      {children ? children : <></>}
    </header>
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
