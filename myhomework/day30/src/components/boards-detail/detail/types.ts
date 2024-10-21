"use client";

import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardsDetailProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
}
