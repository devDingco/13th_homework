import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IBoardListprops {
  data?: FetchBoardsQuery;
}

export interface IListProps {
  data?: FetchBoardsQuery;
  currentPage: number;

  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}
