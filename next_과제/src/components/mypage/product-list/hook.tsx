import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  FetchTravelproductsIBoughtDocument,
  FetchTravelproductsCountIBoughtDocument,
} from "@/commons/graphql/graphql";
import { useSearch } from "@/commons/stores/search-store";
import { dateViewSet } from "@/utils/dateViewSet";
import { TableProps } from "antd";
import { useRouter } from "next/navigation";

export const useMyProductList = () => {
  const router = useRouter();
  const { data, refetch } = useQuery(FetchTravelproductsIBoughtDocument);
  const { data: countData } = useQuery(FetchTravelproductsCountIBoughtDocument);
  const { search } = useSearch();
  const [page, setPage] = useState(1);

  const fetchProductsCount = countData?.fetchTravelproductsCountIBought;
  const handleSearch = async () => {
    const result = await refetch({ search });
    console.log(result);
  };

  const listItemMouseHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    type: string
  ) => {
    const target = e.currentTarget;
    const childTarget = target.lastElementChild?.firstElementChild?.classList;
    // console.log(childTarget);
    if (type === "over") {
      childTarget?.add("flex");
      childTarget?.remove("hidden");
    } else {
      childTarget?.add("hidden");
      childTarget?.remove("flex");
    }
  };

  const pageChangeHandler = async (page: number) => {
    const result = await refetch({
      search,
      page,
    });
    console.log(result);
    setPage(page);
  };

  const detailPageHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    postId: string
  ) => {
    // console.log("detail", postId);
    router.push(`/products/${postId}`);
  };

  const dataSource = Array.from({
    length: data?.fetchTravelproductsIBought.length || 0,
  }).map<DataType>((_, idx) => ({
    key: String(idx + 1 + (page - 1) * 10),
    name: data?.fetchTravelproductsIBought[idx].name || "",
    price: data?.fetchTravelproductsIBought[idx].price || 0,
    createdAt: dateViewSet(data?.fetchTravelproductsIBought[idx].createdAt),
  }));

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      width: "5%",
      align: "center",
    },
    {
      title: "상품명",
      dataIndex: "name",
      key: "name",
      render: (value, record, index) => (
        <div className="flex gap-2">
          {value}
          {/* {value}
          {data?.fetchBoards[index].youtubeUrl && (
            <VideoCameraTwoTone twoToneColor="#ff4848" />
          )}
          {(data?.fetchBoards[index].images?.length ?? 0) > 0 && (
            <FileImageTwoTone twoToneColor="#2e53fc" />
          )} */}
        </div>
      ),
      width: "66%",
    },
    {
      title: "판매가격",
      dataIndex: "price",
      key: "price",
      width: "10%",
      render: (value) => value.toLocaleString("ko-KR") + "원",
      align: "center",
    },
    {
      title: "날짜",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
    },
  ];

  return {
    data,
    page,
    pageChangeHandler,
    listItemMouseHandler,
    detailPageHandler,
    dataSource,
    columns,
    fetchProductsCount,
    handleSearch,
  };
};
