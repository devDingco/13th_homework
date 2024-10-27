import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IListProps {
  data: FetchBoardsQuery | undefined;
  keyword?: string;
  lastPage: number;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}
