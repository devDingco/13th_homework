"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withLoginCheck =
  (Component: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const router = useRouter();

    useEffect(() => {
      if (localStorage.getItem("accessToken") === null) {
        alert("로그인 후 이용 가능합니다!!!");
        void router.push("/");
      }
    }, []);

    return <Component {...props} />;
  };
