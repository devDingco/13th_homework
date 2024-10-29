import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface CommentProps {
  comments: FetchBoardCommentsQuery["fetchBoardComments"]; // FetchBoardCommentsQuery에서 댓글 배열 타입을 가져옴
}
