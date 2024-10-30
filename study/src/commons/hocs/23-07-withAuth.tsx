"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const withAuth =
  (Components: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const router = useRouter();
    useEffect(() => {
      if (localStorage.getItem("accessToken") === null) {
        alert("로그인 후 이용해주세요.");
        router.push("/section23/23-04-login-localstorage-check-hoc");
      }
    }, []);
    console.log("props", props);
    return <Components {...props} />;
  };
