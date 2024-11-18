"use client";
import { useLoadStore } from "@/commons/stores/load-store";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { useEffect, ComponentType } from "react";
import { useModalStore } from "@/commons/stores/modal-store";

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const { isLoaded } = useLoadStore();
    const { accessToken } = useAccessTokenStore();
    const { setIsModal } = useModalStore();

    useEffect(() => {
      if (!isLoaded) return;
      if (accessToken) return;

      // 로그인 확인 모달
      setIsModal({
        name: "login_confirm",
      });
    }, [isLoaded]);

    return accessToken !== "" ? <Component {...props} /> : null;
  };

  return WrappedComponent;
};
