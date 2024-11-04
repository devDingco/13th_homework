"use client";
import SearchBox from "@/components/search-box";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon-factory";
import Image from "next/image";
import Link from "next/link";
import ProductMenu from "./product-menu";
import { useProductList } from "./hook";
import ProductPickedBtn from "@/components/product-list/product-picked-btn";

export default function ProductList() {
  const router = useRouter();
  const { data } = useProductList();
  const handleSearch = (search: string) => {};

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-2xl">여기에서 예약할 수 있는 숙소</h3>

      <div>
        <ul className="flex gap-4 items-center">
          <li>
            <Button size="large" color="default" variant="solid">
              예약 가능 숙소
            </Button>
          </li>
          <li>
            <Button
              className="invert"
              size="large"
              color="default"
              variant="solid"
            >
              예약 가능 숙소
            </Button>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 justify-between flex-wrap">
        <SearchBox handleSearch={handleSearch} />
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
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          {data.slice(0, 8).map((product) => {
            const imageURL =
              data.images && data.images.length > 0
                ? process.env.NEXT_PUBLIC_IMAGE_HOST_NAME + data.images[0]
                : "/images/beach.jpg";

            return (
              <Link
                key={product._id}
                className="flex flex-col gap-3"
                href={`products/${product._id}`}
              >
                <div className="rounded-xl overflow-hidden relative">
                  <ProductPickedBtn
                    id={product._id}
                    count={product.pickedCount}
                    className="absolute top-4 right-4 z-10"
                  />
                  <Image
                    className="object-cover"
                    src={imageURL}
                    alt=""
                    width={296}
                    height={296}
                    style={{ width: 296, height: 296 }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <h5 className="font-bold text-md">{product.name}</h5>
                    <p className="text-sm text-gray-700">{product.remarks}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <ul className="flex gap-2">
                      {product.tags.map((tag, idx) => (
                        <li key={tag + idx} className="text-blue-500 text-sm">
                          #{tag}
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between">
                      <span className="flex gap-2">
                        <Image
                          src={
                            product.seller.profileImage ?? "/images/profile.png"
                          }
                          alt=""
                          width={24}
                          height={24}
                        />
                        <span>{product.seller.name}</span>
                      </span>
                      <strong>
                        <div className="blind">숙소가격</div>
                        {product.price.toLocaleString("ko-KR")}원
                      </strong>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>등록된 상품이 없습니다.</div>
      )}
    </div>
  );
}
