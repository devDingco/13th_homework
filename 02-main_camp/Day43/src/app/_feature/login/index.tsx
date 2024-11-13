import { useAccessTokenStore } from "@/app/_store/accessToken/store";
import { NavigationPaths, useNavigate } from "@/commons/navigate";
import { useEffect, useState } from "react";

export const withLoginCheck =
  (Component: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const navigate = useNavigate();
    const { accessToken } = useAccessTokenStore();

    useEffect(() => {
      if (accessToken) return;
      if (localStorage.getItem("accessToken") === null) {
        alert("로그인이 필요합니다.");
        navigate(NavigationPaths.login);
        return;
      }
    }, []);
    return <Component {...props} />;
  };
