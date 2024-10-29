"use client";

import AccommodationDetail from "@/components/accommodation-detail/detail";
import ProductCommentWrite from "@/components/accommodation-detail/comment-write";
import ProductCommentList from "@/components/accommodation-detail/comment-list";
import { Button } from "antd";
import Image from "next/image";

export default function BuyTicket() {
  return (
    <>
      <div className="flex gap-6">
        <AccommodationDetail />

        <div className="min-w-96 flex flex-col gap-6">
          <div className="border rounded-xl p-6">
            <b>
              <span className="blind">숙박 가격</span>32,500원
            </b>
            <ul className="text-sm text-gray-700 pt-2 pb-5">
              <li>
                • 숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
              </li>
              <li>• 상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
            </ul>
            <Button
              className="w-full font-bold"
              color="primary"
              variant="solid"
              size="large"
            >
              구매하기
            </Button>
          </div>
          <div className="bg-gray-300 rounded-xl p-6 flex flex-col gap-3">
            <h4 className="font-bold text-xl">판매자</h4>
            <div className="flex gap-3 items-center">
              <Image src="/images/profile.png" width="40" height="40" alt="" />
              <span>판매자 이름</span>
            </div>
          </div>
        </div>
      </div>
      <ProductCommentWrite type="commentWrite" />
      <ProductCommentList />
    </>
  );
}
