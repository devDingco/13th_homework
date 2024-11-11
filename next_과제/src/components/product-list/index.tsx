"use client";
import SearchBox from "@/components/search-box";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon-factory";

import ProductMenu from "./product-menu";
import { useProductList } from "./hook";

import ProductItem from "./product-item";
import InfiniteScroll from "react-infinite-scroll-component";

//! 리스트 스크롤링 추가하기

export default function ProductList() {
  const router = useRouter();
  const { data, refetch, setIsSoldout, isSoldout, hasMore, fetchMoreData } =
    useProductList();

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-2xl">여기에서 예약할 수 있는 숙소</h3>

      <div>
        <ul className="flex gap-4 items-center">
          <li>
            <Button
              className={isSoldout ? "invert" : ""}
              size="large"
              color="default"
              variant="solid"
              onClick={() => setIsSoldout(false)}
            >
              예약 가능 숙소
            </Button>
          </li>
          <li>
            <Button
              className={isSoldout ? "" : "invert"}
              size="large"
              color="default"
              variant="solid"
              onClick={() => setIsSoldout(true)}
            >
              예약 마감 숙소
            </Button>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 justify-between flex-wrap">
        <SearchBox refetch={refetch} />
        <Button
          className="max-sm:fixedBtn"
          size="large"
          color="primary"
          variant="solid"
          icon={<Icon icon="rwite" className="w-6 h-6" />}
          onClick={() => router.push("/")}
        >
          숙박권 판매하기
        </Button>
      </div>

      <ProductMenu />

      {data && data?.length > 0 ? (
        <InfiniteScroll
          dataLength={data?.length ?? 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-4 grid-rows-2 gap-8">
            {data.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <div>등록된 상품이 없습니다.</div>
      )}
    </div>
  );
}
