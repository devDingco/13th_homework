import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IListProps {
  data?: FetchBoardsQuery;
  // any로 변경하면 page.tsx data 빨간줄 사라짐
}
