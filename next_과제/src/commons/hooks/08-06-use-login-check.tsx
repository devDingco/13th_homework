"use client";
import { useRouter } from "next/navigation";

// use가 앞에 붙으면 커스텀 훅이다. 약속된 규칙이다.
export const useLoginCheck = () => {
  const router = useRouter();
  const loginCheck = () => {
    // 로그인 체크 및 성공시

    // 로그인 실패시
    alert("로그인이 필요합니다.");
    router.push("/section08/08-06-custom-hook-login");
  };
  return { loginCheck };
};
