import { Exact, FetchBoardsQuery, InputMaybe } from "@/commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IListProps {
  data: FetchBoardsQuery | undefined; //graphql
  // yarn codegen 으로 el._id해결
  currentPage: number;
  count: number;
  // keyword: string;
  // dataDocument: FetchBoardsQuery | undefined;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            page?: InputMaybe<number> | undefined;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}
