import React from "react";
import styles from "../styles.module.css";
import ErrorMsg from "./error";

import { IInputGroup } from "../../types/components";

const InputGroup: React.FC<IInputGroup> = ({
  label,
  type = "text",
  name,
  onChange,
  placeholder,
  value,
  error,
  isRequired = true,
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
        value={value}
      />
      {error && <ErrorMsg errorMessage={error} />}
    </div>
  );
};

export default InputGroup;
