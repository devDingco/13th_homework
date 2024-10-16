import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface IcommentItemBox {
  commentData: FetchBoardCommentsQuery["fetchBoardComments"][0];
  starCountBox?: boolean;
  reply?: boolean;
  starCount?: number;
}
