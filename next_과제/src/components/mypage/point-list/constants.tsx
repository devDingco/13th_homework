import type { TableProps } from "antd";
import type { DataType } from "@/components/mypage/point-list/types";
import { dateViewSet } from "@/commons/utils/dateViewSet";

// 포인트 충천 내역 컬럼
export const loadingColumns: TableProps<DataType>["columns"] = [
  {
    title: "충전일",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => (
      <span className="text-gray-500 font-light">{dateViewSet(value)}</span>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "결제 ID",
    dataIndex: "impUid",
    key: "impUid",
    render: (value) => <span className="font-medium">{value}</span>,
    width: "70%",
    align: "left",
  },
  {
    title: "충전 금액",
    dataIndex: "amount",
    key: "amount",
    render: (value) => (
      <span className="font-medium text-blue-500">
        +{value.toLocaleString()}
      </span>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "거래 후 잔액",
    dataIndex: "balance",
    key: "balance",
    render: (value) => (
      <span className="font-medium">{value.toLocaleString("kr-KR")}</span>
    ),
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
    render: (value) => (
      <span className="text-gray-500 font-light">{dateViewSet(value)}</span>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "상품명",
    dataIndex: "travelproduct.name",
    key: "travelproduct.name",
    render: (value) => <span className="font-medium">{value}</span>,
    width: "60%",
    align: "left",
  },
  {
    title: "거래내역",
    dataIndex: "amount",
    key: "amount",
    render: (value) => <div>{value.toLocaleString("kr-KR")}</div>,
    width: "10%",
    align: "center",
  },
  {
    title: "거래 후 잔액",
    dataIndex: "balance",
    key: "balance",
    render: (value) => <div>{value.toLocaleString("kr-KR")}</div>,
    width: "10%",
    align: "center",
  },
  {
    title: "판매자",
    dataIndex: "user.name",
    key: "user.name",
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
    render: (value) => (
      <span className="text-gray-500 font-light">{dateViewSet(value)}</span>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "상품명",
    dataIndex: "travelproduct.name",
    key: "travelproduct.name",
    render: (value) => <span className="font-medium">{value}</span>,
    width: "60%",
    align: "left",
  },
  {
    title: "거래내역",
    dataIndex: "amount",
    key: "amount",
    render: (value) => (
      <span className="font-medium text-blue-500">
        +{value.toLocaleString()}
      </span>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "거래 후 잔액",
    dataIndex: "balance",
    key: "balance",
    render: (value) => <div>{value.toLocaleString()}</div>,
    width: "10%",
    align: "center",
  },
];

// 포인트 전체 내역 컬럼
export const allColumns: TableProps<DataType>["columns"] = [
  {
    title: "날짜",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => (
      <span className="text-gray-500 font-light">{dateViewSet(value)}</span>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "내용",
    dataIndex: "statusDetail",
    key: "statusDetail",
    width: "10%",
    align: "center",
    render: (value) => {
      return value === "충전" ? (
        <span className="text-blue-500 font-bold">충전</span>
      ) : (
        <span className="text-red-500 font-bold">구매</span>
      );
    },
  },
  {
    title: "거래 및 충전 내역",
    dataIndex: "amount",
    key: "amount",
    render: (value) => {
      return value > 0 ? (
        <span className="font-medium text-blue-500">
          +{value.toLocaleString("kr-KR")}
        </span>
      ) : (
        <span className="font-medium text-red-500">
          {value.toLocaleString("kr-KR")}
        </span>
      );
    },
    width: "70%",
    align: "center",
  },
  {
    title: "잔액",
    dataIndex: "balance",
    key: "balance",
    render: (value) => (
      <span className="font-medium">{value.toLocaleString("kr-KR")}</span>
    ),
    width: "10%",
    align: "center",
  },
];
