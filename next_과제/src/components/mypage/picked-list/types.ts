export interface DataType {
  key: React.Key;
  name: string;
  _id?: string;
  createdAt?: string;
  seller?: string;
  price?: number;
  dataIndex?: string;
  width?: string;
  align?: "center" | "left" | "right";
  render?: (text: unknown, record: DataType) => JSX.Element;
}
