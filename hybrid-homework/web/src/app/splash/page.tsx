"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SplashPage() {
  const router = useRouter();

  // 3초 뒤 로그인 페이지로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <main style={{ width: "100vw" }}>
      <div style={{ width: "100%" }}>
        <Image src="/images/splash.png" alt="splash" objectFit="cover" fill />
      </div>
    </main>
  );
}
