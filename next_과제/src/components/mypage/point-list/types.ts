import type { TableProps } from "antd";

export interface DataType {
  _id?: string;
  status?: string;
  statesDetail?: string;
  amount?: number;
  user?: { name: string };
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  impUid?: string;
  balance?: number;
  travelproduct?: {
    _id?: string;
    name?: string;
  };
}

export interface IcolumnSet {
  [key: string]: TableProps<DataType>["columns"];
}
