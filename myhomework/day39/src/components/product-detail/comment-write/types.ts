import { FetchCommentsQuery } from "@/commons/graphql/graphql";

export interface ICommentWriteProps {
  comments?: FetchCommentsQuery["fetchBoardComments"][0];
  isEdit?: boolean;
  isEditMode?: () => void;
}
