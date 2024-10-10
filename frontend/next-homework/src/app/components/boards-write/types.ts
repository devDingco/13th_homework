"use client";

import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardsWriteProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
}
