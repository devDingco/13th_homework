import { ChangeEventHandler, ReactNode } from "react";

export interface IBoardsWrite {
  isEdit: boolean;
  data?: any;
}

export interface IInputProps {
  isLabel: boolean;
  children?: ReactNode;
  isRequired: boolean;
  id?: string;
  type: string;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  disabled?: boolean;
}

export interface IButtonProps {
  type?: "submit";
  disabled?: boolean;
  children: ReactNode;
  color: "blue" | "gray" | "white";
  src?: string;
  alt?: string;
}

export interface IError {
	graphQLErrors: {
		message: string;
	};
}