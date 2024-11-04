"use client";

import { warningModal } from "@/utils/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLoadStore } from "../stores/load";
import { useAccessTokenStore } from "../stores/accessToken";

export const withAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  const { isLoaded } = useLoadStore();
  const { accessToken } = useAccessTokenStore();

  useEffect(() => {
    if (!isLoaded) return;
    if (accessToken) return;

    // accessToken이 없으면(로그인 상태가 아니라면) 로그인 페이지로 이동

    // 모달열기
    warningModal("로그인 후 이용해 주세요");
    router.push("/login");
  }, [isLoaded]);

  return <Component {...props} />;
};
