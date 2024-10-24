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

export interface IhandleSearch {
  startDate: string;
  endDate: string;
  search: string;
}
