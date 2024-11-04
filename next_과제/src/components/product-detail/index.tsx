"use client";

import KaKaoMap from "@/components/kakao-map";
import ThumbsGallery from "@/components/thumbs-gallery";
import { useProductDetail } from "./hook";
import QuestionList from "@/components/product-detail/product-question-list";
import QuestionWrite from "@/components/product-detail/product-question-write";
import ProductBuy from "@/components/product-detail/product-buy";

export default function ProductDetail() {
  const { data } = useProductDetail();

  // console.log(data, productId);

  return (
    <>
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

          <QuestionWrite />
          <QuestionList sellerId={data?.seller?._id ?? ""} />
        </div>

        <ProductBuy price={data?.price} seller={data?.seller} />
      </div>
    </>
  );
}
