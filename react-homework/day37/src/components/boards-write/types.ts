import { FetchBoardQuery } from "@/commons/graphql/graphql";
import { ChangeEvent, MouseEvent } from "react";

// input state 타입정의
export interface IInputs {
  writer: string;
  password: string;
  title: string;
  contents: string;
}
// error state 타입정의
export interface IErrors {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
}

export interface BoardsWriteProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
}

export interface IImageButtonProps {
  index: number;
  imageUrl: string[];
  onClickDelete: (event: MouseEvent<HTMLImageElement>) => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
