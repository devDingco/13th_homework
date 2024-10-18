import React from "react";
import styles from "./FormField.module.css";
import Input from "./input";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  onChange,
  required,
  error,
  defaultValue,
  disabled,
}) => {
  const getPlaceholder = (label: string) => {
    switch (label) {
      case "작성자":
        return "작성자 명을 입력해 주세요.";
      case "비밀번호":
        return "비밀번호를 입력해 주세요.";
      case "제목":
        return "제목을 입력해 주세요.";
      case "내용":
        return "내용을 입력해 주세요.";
      case "주소":
        return "주소를 입력해 주세요.";
      case "유튜브 링크":
        return "링크를 입력해 주세요.";
      default:
        return "";
    }
  };

  return (
    <div className={styles.구분상자}>
      <div className={styles.필수입력부분}>
        <span>{label}</span>
        {required && <span>*</span>}
      </div>
      <Input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={getPlaceholder(label)}
        className={styles.중간입력창크기}
        required={required}
        defaultValue={defaultValue ?? ""}
        disabled={disabled}
      />
      {required && error && <div className={styles.필수입력에러}>{error}</div>}
    </div>
  );
};

export default FormField;
