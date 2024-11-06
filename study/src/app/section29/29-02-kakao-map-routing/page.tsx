"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function KakaoMapRoutingPage() {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push("/section29/29-02-kakao-map-moved")}>
        버튼으로 페이지 이동
      </button>
      <br />
      <a href="/section29/29-02-kakao-map-moved">a 태그로 페이지 이동</a>
      <br />
      <Link href="/section29/29-02-kakao-map-moved">
        Link 컴포넌트로 페이지 이동하기
      </Link>
      ;
    </>
  );
}
