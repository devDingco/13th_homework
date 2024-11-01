"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const loginCheck = (컴포넌트: any) => (프롭스: any) => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용가능");
      router.push("/login");
    }
  }, []);
  return <컴포넌트 {...프롭스} />;
};
