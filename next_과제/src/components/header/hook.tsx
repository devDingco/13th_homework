"use client";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLayout } from "@/commons/hooks/useLayout";
import _ from "lodash";
import Link from "next/link";

export const useHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isHeaderHide } = useLayout();

  const menuItems: MenuProps["items"] = [
    {
      label: <Link href="/">트립토크</Link>,
      key: "/",
    },
    {
      label: <Link href="/buyticket">숙박권구매</Link>,
      key: "/buyticket",
    },
    {
      label: <Link href="/mypage">마이페이지</Link>,
      key: "/mypage",
    },
    {
      label: "게시판 임시",
      key: "[boards]",
      children: [
        {
          label: <Link href="/boards">게시글리스트</Link>,
          key: "/boards",
        },
        {
          label: <Link href="/boards/new">게시글등록</Link>,
          key: "/boards/new",
        },
      ],
    },
  ];

  const [current, setCurrent] = useState("/");

  function getKeys(items: MenuProps["items"]): string[] {
    return _.flatMap(items, (item) => {
      if (!item) return [];
      const keys = [item.key].filter((key): key is string => key !== undefined);
      if ("children" in item && item.children) {
        keys.push(...getKeys(item.children)); // children의 key 값도 추출
      }
      return keys;
    });
  }
  const keys = getKeys(menuItems);

  useEffect(() => {
    keys.forEach((key) => {
      if (pathname.includes(key)) {
        setCurrent(key);
      }
    });
  }, [pathname, keys]);

  const onMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return {
    isHeaderHide,
    current,
    onMenu,
    menuItems,
    router,
  };
};
