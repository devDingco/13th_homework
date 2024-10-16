import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface ICommentProps {
  data: FetchBoardCommentsQuery["fetchBoardComments"][0];
}
