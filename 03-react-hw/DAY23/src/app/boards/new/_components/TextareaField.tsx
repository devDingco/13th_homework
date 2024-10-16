import React from "react";
import { InputProps } from "@/types/board";
import styles from "../boardNew.module.css";

const TextareaField: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
}) => {
  return (
    <div className={styles.구분상자}>
      <div className={styles.필수입력부분}>
        <span>{label}</span>
        {required && <span className={styles.필수별표시}>*</span>}
      </div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.내용입력창크기}`}
      />
      {error && <div className={styles.필수입력에러}>{error}</div>}
    </div>
  );
};

export default TextareaField;
