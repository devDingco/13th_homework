import { TableProps } from "antd";
import { KeywordActiveString } from "@/commons/ui/keyword-active-string";

export const columns: TableProps["columns"] = [
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
    render: (value, record) => (
      <div className="flex gap-2">
        {record.soldAt ? (
          <>
            <span className="text-gray-400 font-medium">
              <KeywordActiveString value={value} />
            </span>
            <span className="text-blue-500 font-bold">판매완료</span>
          </>
        ) : (
          value
        )}
      </div>
    ),
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
