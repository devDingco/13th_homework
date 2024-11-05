import { Exact, FetchBoardsQuery, InputMaybe } from "@/commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IListProps {
  data?: FetchBoardsQuery;
  page: number;
  refetch: (
    variables?:
      | Partial<Exact<{ page?: InputMaybe<number> | undefined }>>
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}
