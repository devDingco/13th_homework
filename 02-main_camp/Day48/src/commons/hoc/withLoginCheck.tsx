import { useAccessTokenStore } from "@/app/_store/accessToken/store";
import { useInitTokenLoadStore } from "@/app/_store/initTokenLoad-store";
import { NavigationPaths, useNavigate } from "@/utils/navigate";
import { useEffect, useState } from "react";

export const withLoginCheck =
  (Component: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const navigate = useNavigate();
    const { accessToken } = useAccessTokenStore();
    const { isInitTokenLoaded } = useInitTokenLoadStore();

    useEffect(() => {
      if (!isInitTokenLoaded) return;
      if (accessToken) return;

      alert("로그인 후 다시 시도해 주세요.");
      navigate(NavigationPaths.login);
    }, [isInitTokenLoaded]);
    return <Component {...props} />;
  };
