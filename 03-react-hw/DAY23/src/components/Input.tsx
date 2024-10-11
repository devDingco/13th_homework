import React from "react";
import { InputProps } from "@/types/board";
import styles from "../app/boards/new/boardNew.module.css";

const InputField: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  required,
  error,
  disabled,
}) => {
  return (
    <div className={styles.구분상자}>
      <div className={styles.필수입력부분}>
        <span>{label}</span>
        {required && <span className={styles.필수별표시}>*</span>}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.긴입력창크기} ${
          disabled ? styles.비활성화입력필드 : ""
        }`}
        disabled={disabled}
      />
      {error && <div className={styles.필수입력에러}>{error}</div>}
    </div>
  );
};

export default InputField;
