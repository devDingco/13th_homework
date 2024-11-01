import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface ICommentListItemProps {
  comment: FetchBoardCommentsQuery["fetchBoardComments"][0];
}
