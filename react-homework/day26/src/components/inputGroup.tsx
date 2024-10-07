import React from "react";
import styles from "./styles.module.css";
import ErrorMsg from "./error";
import { IInputGroupProps } from "./types";

const InputGroup: React.FC<IInputGroupProps> = ({
  label,
  type = "text",
  name,
  onChange,
  placeholder,
  defaultValue,
  error,
  isRequired = true,
  isDisabled,
}) => {
  return (
    <div className={styles.input_group}>
      <div className={styles.input_label}>
        {label}
        {isRequired && <span className={styles.require}> *</span>}
      </div>
      <input
        type={type}
        name={name}
        className={styles.input_box}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={isDisabled}
      />
      {error && <ErrorMsg errorMessage={error} />}
    </div>
  );
};

export default InputGroup;
