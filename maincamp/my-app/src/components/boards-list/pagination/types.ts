// import { ApolloQueryResult, OperationVariables } from "@apollo/client";

import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";


// export interface IPagiNationProps {
//     refetch: (
//         variables?: Partial<OperationVariables> | undefined
//     ) => Promise<ApolloQueryResult<any>>;
//     lastPage: number;
// }

export interface IPaginationProps {
  page: number; // 현재 페이지
  setPage: (newPage: number) => void; // 페이지 변경 함수
  // refetch: () => void;
  refetch: (variables: {mypage: number; pageSize?: number}) => void; // refetch 함수
  data: any; // 게시물 데이터
  lastPage: number; // 마지막 페이지
  total: number; // 총 게시물
}
