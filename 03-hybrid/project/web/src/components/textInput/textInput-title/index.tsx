import React from "react";
import styles from "./styles.module.css";

interface ITextInputTitleProps {
  title: string;
  required?: boolean;
}

export default function TextInputTitle({
  title,
  required = false,
}: ITextInputTitleProps) {
  return (
    <div className={styles.textInputTitle__container}>
      <p className={styles.title}>{title}</p>
      {required && <p className={styles.asterisk}>*</p>}
    </div>
  );
}
