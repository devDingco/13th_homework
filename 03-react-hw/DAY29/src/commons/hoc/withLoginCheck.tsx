"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactElement } from "react";

export const withLoginCheck =
  (Component: () => React.ReactNode) =>
  <P extends Record<string, unknown>>(props: P): ReactElement<P> => {
    const router = useRouter();

    useEffect(() => {
      if (localStorage.getItem("accessToken") === null) {
        alert("로그인 후 이용 가능합니다!!!");
        void router.push("/");
      }
    }, []);

    return <Component {...props} />;
  };
