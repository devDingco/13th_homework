"use client";

import { usePathname } from "next/navigation";
import CarouselPage from "./banner";
import NavigationPage from "./navigation";

const HIDDEN_HEADER_NAVS = ["/boards/new", "/boards/detail"];
// 대문자로 쓰는것은 그냥 개발자이름규칙
export default function LayoutHaederNav({ children }) {
  const pathname = usePathname();
  // 내가 접속한 페이지의 주소를 담아오는 기능
  const isHiddenHeaderNav = HIDDEN_HEADER_NAVS.includes(pathname);
  // includes() : 배열을 사용 , 불린값으로 반환
  // is... : 개발자의이름규칙 -> 불린값은 변수이름앞에 is라고 붙혀준다
  return (
    <>
      {isHiddenHeaderNav || (
        <div>
          <NavigationPage />
          <CarouselPage />
        </div>
      )}

      <div>{children}</div>
    </>
  );
}
