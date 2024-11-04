"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useLayout } from "@/commons/hooks/useLayout";
import style from "./index.module.scss";
import {
  FetchUserLoggedInDocument,
  LogoutUserDocument,
} from "@/commons/graphql/graphql";

import { useQuery, useMutation } from "@apollo/client";
import { useLoadStore } from "@/commons/stores/load-store";

export const useHeader = () => {
  const router = useRouter();
  const { setIsLoaded } = useLoadStore();

  // 로그아웃
  const [logoutUser] = useMutation(LogoutUserDocument);

  const userLogOut = async () => {
    const result = await logoutUser();
    console.log("결과", result);

    // try {

    //   // 쿠키에 저장되어있는 리프레시 토큰 삭제
    //   document.cookie =
    //     "refreshToken = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    //   alert("로그아웃 되었습니다.");
    //   router.push("/");
    // } catch (error) {
    //   if (error instanceof Error) {
    //     alert(`${error.message}`);
    //   } else {
    //     alert("An unknown error occurred");
    //   }
    // }
  };

  // 내 정보 조회
  const { data: fetchUserData } = useQuery(FetchUserLoggedInDocument);
  const data = fetchUserData?.fetchUserLoggedIn;

  const menuItemRef = useRef<HTMLLIElement>(null);

  const menuMouseOver = (e) => {
    e.currentTarget.classList.add(style.active);
  };
  const menuMouseOut = (e) => {
    e.currentTarget.parentElement.parentElement.classList.remove(style.active);
    //.parent.classList.remove(style.active)
    // e.currentTarget.classList.remove(style.active);
  };

  const { isHeaderHide } = useLayout();

  const menuItems = [
    {
      // label: <Link href="/">트립토크</Link>,
      label: "트립토크",
      key: "/",
    },
    {
      // label: <Link href="/products">숙박권구매</Link>,
      label: "숙박권구매",
      key: "/products",
      children: [
        {
          // label: <Link href="/products/new">숙박권등록</Link>,
          label: "숙박권등록",
          key: "/products/new",
        },
      ],
    },
    {
      // label: <Link href="/mypage">마이페이지</Link>,
      label: "마이페이지",
      key: "/mypage",
    },
    {
      label: "게시판 임시",
      key: "",
      children: [
        {
          // label: <Link href="/boards">게시글리스트</Link>,
          label: "게시글리스트",
          key: "/boards",
        },
        {
          // label: <Link href="/boards/new">게시글등록</Link>,
          label: "게시글등록",
          key: "/boards/new",
        },
      ],
    },
  ];

  return {
    isHeaderHide,
    menuItems,
    menuItemRef,
    router,
    menuMouseOver,
    menuMouseOut,
    data,
    userLogOut,
  };
};
