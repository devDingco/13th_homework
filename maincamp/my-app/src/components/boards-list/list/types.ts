import { Exact, FetchBoardsQuery, InputMaybe } from "@/commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IListProps {
  data?: FetchBoardsQuery; // GraphQL 쿼리의 결과 타입
  page: number;
  // refetch: (
  //   variables?:
  //     | Partial<Exact<{ page?: InputMaybe<number> | undefined }>>
  //     | undefined
  // ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
  refetch: (
    variables?: Partial<Exact<{ mypage?: InputMaybe<number>; pageSize?: InputMaybe<number> }>> | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>; // refetch 함수 타입
}
