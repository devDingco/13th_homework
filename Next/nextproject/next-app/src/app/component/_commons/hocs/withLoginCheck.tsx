"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const withLoginCheck = (Component: any) => (Props: any) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      Modal.error({
        title: "로그인 후 이용 가능합니다!!!",
      });
      void router.push("../../../login");
    }
  }, []);

  return <Component {...Props} />;
};
