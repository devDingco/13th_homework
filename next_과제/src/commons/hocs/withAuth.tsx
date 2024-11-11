"use client";
import { useRouter } from "next/navigation";
import { useLoadStore } from "@/commons/stores/load-store";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { useLoginStore } from "@/commons/stores/login-store";
import { useEffect, ComponentType } from "react";

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const { isLoaded } = useLoadStore();
    const { accessToken } = useAccessTokenStore();
    const { setIsLogged } = useLoginStore();

    useEffect(() => {
      // 이미 아폴로 셋팅에서 useEffect 로 액세스 토큰을 저장하고 있기 때문에
      // 여기서는 그 로딩이 완료되었는지만 확인해서 처리하면 된다.
      if (!isLoaded) return;
      if (isLoaded && accessToken) {
        setIsLogged(true); // 로그인 상태로 변경
      } else {
        setIsLogged(false); // 로그아웃 상태로 변경
      }
      if (accessToken) return;

      // 로딩이 완료된 상태인데 엑세스 토큰이 없다면 로그인 페이지로 이동
      alert("로그인 후 이용해주세요.");
      router.push("/login");
    }, [isLoaded]);

    return isLoaded && accessToken !== "" && <Component {...props} />;
  };

  return WrappedComponent;
};
