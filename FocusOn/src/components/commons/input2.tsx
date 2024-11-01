import React from "react";
import styles from "./styles.module.css";
import { IInputFieldProps } from "./types";
import { useFormContext } from "react-hook-form";

const Input: React.FC<IInputFieldProps> = ({ type, placeholder, qqq }) => {
  const { register } = useFormContext();
  return (
    <input
      type={type}
      className={styles.input_box}
      placeholder={placeholder}
      {...register(props.qqq)}
    />
  );
};

export default Input;
