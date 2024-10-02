import React, { ChangeEvent } from "react";
import styles from "../boards/new/styles.module.css";

interface InputFieldProps {
  label: string; // <span>여기들어갈내용</span>
  name: string; // 입력 필드 이름
  value: string; // 입력 값
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string; // 입력 타입
  required?: boolean; // 필수 입력 여부
  error?: string; // 에러 메시지
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
  className,
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
        className={`${styles.긴입력창크기} ${className}`}
      />
      {error && <div className={styles.필수입력에러}>{error}</div>}
    </div>
  );
};

export default InputField;
