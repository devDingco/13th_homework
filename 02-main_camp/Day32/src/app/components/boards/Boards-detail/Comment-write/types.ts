import { FetchBoardCommentsQuery } from "@/commons/gql/graphql";

interface IComment {
  id?: string;
  writer: string;
  password: string;
  contents: string;
  rating: number;
}

export interface IBoardCommentWriteProps {
  comments?: FetchBoardCommentsQuery["fetchBoardComments"][0];
  isEdit: boolean;
  toggleEditMode?: () => void;
  toggleHasMoreScroll?: () => void;
}
