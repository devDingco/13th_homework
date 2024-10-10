import { ChangeEvent, ChangeEventHandler } from "react";
import { FetchBoardQuery } from "../commons/graphql/graphql";

export interface IBoardsWriteHook {
  isEdit: boolean;
  data?: FetchBoardQuery;
}

export interface IBoardsWrite {
  formAction: string;
  disabledInput: boolean;
  disabledButton: boolean;
  handleInputChange: void;
  handleContentChange: void;
  onSubmit: void;
}
export interface IInputProps {
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
}

export interface IButtonProps {
  id: string;
  disabled?: boolean;
  color: "blue" | "gray" | "white";
}

export interface IError {
  graphQLErrors: {
    message: string;
  };
}

export interface IBoardsDetail {
  boardId: string;
  boardWriter: string;
  boardTitle: string;
  boardContents: string;
  boardCreatedAt: string;
}

export interface ICommentList {
  writer: string;
  contents: string;
  createdAt: string;
  number: number;
  _id: string;
}

export interface IFormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
  youtubeUrl: string;
}

export interface ICommentFormData {
  writer: string;
  password: string;
  contents: string;
  rating: number;
}

export interface ITextArea {
  id: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  defaultValue?: string | undefined;
}

export type EnumType = {
  [key: string]: string;
};

export interface IImageName {
  list: string;
  edit: string;
}

export type TRecord = Record<string, string>;

export interface ICustomImage {
  image: string;
}