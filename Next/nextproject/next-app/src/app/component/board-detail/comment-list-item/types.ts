import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface IListItemProps {
  el: FetchBoardCommentsQuery["fetchBoardComments"][0];
  index: number;
}
