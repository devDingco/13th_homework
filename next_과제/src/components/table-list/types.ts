import type { ColumnsType } from "antd/es/table";

export interface IQuery {
  [key: string]: string | number;
}

export interface ITableListProps<T> {
  isLoading: boolean; // ! 데이터 로딩 상태
  refetch: (query: IQuery) => void;
  tableItemHandler?: (record: T) => {
    onClick: () => void;
    onMouseOver?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  };
  dataSource: T[];
  columns: ColumnsType<T>;
  totalCount: number;
}

// export interface ITableListProps {
//   isLoading: boolean; // ! 데이터 로딩 상태
//   refetch: (query: IQuery) => void;
//   tableItemHandler?: (
//     record:
//       | BoardListDataType
//       | MyPageProductListDataType
//       | MyPagePickedListDataType
//       | MyPagePointListDataType
//   ) => {
//     onClick: () => void;
//     onMouseOver?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
//     onMouseLeave?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
//   };
//   dataSource:
//     | BoardListDataType[]
//     | MyPageProductListDataType[]
//     | MyPagePickedListDataType[]
//     | MyPagePointListDataType[];
//   columns:
//     | ColumnsType<BoardListDataType>
//     | ColumnsType<MyPageProductListDataType>
//     | ColumnsType<MyPagePickedListDataType>
//     | ColumnsType<MyPagePointListDataType>;
//   totalCount: number;
// }
