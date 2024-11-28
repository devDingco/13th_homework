import Image from "next/image";
import Link from "next/link";
import ProductPickedBtn from "@/components/product-picked-btn";
import { FetchTravelproductsQuery } from "@/commons/graphql/graphql";

export default function ProductItem({
  product,
}: {
  product: FetchTravelproductsQuery["fetchTravelproducts"][0];
}) {
  const imageURL =
    product.images && product.images.length > 0 && product.images[0] !== ""
      ? process.env.NEXT_PUBLIC_IMAGE_HOST_NAME + product.images[0]
      : "/images/beach.jpg";

  // console.log("imageURL", imageURL);

  return (
    <Link
      key={product._id}
      className="flex flex-col gap-3"
      href={`products/${product._id}`}
    >
      <div className="rounded-xl overflow-hidden relative">
        <ProductPickedBtn
          productId={product._id}
          count={product.pickedCount ?? 0}
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
            {product?.tags?.map((tag: string, idx: number) => (
              <li key={tag + idx} className="text-blue-500 text-sm">
                #{tag}
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <span className="flex gap-2">
              <Image
                src={product.seller?.picture ?? "/images/profile.png"}
                alt=""
                width={24}
                height={24}
              />
              <span>{product.seller?.name}</span>
            </span>
            <strong>
              <div className="blind">숙소가격</div>
              {product.price?.toLocaleString("ko-KR")}원
            </strong>
          </div>
        </div>
      </div>
    </Link>
  );
}
