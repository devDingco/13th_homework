"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import Header, { HeaderSize } from "@/commons/ui/header";
import AvailableAccommodationsNavigation from "./navigation";
import MyPageNavigation from "@/app/_components/mypage/navigation";
import SearchBar from "@/commons/ui/searchBar";
import Card from "@/commons/ui/card";
import styles from "./styles.module.css";
import useAvailableAccommodations from "./hook";

export default function AvailableAccommodations() {
  const {
    selectedMenu,
    hasMore,
    travelProducts,
    onClickNavigationItem,
    onChangeDate,
    onChangeSearchKeyword,
    onClickSearch,
    onClickSubMenu,
    onClickCard,
    fetchMoreData,
  } = useAvailableAccommodations();
  return (
    <div className={styles.availableAccommodations__container}>
      <Header title="여기에서만 예약할 수 있는 숙소" size={HeaderSize.large} />
      <MyPageNavigation
        items={["예약 가능 숙소", "예약 마감 숙소"]}
        selectedItem={selectedMenu}
        onChangeItem={onClickNavigationItem}
      />

      <AvailableAccommodationsNavigation />
      <SearchBar
        onChangeDate={onChangeDate}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onClickSearch={onClickSearch}
        onClickSubMenu={onClickSubMenu}
      />

      <InfiniteScroll
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div>로딩</div>}
        dataLength={travelProducts?.fetchTravelproducts.length ?? 0}
      >
        <div className={styles.card__container}>
          {travelProducts?.fetchTravelproducts.map((el) => (
            <Card
              key={el._id}
              id={el._id}
              pickedCount={String(el.pickedCount)}
              title={el.name}
              remarks={el.remarks}
              tags={el.tags ?? []}
              price={el.price ?? 0}
              imageUrl={el.images?.[0]}
              userName={el.seller?.name ?? ""}
              onClick={onClickCard}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
