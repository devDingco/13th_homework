import { useQuery } from "@apollo/client";
import {
  FetchTravelproductsIBoughtDocument,
  FetchTravelproductsCountIBoughtDocument,
} from "@/commons/graphql/graphql";
import { dateViewSet } from "@/utils/dateViewSet";
import { columns } from "./constants";
import { useRouter } from "next/navigation";
import { usePageChange } from "@/commons/stores/page-store";

export const useMyProductList = () => {
  const router = useRouter();
  const { page } = usePageChange();

  // ! 나의 상품 게시글 데이터
  const { data, refetch } = useQuery(FetchTravelproductsIBoughtDocument);

  // ! 나의 상품 게시글 총 갯수
  const { data: countData, refetch: countDataRefetch } = useQuery(
    FetchTravelproductsCountIBoughtDocument
  );
  const fetchProductsCount = countData?.fetchTravelproductsCountIBought;

  const tableItemOnClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const dataSource = Array.from({
    length: data?.fetchTravelproductsIBought.length || 0,
  }).map((_, idx) => ({
    key: String(idx + 1 + (page - 1) * 10),
    _id: data?.fetchTravelproductsIBought[idx]._id || "",
    soldAt: data?.fetchTravelproductsIBought[idx].soldAt || "",
    name: data?.fetchTravelproductsIBought[idx].name || "",
    price: data?.fetchTravelproductsIBought[idx].price || 0,
    createdAt: dateViewSet(data?.fetchTravelproductsIBought[idx].createdAt),
  }));

  return {
    data,
    tableItemOnClick,
    dataSource,
    columns,
    fetchProductsCount,
    refetch,
    countDataRefetch,
  };
};
