"use client";

import { FetchBoardsQuery } from "@/commons/graphql/graphql";

export interface IBoardsListProps {
  isEdit: boolean;
  data?: FetchBoardsQuery;
  _id: string;
}
