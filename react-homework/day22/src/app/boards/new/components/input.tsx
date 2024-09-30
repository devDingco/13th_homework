import React from "react";
import styles from "../styles.module.css";

// import ErrorMsg from "./error";
interface IInputField {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  onChange: () => void;
  value: string;
  require: boolean;
}
const InputField: React.FC<IInputField> = ({
  type = "text",
  name,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={styles.input_box}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputField;
