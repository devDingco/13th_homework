import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface IcommentItem {
  commentData: FetchBoardCommentsQuery["fetchBoardComments"][0];
  starCountBox?: boolean;
  reply?: boolean;
}

export interface IcommentList {
  commentData: FetchBoardCommentsQuery["fetchBoardComments"][0];
  starCountBox?: boolean;
  reply?: boolean;
}
