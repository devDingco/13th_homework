"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLayout } from "@/commons/hooks/useLayout";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import style from "./index.module.scss";
import {
  FetchUserLoggedInDocument,
  LogoutUserDocument,
} from "@/commons/graphql/graphql";

import { useQuery, useMutation } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores/access-token";

export const useHeader = () => {
  const { isHeaderHide } = useLayout();
  const router = useRouter();
  const pathname = usePathname();
  const menuItemRef = useRef<HTMLUListElement>(null);
  const [chargeModalVisible, setChargeModalVisible] = useState(false);
  const [chargePrice, setChargePrice] = useState(0);

  // 내 정보 조회
  const { data: fetchUserData } = useQuery(FetchUserLoggedInDocument);
  const data = fetchUserData?.fetchUserLoggedIn;

  // 충전 금액 선택
  const onChargePriceChange = (value: string) => {
    setChargePrice(Number(value));
  };

  // 충전하기
  const onCharging = async () => {
    console.log(
      `${process.env.NEXT_PUBLIC_PORTONE_STORE_ID}`,
      `${process.env.NEXT_PUBLIC_PORTONE_CHANNEL_ID}`,
      uuidv4()
    );
    try {
      const result = await PortOne.requestPayment({
        storeId: `${process.env.NEXT_PUBLIC_PORTONE_STORE_ID}`,
        channelKey: `${process.env.NEXT_PUBLIC_PORTONE_CHANNEL_ID}`,
        paymentId: uuidv4(), // 결제 고유번호 - 결제 완료 후 결제 정보 조회를 위해 사용, uuid로 생성
        orderName: "포인트 충전",
        totalAmount: Number(chargePrice),
        currency: "CURRENCY_KRW",
        productType: "PRODUCT_TYPE_REAL",
        payMethod: "EASY_PAY",
        easyPay: {
          easyPayProvider: "EASY_PAY_PROVIDER_KAKAOPAY",
        },
        customer: {
          fullName: data?.name,
          email: data?.email,
        },
      });

      console.log(result);

      setChargeModalVisible(false); // 충전 모달 닫기
    } catch (error) {
      console.error(error);
    }
  };

  // 충전 금액 옵션
  const chargeOptions = [
    {
      value: "100",
      label: "100P",
    },
    {
      value: "500",
      label: "500P",
    },
    {
      value: "2000",
      label: "2,000P",
    },
    {
      value: "5000",
      label: "5,000P",
    },
    {
      value: "10000",
      label: "10,000P",
    },
    {
      value: "50000",
      label: "50,000P",
    },
  ];

  // 현재 페이지에 맞는 메뉴 활성화
  const updateActiveMenu = () => {
    const menuItemKeys = menuItems.map((item) => item.key);
    const activeMenu = menuItemRef.current?.querySelector(
      `li a[href="${pathname}"]`
    );
    if (activeMenu && menuItemKeys.includes(pathname)) {
      activeMenu.classList.add(style.linkActive);
      // 해당하지 않는 메뉴는 active 클래스 제거
      menuItemRef.current?.querySelectorAll("li").forEach((li) => {
        if (li !== activeMenu.parentElement) {
          li.querySelector("a")?.classList.remove(style.linkActive);
        }
      });
    }
  };

  useEffect(() => {
    updateActiveMenu();
  }, [pathname]);

  const { setAccessToken } = useAccessTokenStore();
  // 로그아웃
  const [logoutUser] = useMutation(LogoutUserDocument);
  const userLogOut = async () => {
    try {
      await logoutUser();
      setAccessToken("");
    } catch (error) {
      console.error(error);
    }
  };

  // 메뉴에서 마우스가 올라가면 active 클래스 추가
  const menuMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    target.classList.add(style.active);
    // target을 제외한 다른 메뉴는 active 클래스 제거
    menuItemRef.current?.querySelectorAll("li").forEach((li) => {
      if (li !== target) {
        li.classList.remove(style.active);
      }
    });
  };

  // 헤더 메뉴에서 마우스가 떠나면 서브 메뉴 노출 처리하는 active 클래스 제거
  const menuMouseLeave = () => {
    menuItemRef.current?.querySelectorAll("li").forEach((li) => {
      li.classList.remove(style.active);
    });
  };

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
          label: "게시글리스트",
          key: "/boards",
        },
        {
          label: "게시글등록",
          key: "/boards/new",
        },
      ],
    },
  ];

  const myInfoPopRef = useRef<HTMLDivElement>(null);
  const myInfoPopToggle = () => {
    console.log(myInfoPopRef.current);
    myInfoPopRef.current?.classList.toggle("hidden");
  };

  return {
    isHeaderHide,
    menuItems,
    menuItemRef,
    router,
    menuMouseOver,
    menuMouseLeave,
    data,
    userLogOut,
    onChargePriceChange,
    chargeModalVisible,
    setChargeModalVisible,
    onCharging,
    chargeOptions,
    myInfoPopToggle,
    myInfoPopRef,
  };
};
