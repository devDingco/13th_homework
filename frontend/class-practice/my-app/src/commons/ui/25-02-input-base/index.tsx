"use client";

import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1.뼈대만들기
function InputBase(props) {
  const { register } = useFormContext();
  return (
    <input
      type={props.type}
      {...register(props.keyname)}
      className={props.className}
    />
  );
}

// 2. 인풋 찍기
export function InputSoftFull(props) {
  return <InputBase className={styles.input_soft_s_full} {...props} />;
}
