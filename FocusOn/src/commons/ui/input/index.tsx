"use client";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1. 뼈대 만들기
function InputBase(props) {
  const { register } = useFormContext();
  return (
    <input
      className={props.className}
      type={props.type}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      disabled={props.disabled}
      {...register(props.name)}
    />
  );
}

// 2. 인풋 찍기
export function InputSoftMFull(props) {
  return <InputBase className={styles.input__soft__m__full} {...props} />;
}

export function InputSoftMS(props) {
  return <InputBase className={styles.input__soft__m__s} {...props} />;
}
