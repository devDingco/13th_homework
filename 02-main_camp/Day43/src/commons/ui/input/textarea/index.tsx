import React from "react";
import styles from "./styles.module.css";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface ITextAreaBaseProps<T extends FieldValues> {
  className: string;
  placeholder: string;
  keyName: Path<T>;
}

function TextAreaBase<T extends FieldValues>({
  className,
  placeholder,
  keyName,
}: ITextAreaBaseProps<T>) {
  const { register } = useFormContext<T>();
  return (
    <textarea
      {...register(keyName)}
      className={className}
      placeholder={placeholder}
      rows={5}
    ></textarea>
  );
}

type ITextAreaProps<T extends FieldValues> = Pick<
  ITextAreaBaseProps<T>,
  "placeholder" | "keyName"
> & {
  showCount?: boolean;
};

export function TextArea<T extends FieldValues>({
  keyName,
  placeholder,
  showCount = false,
}: ITextAreaProps<T>) {
  const props = { keyName, placeholder };
  return (
    <div className={styles.textArea__container}>
      <TextAreaBase className={styles.textArea} {...props} />
      {showCount && <TextCount />}
    </div>
  );
}

function TextCount() {
  return <span className={styles.textCount}>0/100</span>;
}
