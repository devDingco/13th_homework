"use client";
import MyProductList from "@/components/mypage/product-list";
import MyPageSubMenu from "@/components/mypage/mypage-menu/sub-menu";

export default function MyPage() {
  return (
    <>
      <MyPageSubMenu />
      <MyProductList />
    </>
  );
}
