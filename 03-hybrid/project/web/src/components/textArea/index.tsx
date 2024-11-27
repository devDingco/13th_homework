import React from "react";
import TextInputTitle from "../textInput/textInput-title";
import styles from "./styles.module.css";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface ITextAreaProps<T extends FieldValues> {
  keyName: Path<T>;
  title: string;
  placeholder: string;
  required?: boolean;
}

export default function TextArea<T extends FieldValues>({
  keyName,
  title,
  placeholder,
  required = false,
}: ITextAreaProps<T>) {
  const { register } = useFormContext<T>();
  return (
    <div className={styles.textArea__box}>
      <TextInputTitle title={title} required={required} />
      <textarea
        {...register(keyName)}
        className={styles.textArea}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
