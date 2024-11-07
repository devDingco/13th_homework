import React, { MouseEvent, useState } from "react";
import List from "../list";
import MyPageNavigation from "../navigation";
import SearchBar from "../SearchBar";

export default function TransactionHistoryAndBookmarks() {
  const navigationItems = ["나의 상품", "북마크"];

  const dataColumns = [
    { title: "번호", key: "index" },
    { title: "상품명", key: "name" },
    { title: "판매가격", key: "price" },
    { title: "날짜", key: "date" },
  ];

  const bookmarksColumns = [
    { title: "번호", key: "index" },
    { title: "상품명", key: "name" },
    { title: "판매가격", key: "price" },
    { title: "판매자", key: "seller" },
    { title: "날짜", key: "date" },
  ];

  const transactionItems = [
    {
      index: "243",
      name: "파르나스 호텔 제주",
      price: "326,000원",
      date: "2024.12.16",
    },
    {
      index: "244",
      name: "파르나스 호텔 서울",
      price: "500,000원",
      date: "2024.11.10",
    },
  ];

  const bookmarkItems = [
    {
      index: "1",
      name: "비스타 워커힐 호텔",
      price: "326,000원",
      seller: "이준휘",
      date: "2024.12.16",
    },
    {
      index: "2",
      name: "파르나스 호텔 서울",
      price: "500,000원",
      seller: "이준휘",
      date: "2024.11.10",
    },
    {
      index: "3",
      name: "그랜드 하얏트 호텔",
      price: "800,000원",
      seller: "정재원",
      date: "2024.11.10",
    },
  ];

  const [selectedNaviItem, setSelectedNaviItem] = useState(0);

  const onChangeNavigationItem = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget?.id;
    setSelectedNaviItem(Number(id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <MyPageNavigation
        items={navigationItems}
        selectedItem={selectedNaviItem}
        onChangeItem={onChangeNavigationItem}
      ></MyPageNavigation>
      <SearchBar />
      {selectedNaviItem === 0 && (
        <List
          columns={dataColumns}
          items={transactionItems}
          mainColumns={1}
        ></List>
      )}
      {selectedNaviItem === 1 && (
        <List
          columns={bookmarksColumns}
          items={bookmarkItems}
          mainColumns={1}
        ></List>
      )}
    </div>
  );
}
