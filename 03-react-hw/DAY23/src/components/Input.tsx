import styles from "../app/boards/new/boardNew.module.css";
import { InputFieldProps } from "@/types/board";

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  required,
  error,
  className,
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
        className={`${styles.긴입력창크기} ${className}`}
        disabled={disabled}
      />
      {error && <div className={styles.필수입력에러}>{error}</div>}
    </div>
  );
};

export default InputField;
