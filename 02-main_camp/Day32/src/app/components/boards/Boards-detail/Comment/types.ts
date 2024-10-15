import { FetchBoardCommentsQuery } from "@/commons/gql/graphql";

export interface ICommentInput {
  comments: FetchBoardCommentsQuery["fetchBoardComments"][0];
}
