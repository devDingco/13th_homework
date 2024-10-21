"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Pagination } from "antd";

export default function OpenApiList() {
  const [imgUrls, setImgUrls] = useState<string[]>([]); // 이미지 URL을 저장할 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지를 관리할 상태
  const [totalImages, setTotalImages] = useState<number>(0); // 총 이미지 수를 관리할 상태

  const imagesPerPage = 5; // 페이지당 보여줄 이미지 수

  useEffect(() => {
    // 비동기 함수 정의
    const showImages = async () => {
      // API에서 랜덤 이미지를 가져오는 요청
      const result = await fetch(
        `https://dog.ceo/api/breeds/image/random/${imagesPerPage}`
      );
      const data = await result.json(); // 응답 데이터를 JSON 형식으로 변환
      setImgUrls(data.message); // 가져온 이미지 URL을 상태에 저장
      // 예시로 총 이미지 수를 50으로 설정. 실제 API에서 반환되는 총 이미지 수를 사용해야 함.
      // 너무 많이 불러올 필요까지는 없어서 그냥 50장만 가져옴
      setTotalImages(50);
    };

    showImages(); // 비동기 함수 호출
  }, [currentPage]); // currentPage가 변경될 때마다 showImages 함수가 호출됨

  // 페이지가 변경될 때 호출되는 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 선택된 페이지 번호로 currentPage 업데이트
  };

  return (
    <>
      <div>dog.ceo에서 받아온 사진입니다.</div>
      {imgUrls.map((url, index) => (
        <Image
          key={index} // 각 이미지에 고유한 키를 부여
          src={url} // 이미지 URL
          alt={`Random Dog ${index + 1}`} // 이미지에 대한 설명
          width={0} // 이미지 너비
          height={0} // 이미지 높이
          sizes="100vw" // 뷰포트에 따라 이미지 크기 조정
          className={styles.dogImg} // CSS 클래스 적용
        />
      ))}
      <Pagination
        current={currentPage} // 현재 페이지 번호
        pageSize={imagesPerPage} // 페이지당 이미지 수
        total={totalImages} // 전체 이미지 수
        onChange={handlePageChange} // 페이지가 변경될 때 호출되는 함수
        className={styles.pagination} // CSS 클래스 적용
      />
    </>
  );
}
