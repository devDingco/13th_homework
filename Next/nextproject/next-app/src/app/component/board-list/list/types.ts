import { FetchBoardsQuery } from "@/commons/graphql/graphql";

export interface IListProps {
  data: FetchBoardsQuery | undefined; //graphql
  // yarn codegen 으로 el._id해결
  currentPage: number;
  count: number;
}
