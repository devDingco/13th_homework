import React from "react";
import styles from "./styles.module.css";
import ErrorMsg from "./error";

import { IInputGroup } from "@/types/components";

const InputGroup: React.FC<IInputGroup> = ({
  label,
  type = "text",
  name,
  onChange,
  placeholder,
  error,
  isRequired = true,
  isDisabled,
  defaultValue,
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
        disabled={isDisabled}
        defaultValue={defaultValue}
      />
      {error && <ErrorMsg errorMessage={error} />}
    </div>
  );
};

export default InputGroup;
