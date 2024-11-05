
import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";
import { Dispatch, SetStateAction } from "react";
export interface ICommentWriteProps {
  commentEdit: boolean;
  setCommentEdit: Dispatch<SetStateAction<boolean>>;
  comment: FetchBoardCommentsQuery["fetchBoardComments"][0];
}
