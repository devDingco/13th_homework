import { Exact, FetchBoardsQuery, InputMaybe } from "@/commons/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IBoardsListProps {
  data?: FetchBoardsQuery;
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
