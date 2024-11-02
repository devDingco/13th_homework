"use client";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1. 뼈대 만들기
function TextareaBase(props) {
  const { register } = useFormContext();
  return (
    <textarea
      className={props.className}
      placeholder={props.placeholder}
      {...register(props.keyname)}
    />
  );
}

// 2. 인풋 찍기
export function TextareaSoftMFull(props) {
  return <TextareaBase className={styles.textarea__soft__m__full} {...props} />;
}
