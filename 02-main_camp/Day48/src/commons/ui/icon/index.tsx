import Image from "next/image";
import React from "react";

interface IIconProps {
  width?: number;
  height?: number;
  onClickIcon?: () => void;
}

// Sample
export function TravelProductSample1() {
  return (
    <Image
      src="/assets/product_detail_sample.png"
      alt="여행 상품 샘플 메인 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "680px", height: "480px" }}
    />
  );
}

export function TravelProductSample2() {
  return (
    <Image
      src="/assets/product_detail_sample2.png"
      alt="여행 상품 샘플 서브 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "180px", height: "480px" }}
    />
  );
}

export function TravelProductContentsSample() {
  return (
    <Image
      src="/assets/travelProductContentsSample.png"
      alt="여행 상품 상세 설명 샘플 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "844px", height: "596px" }}
    />
  );
}

export function TravelProductMainSample1() {
  return (
    <Image
      src="/assets/product1.svg"
      alt="여행 상품 샘플 메인 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
    />
  );
}

export function TravelProductMainSample2() {
  return (
    <Image
      src="/assets/product2.svg"
      alt="여행 상품 샘플 메인 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
    />
  );
}

export function TravelProductMainSample3() {
  return (
    <Image
      src="/assets/product3.svg"
      alt="여행 상품 샘플 메인 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
    />
  );
}

export function LocationSample() {
  return (
    <Image
      src="/assets/locationSample.png"
      alt="여행 상품의 위치 샘플 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "844px", height: "280px" }}
    />
  );
}

export function LoginMainImage() {
  return (
    <Image
      src="/assets/login_main_image.png"
      alt="로그인 메인 이미지"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

// Icon

export function Delete() {
  return (
    <Image
      src="/assets/delete.svg"
      alt="휴지통 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
    />
  );
}

export function BookmarkIcon() {
  return (
    <Image
      src="/assets/bookmark.svg"
      alt="북마크 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  );
}

export function Location() {
  return (
    <Image
      src="/assets/location.png"
      alt="지역 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  );
}

export function LinkIcon() {
  return (
    <Image
      src="/assets/link.png"
      alt="링크 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  );
}

export function Search() {
  return (
    <Image
      src="/assets/search.png"
      alt="검색 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  );
}

export function Profile() {
  return (
    <Image
      src="/assets/profile.png"
      alt="프로필 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  );
}

export function Profile40() {
  return (
    <Image
      src="/assets/profile.png"
      alt="프로필 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  );
}

export function Chat() {
  return (
    <Image
      src="/assets/chat.png"
      alt="대화창 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  );
}

export function EditIcon({
  width = 1.5,
  height = 1.5,
  onClickIcon,
}: IIconProps) {
  return (
    <Image
      src="/assets/edit.svg"
      alt="수정하기 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        cursor: "pointer",
      }}
      onClick={onClickIcon}
    />
  );
}

export function Close({ width = 1.5, height = 1.5, onClickIcon }: IIconProps) {
  return (
    <Image
      src="/assets/close.png"
      alt="닫기 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        cursor: "pointer",
      }}
      onClick={onClickIcon}
    />
  );
}

export function ReplyIcon({ width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src="/assets/reply.png"
      alt="답변 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

export function ReturnIcon({ width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src="/assets/return.png"
      alt="답변 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

export function LogoIcon({ width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src="/assets/login_logo.png"
      alt="로고 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

export function RightArrowIcon({ width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src="/assets/right_arrow.svg"
      alt="오른쪽 화살표 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

export function RightArrowBlackIcon({ width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src="/assets/right_arrow_black.svg"
      alt="오른쪽 화살표 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

export function LeftArrowBlackIcon({ width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src="/assets/left_arrow_black.svg"
      alt="왼쪽 화살표 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

export function ListIcon({ width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src="/assets/list.svg"
      alt="목록 아이콘"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

export function ChargePointIcon() {
  return (
    <Image
      src="/assets/modal_chargePoint.svg"
      alt="목록 아이콘"
      width={80}
      height={56}
    />
  );
}
