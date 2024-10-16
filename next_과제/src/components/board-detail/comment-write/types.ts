import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface IcommentWriteProps {
  type: string;
  starCountBox?: boolean;
  data?: FetchBoardCommentsQuery["fetchBoardComments"][0];
  commentId?: string;
  editModeHandler?: () => void;
}

export interface IuseCommentWriteProps {
  data?: FetchBoardCommentsQuery["fetchBoardComments"][0];
  editModeHandler?: () => void;
}
