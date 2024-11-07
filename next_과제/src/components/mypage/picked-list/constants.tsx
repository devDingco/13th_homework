import { TableProps } from "antd/lib/table";
import { DataType } from "./types";

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "번호",
    dataIndex: "key",
    key: "key",
    render: (value) => (
      <span className="text-gray-400 font-light">{value}</span>
    ),
    width: "5%",
    align: "center",
  },
  {
    title: "상품명",
    dataIndex: "name",
    key: "name",
    width: "60%",
  },
  {
    title: "판매가격",
    dataIndex: "price",
    key: "price",
    width: "10%",
    render: (value) => (
      <span className="text-gray-800">{value.toLocaleString("ko-KR")}원</span>
    ),
    align: "center",
  },
  {
    title: "판매자",
    dataIndex: "seller",
    key: "seller",
    render: (value) => <span className="text-gray-800">{value}</span>,
    width: "10%",
    align: "center",
  },
  {
    title: "날짜",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => (
      <span className="text-gray-400 font-light">{value}</span>
    ),
    width: "16%",
    align: "center",
  },
];
