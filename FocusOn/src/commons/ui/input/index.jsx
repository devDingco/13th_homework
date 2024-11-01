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
      {...register(props.keyname)}
    />
  );
}

// 2. 인풋 찍기
export function InputSoftMFull(props) {
  return <InputBase className={styles.input__soft__m__full} {...props} />;
}
