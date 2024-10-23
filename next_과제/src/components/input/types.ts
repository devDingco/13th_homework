import { ChangeEvent } from "react";
import { Control } from "react-hook-form";

export type InputProps = {
  id: string;
  title?: string;
  errormessage?: string;
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
  control?: Control;
  rows?: number;
  showCount?: boolean;
  maxLength?: number;
  textMaxCount?: number;
  addbutton?: React.ReactNode;
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
