"use client";

// import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  FetchTravelproductsIPickedDocument,
  FetchTravelproductsCountIPickedDocument,
} from "@/commons/graphql/graphql";
import { useRouter } from "next/navigation";
import { dateViewSet } from "@/utils/dateViewSet";
import { useSearch } from "@/commons/stores/search-store";
import { TableProps } from "antd/lib/table";
import { DataType } from "./types";

export const usePickedList = () => {
  const router = useRouter();
  const { search } = useSearch();
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery(FetchTravelproductsIPickedDocument, {
    variables: {
      search: "",
      page,
    },
  });

  const { data: countData } = useQuery(FetchTravelproductsCountIPickedDocument);

  const fetchProductsCount = countData?.fetchTravelproductsCountIPicked; // !게시글 총 갯수

  const handleSearch = async () => {
    const result = await refetch({ search });
    console.log(result);
  };

  const pageChangeHandler = async (page: number) => {
    const result = await refetch({
      search,
      page,
    });
    console.log(result);
    setPage(page);
  };

  // console.log(params.pageNum, data?.fetchBoards);

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

  const detailPageHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    postId: string
  ) => {
    // console.log("detail", postId);
    router.push(`/products/${postId}`);
  };

  const dataSource = Array.from({
    length: data?.fetchTravelproductsIPicked.length || 0,
  }).map<DataType>((_, idx) => ({
    key: String(idx + 1 + (page - 1) * 10),
    dataId: data?.fetchTravelproductsIPicked[idx]._id || "",
    name: data?.fetchTravelproductsIPicked[idx].name || "",
    price: data?.fetchTravelproductsIPicked[idx].price || 0,
    seller: data?.fetchTravelproductsIPicked[idx].seller?.name || "",
    createdAt: dateViewSet(data?.fetchTravelproductsIPicked[idx].createdAt),
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
      title: "판매자",
      dataIndex: "seller",
      key: "seller",
      width: "10%",
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
    router,
    handleSearch,
  };
};
