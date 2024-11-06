export interface DataType {
  key: React.Key;
  name: string;
  dataId?: string;
  createdAt?: string;
  seller?: string;
  price?: number;
  dataIndex?: string;
  width?: string;
  align?: "center" | "left" | "right";
  render?: (text: unknown, record: DataType) => JSX.Element;
}
