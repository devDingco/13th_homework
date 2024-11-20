import React from "react";
import { FieldValues } from "react-hook-form";
import styles from "./styles.module.css";
import { Input, IInputProps } from "@/lib/input";

type IInputFormProps<T extends FieldValues> = IInputProps<T> & {
  title: string;
};

export function InputForm<T extends FieldValues>(props: IInputFormProps<T>) {
  const { title, required } = props;
  return (
    <div className={styles.input__form__wrapper}>
      <div className={styles.input__form__title}>
        {title}
        {required && <p>*</p>}
      </div>
      <Input {...props} />
    </div>
  );
}
