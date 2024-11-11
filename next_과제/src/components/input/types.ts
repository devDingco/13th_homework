import { InputRef } from "antd";
import { ChangeEvent } from "react";

export type InputProps = {
  id: string;
  title?: string;
  type?: string;
  accept?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  addonAfter?: string;
  addonBefore?: string;
  rows?: number;
  showCount?: boolean;
  maxLength?: number;
  textMaxCount?: number;
  addbutton?: React.ReactNode;
  ref?: InputRef;
};

export interface IformRegister {
  [key: string]: {
    required?: string | boolean;
    pattern?: {
      value: RegExp;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    validate?: (
      value: string,
      watch: { [key: string]: string }
    ) => string | boolean;
  };
}
