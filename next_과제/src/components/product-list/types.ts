export interface DataType {
  key: string;
  createdAt: string;
  status: string;
  statesDetail: string;
  amount: number;
  name: string;
}

export interface IhandleSearch {
  startDate: string;
  endDate: string;
  search: string;
}
