"use client";

import { warningModal } from "@/utils/modal";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const withAuth = (Component: any) => (props: any) => {
  const router = useRouter();

  useEffect(() => {
    // accessToken이 없으면(로그인 상태가 아니라면) 로그인 페이지로 이동
    if (localStorage.getItem("accessToken") === null) {
      // 모달열기
      warningModal("로그인 후 이용해 주세요");
      router.push("/login");
    }
  }, []);

  return <Component {...props} />;
};
