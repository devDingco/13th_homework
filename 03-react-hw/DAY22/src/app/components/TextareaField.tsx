import React, { ChangeEvent } from "react";
import styles from "../boards/new/styles.module.css";

interface TextareaFieldProps {
  label: string; // 라벨 텍스트
  name: string; // textarea 이름
  value: string; // 입력 값
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; // 변경
  placeholder?: string; // 플레이스홀더 텍스트
  required?: boolean; // 필수 입력 여부
  error?: string; // 에러 메시지
  className?: string;
  rows?: number; // textarea의 행 수
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className,
  rows = 4, // 기본 4행으로 설정
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
        className={`${styles.내용입력창크기} ${className}`}
        rows={rows}
      />
      {error && <div className={styles.필수입력에러}>{error}</div>}
    </div>
  );
};

export default TextareaField;
