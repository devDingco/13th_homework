"use client";

import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardsWriteProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
}

interface updateBoardInput {
  title: string;
  contents: string;
  youtubeUrl?: string;
  boardAddressInput?: boardAddressInput;
}

interface boardAddressInput {
  zipcode?: string;
  address?: string;
  addressDetail?: string;
}
export interface IUpdateBoardInput {
  updateBoardInput: updateBoardInput;
}
