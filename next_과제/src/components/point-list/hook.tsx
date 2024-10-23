import { dateViewSet } from "@/utils/dateViewSet";
import type { TableProps } from "antd";
import type { DataType, IcolumnSet } from "@/components/point-list/types";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  FetchPointTransactionsOfBuyingDocument,
  FetchPointTransactionsCountOfBuyingDocument,
} from "@/commons/graphql/graphql";

export const usePointList = (listType: string) => {
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery(FetchPointTransactionsOfBuyingDocument, {
    variables: {
      page: 1,
    },
  });

  const { data: countData, loading } = useQuery(
    FetchPointTransactionsCountOfBuyingDocument
  );

  const fetchPointTransactionsCountOfBuying =
    countData?.fetchPointTransactionsCountOfBuying; // !게시글 총 갯수

  const pageChangeHandler = async (page: number) => {
    const result = await refetch({
      page: page,
    });
    console.log(result);
    setPage(page);
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

  const dataSource = Array.from({
    length: data?.fetchPointTransactionsOfBuying.length || 0,
  }).map((_, idx) => ({
    createdAt: dateViewSet(data?.fetchPointTransactionsOfBuying[idx].createdAt),
    status: data?.fetchPointTransactionsOfBuying[idx].status || "",
    // statesDetail: data?.fetchPointTransactionsOfBuying[idx].statesDetail,
    // amount: data?.fetchPointTransactionsOfBuying[idx].amount,
    // name: data?.fetchPointTransactionsOfBuying[idx].name,
  }));

  console.log(
    "포인트 구매 내역 리스트",
    data?.fetchPointTransactionsOfBuying,
    dataSource
  );

  // 포인트 충천 내역 컬럼
  const chargingColumns: TableProps<DataType>["columns"] = [
    {
      title: "충전일",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
    },
    {
      title: "결제 ID",
      dataIndex: "impUid",
      key: "impUid",
      width: "10%",
      align: "center",
    },
    {
      title: "충전 금액",
      dataIndex: "amount",
      key: "amount",
      width: "10%",
      align: "center",
    },
    {
      title: "거래 후 잔액",
      dataIndex: "balance",
      key: "balance",
      width: "10%",
      align: "center",
    },
  ];

  // 포인트 구매 내역 컬럼
  const purchaseColumns: TableProps<DataType>["columns"] = [
    {
      title: "거래일",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
    },
    {
      title: "상품명",
      dataIndex: "status",
      key: "status",
      render: (value) => <div>{value}</div>,
      width: "10%",
      align: "center",
    },
    {
      title: "거래내역",
      dataIndex: "statesDetail",
      key: "statesDetail",
      render: (value) => <div>{value}</div>,
      width: "60%",
      align: "center",
    },
    {
      title: "거래 후 잔액",
      dataIndex: "amount",
      key: "amount",
      width: "10%",
      align: "center",
    },
    {
      title: "판매자",
      dataIndex: "name",
      key: "name",
      width: "10%",
      align: "center",
    },
  ];

  // 포인트 판매 내역 컬럼
  const salesColumns: TableProps<DataType>["columns"] = [
    {
      title: "거래일",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
    },
    {
      title: "상품명",
      dataIndex: "status",
      key: "status",
      render: (value) => <div>{value}</div>,
      width: "10%",
      align: "center",
    },
    {
      title: "거래내역",
      dataIndex: "statesDetail",
      key: "statesDetail",
      render: (value) => <div>{value}</div>,
      width: "60%",
      align: "center",
    },
    {
      title: "거래 후 잔액",
      dataIndex: "amount",
      key: "amount",
      width: "10%",
      align: "center",
    },
  ];

  // const columns: TableProps<DataType>["columns"] = [
  //   {
  //     title: "번호",
  //     dataIndex: "key",
  //     key: "key",
  //     width: "5%",
  //     align: "center",
  //   },
  //   {
  //     title: "제목",
  //     dataIndex: "title",
  //     key: "title",
  //     render: (value, record, index) => (
  //       <div className="flex gap-2">
  //         {value}
  //         {data?.fetchBoards[index].youtubeUrl && (
  //           <VideoCameraTwoTone twoToneColor="#ff4848" />
  //         )}
  //         {(data?.fetchBoards[index].images?.length ?? 0) > 0 && (
  //           <FileImageTwoTone twoToneColor="#2e53fc" />
  //         )}
  //       </div>
  //     ),
  //     width: "66%",
  //   },
  //   {
  //     title: "작성자",
  //     dataIndex: "writer",
  //     key: "writer",
  //     width: "10%",
  //     align: "center",
  //   },
  //   {
  //     title: "날짜",
  //     dataIndex: "createdAt",
  //     key: "createdAt",
  //     width: "10%",
  //     align: "center",
  //   },
  //   {
  //     title: "",
  //     key: "deleteBoard",
  //     render: (_: unknown, record: DataType) => (
  //       <button
  //         className="items-center justify-center w-full hidden"
  //         onClick={(e) => postDelete(e, record.deleteBoard || "")}
  //       >
  //         <Icon
  //           icon="delete"
  //           className="fill-gray-500 w-5 h-5"
  //           viewBox="-3 -3 24 24"
  //         />
  //       </button>
  //     ),
  //     width: "4%",
  //     align: "center",
  //   },
  // ];

  const columnSet: IcolumnSet = {
    purchase: purchaseColumns,
    sales: salesColumns,
    charging: chargingColumns,
  };

  return {
    loading,
    listItemMouseHandler,
    dataSource,
    columns: columnSet[listType],
    fetchPointTransactionsCountOfBuying,
    pageChangeHandler,
    page,
  };
};
