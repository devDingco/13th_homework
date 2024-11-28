"use client";

import { usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./contants";

export default function HeaderGlobal() {
  const pathname = usePathname();

  // commons/layout/02-02-layout-header-global/contants.ts 에서 설정해둔 옵션을 가져온다.
  const option = HEADER_OPTIONS.GLOBAL[pathname];

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
      {option?.hasBack && <button>뒤로가기</button>}
      {option?.hasLogo && <h1>로고</h1>}
      {option?.title && <h1>{option.title}</h1>}
    </header>
  );
}
