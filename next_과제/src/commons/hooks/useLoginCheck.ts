import { useLoadStore } from "@/commons/stores/load-store";
import { useLoginStore } from "@/commons/stores/login-store";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { useEffect } from "react";

export const useLoginCheck = () => {
  const { isLoaded } = useLoadStore();
  const { accessToken } = useAccessTokenStore();
  const { isLogin, setIsLogin } = useLoginStore();

  useEffect(() => {
    if (!isLoaded) return;
    if (accessToken) {
      return setIsLogin(true);
    } else {
      return setIsLogin(false);
    }
  }, [isLoaded]);

  return { isLogin, setIsLogin };
};
