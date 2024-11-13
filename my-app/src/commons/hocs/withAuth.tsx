// 23- 04 + 07 -로그인체크

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export default 안하는 이유
// 임폴트할때 중괄호가 필요 없고, 다이랙트로 컴포넌트 이름을 쓸 수 있음. 이름 내맘대로 바꿀수있음
// 항상 withAuth라는 이름을 사용하기 위해서 안함

export const withAuth =
  (컴포넌트: () => JSX.Element) =>
  <P extends object>(프롭스: P) => {
    const router = useRouter();

    useEffect(() => {
      if (localStorage.getItem("accessToken") === null) {
        alert("로그인 후 이용 가능합니다!");
        router.push("/authentication/login");
      }
    }, []);

    return <컴포넌트 {...프롭스} />;
  };
