import React from "react";
import styles from "./styles.module.css";

interface IBaseTextAreaProps {
  className: string;
  placeholder: string;
}

function BaseTextArea({ className, placeholder }: IBaseTextAreaProps) {
  return (
    <textarea
      className={className}
      placeholder={placeholder}
      rows={5}
    ></textarea>
  );
}

type ITextAreaProps = Pick<IBaseTextAreaProps, "placeholder"> & {
  showCount?: boolean;
};

export function TextArea({ placeholder, showCount = false }: ITextAreaProps) {
  const props = { placeholder };
  return (
    <div className={styles.textArea__container}>
      <BaseTextArea className={styles.textArea} {...props} />
      {showCount && <TextCount />}
    </div>
  );
}

function TextCount() {
  return <span className={styles.textCount}>0/100</span>;
}
