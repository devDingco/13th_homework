import { ChangeEvent } from "react";
import styles from "./input.module.css";

interface IInputProps {
  label: string;
  name: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const Input: React.FC<IInputProps> = ({
  label,
  type,
  name,
  onChange,
  required,
  error,
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
    }
  };

  return (
    <div className={styles.구분상자}>
      <div className={styles.필수입력부분}>
        <span>{label}</span>
        <span>*</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={getPlaceholder(label)}
        className={styles.중간입력창크기}
        onChange={onChange}
        required
      />
      {required && <div className={styles.필수입력에러}>{error}</div>}
    </div>
  );
};

export default Input;
