import type { TableProps } from "antd";

export interface DataType {
  title: string;
  key: string;
  dataIndex?: string;
  width?: string;
  align?: "center" | "left" | "right";
  render?: (text: unknown, record: DataType) => JSX.Element;
  deleteBoard?: string;
  createdAt?: string;
}

export interface IcolumnSet {
  [key: string]: TableProps<DataType>["columns"];
}
