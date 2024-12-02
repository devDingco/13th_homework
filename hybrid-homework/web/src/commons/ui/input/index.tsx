"use client";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import Image from "next/image";

// 1. 뼈대 만들기
function InputBase(props) {
  const { register } = useFormContext();
  return (
    <div className={styles.inputField}>
      <label className={styles.label}>
        {props.label}
        {props.isRequired && <span className={styles.required}> *</span>}
      </label>
      <div className={styles.inputContainer}>
        <input
          className={props.className}
          type={props.type}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          disabled={props.disabled}
          {...register(props.name)}
        />
        {props.inputType === "address" && (
          <Image
            src="/assets/right_arrow.svg"
            className={styles.rightArrow}
            width={24}
            height={24}
            alt="right_arrow"
          />
        )}
      </div>
    </div>
  );
}

// 2. 인풋 찍기
export function InputNormal(props) {
  return (
    <InputBase inputType="normal" className={styles.inputNormal} {...props} />
  );
}

export function InputAddress(props) {
  return (
    <InputBase inputType="address" className={styles.inputAddress} {...props} />
  );
}
