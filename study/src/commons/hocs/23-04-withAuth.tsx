"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const withAuth = (Components: any) => (props: any) => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용해주세요.");
      router.push("/section23/23-04-login-localstorage-check-hoc");
    }
  }, []);
  return <Components {...props} />;
};
