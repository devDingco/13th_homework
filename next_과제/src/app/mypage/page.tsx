"use client";
import ProductList from "@/components/product-list";
import TableButtonMenu from "@/components/table-button-menu";

export default function MyPage() {
  return (
    <>
      <TableButtonMenu
        menuList={[
          { name: "나의 상품", link: "/mypage" },
          { name: "북마크", link: "/mypage/bookmark" },
        ]}
      />
      <ProductList />
    </>
  );
}
