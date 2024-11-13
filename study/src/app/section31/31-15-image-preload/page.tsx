"use client";

import Link from "next/link";
import { useEffect } from "react";

// 이미지를 담아놓을 배열 - 이미지를 이렇게 전역으로 담기만 하면 문제가 된다. 삭제도 해줘야함. 사용시 설정 주의
const qqq = [];

// ! 이미지 로드 성능 개선
export default function ImagePreloadPage() {
  useEffect(() => {
    const img = new Image();
    img.src = "/images/dog.jpg";
    qqq.push(img);
  }, []);

  return <Link href="/section31/31-15-image-preload-moved">페이지 이동</Link>;
}
