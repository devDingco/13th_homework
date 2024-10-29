import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface ICommentWriteProps {
  isEdit: boolean;
  editId?: string;
  closeEdit?: () => void;
  comment?: FetchBoardCommentsQuery["fetchBoardComments"][0];
}
