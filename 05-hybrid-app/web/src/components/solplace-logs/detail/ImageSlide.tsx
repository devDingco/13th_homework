"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SAMPLE_IMAGES = [
  "/images/exampleDetailImages/1.jpeg",
  "/images/exampleDetailImages/2.jpeg",
  "/images/exampleDetailImages/3.jpeg",
  "/images/exampleDetailImages/4.jpeg",
  "/images/exampleDetailImages/5.jpeg",
  "/images/exampleDetailImages/6.jpeg",
  "/images/exampleDetailImages/7.jpeg",
  "/images/exampleDetailImages/8.jpeg",
];

export default function ImageSlide({ images = SAMPLE_IMAGES }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(1); //현재 이미지 번호
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 스크롤 이벤트
    const handleScroll = () => {
      const scrollPosition = container.scrollLeft; //현재 가로 스크롤 위치
      const imageWidth = container.clientWidth; // 이미지 너비
      const newIndex = Math.round(scrollPosition / imageWidth) + 1; // 현재 스크롤 위치/이미지 너비 => 현재 이미지 계산
      setCurrentImgIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* 이미지 슬라이드 */}
      <div
        ref={containerRef}
        className="w-full h-[480px] relative overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory"
        // style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="absolute inset-0 z-0">
          {images.map((el, index) => (
            <div
              key={`${el}_${index}`}
              className="inline-block w-screen snap-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <Image
                src={el}
                alt={`${index + 1}번 사진`}
                className="w-full h-[480px] object-cover"
                width={500}
                height={480}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 현재 이미지 번호와 이미지 개수 */}
      <span className="absolute bottom-20 right-20 h-20 w-40 px-8 py-4 bg-black/60 rounded-[100px] text-[#f2f2f2] text-[11px] font-medium leading-3 flex justify-center items-center">
        {currentImgIndex}/{images.length}
      </span>
    </div>
  );
}

/* tailwindcss
- scroll-smooth: 스크롤이 부드럽게 동작
- snap-x, snap-mandatory: 스크롤 스냅 설정으로 컨텐츠가 정확히 위치
*/
