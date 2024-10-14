import { ChangeEvent } from "react";
export type InputProps = {
  id?: string;
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
};
