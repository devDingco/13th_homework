import type { TableProps } from "antd";
import type { DataType } from "@/components/point-list/types";

// 포인트 충천 내역 컬럼
export const loadingColumns: TableProps<DataType>["columns"] = [
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
export const buyingColumns: TableProps<DataType>["columns"] = [
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
export const sellingColumns: TableProps<DataType>["columns"] = [
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

export const allColumns: TableProps<DataType>["columns"] = [
  {
    title: "날짜",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "10%",
    align: "center",
  },
  {
    title: "내용",
    dataIndex: "type",
    key: "type",
    width: "10%",
    align: "center",
    render: (value) => <div>충전 구매 판매 중에 내용들어갈 부분</div>,
  },
  {
    title: "거래 및 충전 내역",
    dataIndex: "statesDetail",
    key: "statesDetail",
    render: (value) => <div>{value}</div>,
    width: "70%",
    align: "center",
  },
  {
    title: "잔액",
    dataIndex: "amount",
    key: "amount",
    width: "10%",
    align: "center",
  },
];

// column 샘플
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
