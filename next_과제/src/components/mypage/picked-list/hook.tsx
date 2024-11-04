import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  FetchTravelproductsIPickedDocument,
  FetchTravelproductsCountIPickedDocument,
} from "@/commons/graphql/graphql";

import { VideoCameraTwoTone, FileImageTwoTone } from "@ant-design/icons";
import { toKoreanTimeString } from "@/utils/toKoreanTimeString";

export const usePickedList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery(FetchTravelproductsIPickedDocument, {
    variables: {
      page,
    },
  });

  console.log("pickeds Data", data);

  const { data: countData } = useQuery(FetchTravelproductsCountIPickedDocument);

  // const fetchBoardsCount = countData?.fetchTravelproductsCountIPicked; // !게시글 총 갯수

  // const pageChangeHandler = async (page: number) => {
  //   const result = await refetch({
  //     startDate: toKoreanTimeString("2021-09-03"),
  //     endDate: toKoreanTimeString(new Date().toISOString().split("T")[0], true),
  //     search: search, // 기본값은 ""인데 검색결과 리패치 상태인 경우 search값이 있음
  //     page: page,
  //   });
  //   console.log(result);
  //   setPage(page);
  // };

  // // console.log(params.pageNum, data?.fetchBoards);

  // const listItemMouseHandler = (
  //   e: React.MouseEvent<HTMLTableRowElement>,
  //   type: string
  // ) => {
  //   const target = e.currentTarget;
  //   const childTarget = target.lastElementChild?.firstElementChild?.classList;
  //   // console.log(childTarget);
  //   if (type === "over") {
  //     childTarget?.add("flex");
  //     childTarget?.remove("hidden");
  //   } else {
  //     childTarget?.add("hidden");
  //     childTarget?.remove("flex");
  //   }
  // };

  // const detailPageHandler = (
  //   e: React.MouseEvent<HTMLTableRowElement>,
  //   postId: string
  // ) => {
  //   // console.log("detail", postId);
  //   router.push(`/boards/${postId}`);
  // };

  // const dataSource = Array.from({
  //   length: data?.fetchTravelproductsIPicked.length || 0,
  // }).map<DataType>((_, idx) => ({
  //   key: String(idx + 1 + (page - 1) * 10),
  //   name: data?.fetchTravelproductsIPicked[idx].name || "",
  //   price: data?.fetchTravelproductsIPicked[idx].price || 0,
  //   createdAt: dateViewSet(data?.fetchTravelproductsIPicked[idx].createdAt),
  // }));

  // const columns: TableProps<DataType>["columns"] = [
  //   {
  //     title: "번호",
  //     dataIndex: "key",
  //     key: "key",
  //     width: "5%",
  //     align: "center",
  //   },
  //   {
  //     title: "상품명",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (value, record, index) => (
  //       <div className="flex gap-2">
  //         {value}
  //         {/* {value}
  //         {data?.fetchBoards[index].youtubeUrl && (
  //           <VideoCameraTwoTone twoToneColor="#ff4848" />
  //         )}
  //         {(data?.fetchBoards[index].images?.length ?? 0) > 0 && (
  //           <FileImageTwoTone twoToneColor="#2e53fc" />
  //         )} */}
  //       </div>
  //     ),
  //     width: "66%",
  //   },
  //   {
  //     title: "판매가격",
  //     dataIndex: "price",
  //     key: "price",
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
  // ];

  return {
    data,
    // page,
    // pageChangeHandler,
    // listItemMouseHandler,
    // detailPageHandler,
    // dataSource,
    // columns,
    // fetchBoardsCount,
    // router,
  };
};
