import { ChangeEvent } from "react";

export type InputProps = {
  id: string;
  title?: string;
  errormessage?: string;
  type?: string;
  accept?: string;
  required?: boolean;
  uploadcount?: number;
  placeholder?: string;
  defaultValue?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  addonAfter?: string;
  addonBefore?: string;
  control?: any;
  rows?: number;
  showCount?: boolean;
  maxLength?: number;
  textMaxCount?: number;
};

export interface IformResister {
  [key: string]: {
    required?: string;
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
  };
}
