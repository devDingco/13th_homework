import { ChangeEvent } from "react";

export enum TextInputType {
  text = "text",
  password = "password",
}

export interface IBoardsWriteInput {
  title: string;
  type?: TextInputType;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  errorMessage?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IBoardsWriteContentsInput {
  title: string;
  placeholder: string;
  defaultValue?: string;
  errorMessage?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
