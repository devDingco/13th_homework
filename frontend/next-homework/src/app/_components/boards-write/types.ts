"use client";

import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardsWriteProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
}

export interface IUpdateBoardInput {
  boardId: string;
  password: string;
  updateBoardInput: {
    title: string;
    contents: string;
    youtubeUrl: string;
    boardAddressInput?: {
      zipcode?: string;
      address?: string;
      addressDetail?: string;
    };
  };
}
