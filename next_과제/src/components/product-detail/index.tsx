"use client";

import KaKaoMap from "@/components/kakao-map";
import ThumbsGallery from "@/components/thumbs-gallery";
import { useProductDetail } from "./hook";
import QuestionList from "@/components/product-detail/product-question-list";
import QuestionWrite from "@/components/product-detail/product-question-write";
import ProductBuy from "@/components/product-detail/product-buy";
import Icon from "@/components/icon-factory";
import { Tooltip } from "antd";
import ProductPickedBtn from "@/components/product-picked-btn";
import { useMyProductCheck } from "@/commons/stores/my-product-check-store";

export default function ProductDetail() {
  const { data, productId, onProductDelete, onProductLinkCopy, router } =
    useProductDetail();
  const { myProductCheck } = useMyProductCheck();

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">{data?.name}</h2>
          <div className="flex items-center gap-4">
            {myProductCheck && (
              <>
                {/* 내상품인 경우에만 삭제 버튼 보이기 */}
                <span className="blind">수정하기 버튼</span>
                <Icon
                  icon="edit"
                  className="w-6 h-6 flex items-center cursor-pointer"
                  onClick={() => {
                    router.push(`/products/${productId}/edit`);
                  }}
                />

                <span className="blind">삭제하기 버튼</span>
                <Icon
                  icon="delete"
                  className="w-6 h-6 flex items-center  cursor-pointer"
                  viewBox="-4 -3 24 24"
                  onClick={() => onProductDelete()}
                />
              </>
            )}

            <span className="blind">링크 복사 버튼</span>
            <Icon
              icon="link"
              className="w-6 h-6 flex items-center cursor-pointer"
              onClick={() => onProductLinkCopy()}
            />

            <Tooltip
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              mouseLeaveDelay={0.8}
              key="#fff"
              color="#fff"
              trigger={["hover"]}
              overlayInnerStyle={{ color: "#000" }}
              title={() => {
                const address = data?.travelproductAddress?.address ?? "";
                const addressDetail =
                  data?.travelproductAddress?.addressDetail ?? "";
                if (address === "" && addressDetail === "") {
                  return "주소가 없습니다.";
                } else {
                  return `${address} ${addressDetail}`;
                }
              }}
            >
              <button className="w-6 h-6">
                <Icon
                  icon="location"
                  className="fill-gray-800 w-6 h-6 dark:fill-white"
                />
              </button>
            </Tooltip>

            <ProductPickedBtn
              count={data?.pickedCount ?? 0}
              productId={productId}
            />
          </div>
        </div>
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
      <div className="grid grid-cols-[8fr_2fr] gap-6">
        <div className="flex flex-col gap-10">
          <ThumbsGallery images={data?.images ?? []} />

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
            {data && (
              <KaKaoMap
                lat={Number(data.travelproductAddress?.lat)}
                lng={Number(data.travelproductAddress?.lng)}
              />
            )}
          </div>
        </div>

        <ProductBuy price={data?.price} seller={data?.seller} />
      </div>
      <QuestionWrite />
      <QuestionList />
    </>
  );
}
