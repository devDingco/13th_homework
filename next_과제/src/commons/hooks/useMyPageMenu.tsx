"use client";

import { usePathname } from "next/navigation";

const MY_PAGE_MENU = [
  {
    name: "거래 내역 & 북마크",
    url: "/mypage",
    children: [
      {
        name: "나의 상품",
        url: "/mypage",
      },
      {
        name: "북마크",
        url: "/mypage/pickeds",
      },
    ],
  },
  {
    name: "포인트 사용 내역",
    url: "/mypage/point",
    children: [
      {
        name: "전체",
        url: "/mypage/point",
      },
      {
        name: "충전 내역",
        url: "/mypage/point/loading-history",
      },
      {
        name: "구매 내역",
        url: "/mypage/point/buying-history",
      },
      {
        name: "판매 내역",
        url: "/mypage/point/selling-history",
      },
    ],
  },
  {
    name: "비밀번호 변경",
    url: "/mypage/password-change",
  },
];

export const useMyPageMenu = () => {
  const pathName = usePathname();
  const MainMenu = MY_PAGE_MENU.map((menu) => {
    if (menu.children) {
      const children = menu.children.map((child) => {
        return {
          ...child,
          isActive: pathName === child.url,
        };
      });

      return {
        ...menu,
        children,
        isActive:
          pathName === menu.url || children.some((child) => child.isActive),
      };
    }
    return {
      ...menu,
      isActive: pathName === menu.url,
    };
  });

  const SubMenu = MainMenu.filter((menu) => menu.isActive)[0]?.children;

  return { MainMenu, SubMenu };
};
