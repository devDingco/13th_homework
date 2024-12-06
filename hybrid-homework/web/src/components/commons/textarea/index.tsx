"use client";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1. 뼈대 만들기
function TextareaBase(props) {
  const { register } = useFormContext();
  return (
    <div className={styles.inputField}>
      <div className={styles.label}>
        {props.label}
        {props.isRequired && <span className={styles.required}> *</span>}
      </div>
      <textarea
        className={props.className}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        disabled={props.disabled}
        {...register(props.name)}
      />
    </div>
  );
}

// 2. 인풋 찍기
export function TextareaNormal(props) {
  return <TextareaBase className={styles.textareaNormal} {...props} />;
}
