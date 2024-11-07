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
}

export interface IData {
  __typename?: "PointTransaction";
  _id?: string;
  impUid?: string | null;
  amount?: number;
  balance?: number;
  status?: string;
  statusDetail?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  travelproduct?: {
    _id?: string;
    name?: string;
  };
  user?: {
    _id?: string;
    name?: string;
  };
}

export interface IcolumnSet {
  [key: string]: TableProps<DataType>["columns"];
}
