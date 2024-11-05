"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/boards"); // 페이지가 로드될 때 '/boards'로 리다이렉트
  }, [router]);

  return null; // 로딩 상태를 표시할 수도 있음
}
