import React from "react";
import styles from "../styles.module.css";
import ErrorMsg from "./error";

// props 타입 정의
interface IInputGroup {
  label: string;
  type?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
  error?: string;
}

const InputGroup: React.FC<IInputGroup> = ({
  label,
  type = "text",
  name,
  onChange,
  placeholder,
  value,
  error,
}) => {
  console.log(placeholder);

  return (
    <div className={styles.input_group}>
      <label className={styles.input_label}>
        {label}
        {label !== "유튜브 링크" && <span className={styles.require}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        className={styles.input_box}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <ErrorMsg errorMessage={error} />}
    </div>
  );
};

export default InputGroup;
