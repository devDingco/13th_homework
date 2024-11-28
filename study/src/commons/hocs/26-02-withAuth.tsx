"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoadStore } from "@/commons/stores/26-02-load-strore";
import { useAccessTokenStore } from "@/commons/stores/22-01-access-token-store";

export const withAuth =
  (Components: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const router = useRouter();
    const { isLoaded } = useLoadStore();
    const { accessToken } = useAccessTokenStore();
    useEffect(() => {
      // 이미 아폴로 셋팅에서 useEffect 로 액세스 토큰을 저장하고 있기 때문에
      // 여기서는 그 로딩이 완료되었는지만 확인해서 처리하면 된다.
      if (!isLoaded) return;
      if (accessToken) return;

      // 로딩이 완료된 상태인데 엑세스 토큰이 없다면 로그인 페이지로 이동
      alert("로그인 후 이용해주세요.");
      router.push("/section26/26-02-login-refreshtoken-refresh-success");
    }, [isLoaded]);
    console.log("props", props);
    return <Components {...props} />;
  };
