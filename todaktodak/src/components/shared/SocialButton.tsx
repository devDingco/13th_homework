"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface SocialButtonProps {
  provider: "google" | "kakao" | "naver";
}

export function SocialButton({ provider }: SocialButtonProps) {
  // 소셜 로그인 처리 함수
  const handleLogin = async () => {
    try {
      // provider에 따른 옵션 설정
      const options = {
        callbackUrl: "/home", // 로그인 성공 시 리다이렉트할 경로
        redirect: true, // 소셜 로그인 페이지로 바로 이동
      };

      // 로그인 시도 전 로깅
      console.log(`${provider} 소셜 로그인 시도`);

      // NextAuth의 signIn 함수를 호출하여 소셜 로그인 시작
      const result = await signIn(provider, options);

      console.log(`${provider} 로그인 결과:`, result);
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
    }
  };

  return (
    <Button variant="social" size="social" onClick={handleLogin}>
      <Image
        src={`/images/login/${provider}.svg`}
        alt={`${provider} 로그인`}
        width={48}
        height={48}
        priority // 이미지 우선 로딩
      />
    </Button>
  );
}
