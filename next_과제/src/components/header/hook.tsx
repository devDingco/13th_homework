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
  CreatePointTransactionOfLoadingDocument,
} from "@/commons/graphql/graphql";
import { useUserInfo } from "@/commons/stores/user-info-store";

import { useQuery, useMutation } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { menuItems, chargeOptions } from "./constants";

export const useHeader = () => {
  const { setUserInfo } = useUserInfo();
  const { isHeaderHide } = useLayout();
  const router = useRouter();
  const pathname = usePathname();
  const menuItemRef = useRef<HTMLUListElement>(null);
  const [chargeModalVisible, setChargeModalVisible] = useState(false);
  const [chargePrice, setChargePrice] = useState(0);

  // 내 정보 조회
  const { data: fetchUserData } = useQuery(FetchUserLoggedInDocument);
  const data = fetchUserData?.fetchUserLoggedIn;

  // 내 정보 조회 후 유저 정보 저장
  useEffect(() => {
    if (data) {
      setUserInfo({ id: data._id, name: data.name });
    }
  }, [data]);

  // 충전 금액 선택
  const onChargePriceChange = (value: string) => {
    setChargePrice(Number(value));
  };

  const [createPointTransactionOfLoading] = useMutation(
    CreatePointTransactionOfLoadingDocument
  );

  // 충전하기
  const onCharging = async () => {
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

      const paymentId = result?.paymentId as string;

      const createPoint = await createPointTransactionOfLoading({
        variables: { paymentId },
        refetchQueries: [{ query: FetchUserLoggedInDocument }],
      });

      console.log(createPoint);

      setChargeModalVisible(false); // 충전 모달 닫기
    } catch (error) {
      console.error(error);
    }
  };

  // 현재 페이지에 맞는 메뉴 스타일 변경
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

  // 로그아웃
  const { setAccessToken } = useAccessTokenStore();
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

  // 마이페이지 팝업 토글 처리 관련
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
