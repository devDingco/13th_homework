import React from "react";
import styles from "./styles.module.css";
import { IInputFieldProps } from "./types";

const InputField: React.FC<IInputFieldProps> = ({
  as = "input",
  type,
  name,
  onChange,
  placeholder,
  defaultValue,
  isDisabled = false,
}) => {
  // input인지 testarea인지 동적으로 결정 함
  const Component = as;

  return (
    <Component
      type={type}
      name={name}
      className={as === "input" ? styles.input_box : styles.content_input_box}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={isDisabled}
    />
  );
};

export default InputField;
