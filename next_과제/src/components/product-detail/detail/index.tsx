"use client";

import KaKaoMap from "@/components/kakao-map";
import ThumbsGallery from "@/components/thumbs-gallery";
import { useProductDetail } from "./hook";
import { Button } from "antd";
import Image from "next/image";

export default function ProductDetail() {
  const { data, productId } = useProductDetail();

  console.log(data, productId);

  return (
    <div className="grid grid-cols-[8fr_2fr] gap-6">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{data?.name}</h2>
            <p className="text-gray-600">{data?.remarks}</p>
            {data?.tags && (
              <ul className="flex gap-1">
                {data.tags.map((tag, index) => (
                  <li key={index} className="text-blue-500">
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ThumbsGallery images={data?.images ?? []} />
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">상세설명</h3>
          <div
            className="min-h-[500px]"
            dangerouslySetInnerHTML={{ __html: data?.contents || "" }}
          ></div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">상세 위치</h3>
          <p className="flex gap-2">
            <span>{data?.travelproductAddress?.zipcode}</span>
            <span>{data?.travelproductAddress?.address}</span>
            <span>{data?.travelproductAddress?.addressDetail}</span>
          </p>
          <KaKaoMap
            lat={Number(data?.travelproductAddress?.lat)}
            lng={Number(data?.travelproductAddress?.lng)}
          />
        </div>
      </div>

      <div className="min-w-96 flex flex-col gap-6">
        <div className="border rounded-xl p-6">
          <b>
            <span className="blind">숙박 가격</span>
            {data?.price?.toLocaleString("ko-kr")}원
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
            <Image
              src={data?.seller?.picture ?? "/images/profile.png"}
              width="40"
              height="40"
              alt={data?.seller?.picture ?? "등록된 프로필 이미지가 없습니다."}
            />
            <span>{data?.seller?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
