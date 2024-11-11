import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";
export interface ICommentListPageprops {
  data?: FetchBoardCommentsQuery;
  hasMore: boolean;
  setHasMore: (value: boolean) => void;
}
