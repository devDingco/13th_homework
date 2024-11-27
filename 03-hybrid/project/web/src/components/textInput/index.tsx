import React, { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.css";
import TextInputTitle from "./textInput-title";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface ITextInputProps<T extends FieldValues> {
  keyName: Path<T>;
  title: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
}

export default function TextInput<T extends FieldValues>({
  keyName,
  title,
  type,
  placeholder,
  required = false,
}: ITextInputProps<T>) {
  const { register } = useFormContext<T>();
  return (
    <div className={styles.textInput__container}>
      <TextInputTitle title={title} required={required} />
      <input
        {...register(keyName)}
        className={styles.textInput__base}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
