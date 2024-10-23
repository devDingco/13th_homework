import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { FetchBoardQuery } from "../commons/graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

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
  required: boolean;
}

export interface IButtonProps {
  id: string;
  disabled?: boolean;
  color: "blue" | "gray" | "white";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
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
  rating: number;
  password?: string;
}

export interface ICommentData {
  commentData: {
    writer: string;
    contents: string;
    createdAt: string;
    number: number;
    _id: string;
    rating: number;
    password?: string;
  };
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

export interface IStarRating {
  defaultValue?: number;
  setRating?: Dispatch<React.SetStateAction<number>>;
  rating?: number;
}

export interface IModalContainer {
  isSwitched: boolean;
  children: ReactNode;
  isPrompt: boolean;
  alertMessage: ReactNode;
  setUserPassword?: Dispatch<SetStateAction<string>> | undefined;
}

export interface IPagination {
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  lastPage: number;
}

export interface ICommentData {
  props?: object;
  isEdit: boolean;
}

export interface ICheckValidationFile {
  size: number;
  type: string;
}
