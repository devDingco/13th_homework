"use client";
import BookmarkList from "@/components/bookmark-list";
import TableButtonMenu from "@/components/table-button-menu";

export default function MyBookMarkPage() {
  return (
    <>
      <TableButtonMenu
        menuList={[
          { name: "나의 상품", link: "/mypage" },
          { name: "북마크", link: "/mypage/bookmark" },
        ]}
      />
      <BookmarkList />
    </>
  );
}
