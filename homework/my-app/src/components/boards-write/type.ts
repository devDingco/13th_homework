import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardWriteprops {
    isEdit: boolean;
    data?: FetchBoardQuery;
    boardId?: string | string[];
  }
