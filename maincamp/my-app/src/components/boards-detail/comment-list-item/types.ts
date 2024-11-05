import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";


export interface IcommentList {
    comment: FetchBoardCommentsQuery["fetchBoardComments"][0];
    index: number;
    length: number;
  }