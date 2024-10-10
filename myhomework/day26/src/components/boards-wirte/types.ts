"use client";

import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardsWriteProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
  writername?: string;
  passwordPlaceholder?: string;
  titlePlaceholder?: string;
  contentsPlaceholder?: string;
  adrNum?: string;
  adrType?: string;
  adrDetail?: string;
  youtube?: string;
}
