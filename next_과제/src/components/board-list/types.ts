export interface DataType {
  _id?: string;
  title?: string;
  dataIndex?: string;
  createdAt?: string;
  youtubeUrl?: string;
  images?: string[];
}

export interface IhandleSearch {
  startDate: string;
  endDate: string;
  search: string;
}
