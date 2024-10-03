import styles from "../boardNew.module.css";
import { TextareaFieldProps } from "@/types/board";

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
