"use client";
import ProductList from "@/components/product-list";
import MyPageSubMenu from "@/components/mypage/mypage-menu/sub-menu";

export default function MyPage() {
  return (
    <>
      <MyPageSubMenu />
      <ProductList />
    </>
  );
}
