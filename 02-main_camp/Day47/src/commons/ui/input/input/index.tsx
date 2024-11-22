import React from "react";
import { InputBase, IInputBaseProps } from "./input-base";
import styles from "./styles.module.css";
import { FieldValues } from "react-hook-form";

export type IInputProps<T extends FieldValues> = Pick<
  IInputBaseProps<T>,
  | "type"
  | "keyName"
  | "className"
  | "placeholder"
  | "disabled"
  | "required"
  | "valid"
  | "size"
> & {
  errorMessage?: string;
};

export function Input<T extends FieldValues>(props: IInputProps<T>) {
  const { errorMessage } = props;
  return (
    <div className={styles.input__wrapper}>
      <InputBase<T> {...props} />
      <p className={styles.error__message}>{errorMessage}</p>
    </div>
  );
}
