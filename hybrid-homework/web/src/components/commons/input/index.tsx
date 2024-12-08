"use client";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import Image from "next/image";
import { InputHTMLAttributes } from "react";

interface IInputbase<T> extends InputHTMLAttributes<HTMLInputElement> {
  inputType: "normal" | "address";
  label: string;
  name: Path<T>; // 폼 데이터 타입 T의 속성 경로만 허용
  className: string;
  isRequired?: boolean;
}

// 1. 뼈대 만들기
function InputBase<T extends FieldValues>({
  inputType,
  label,
  name,
  className,
  isRequired,
  ...props
}: IInputbase<T>) {
  const { register } = useFormContext();
  return (
    <div className={styles.inputField}>
      <label className={styles.label}>
        {label}
        {isRequired && <span className={styles.required}> *</span>}
      </label>
      <div className={styles.inputContainer}>
        <input className={className} {...register(name)} {...props} />
        {inputType === "address" && (
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

interface IInput<T> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>; // 폼 데이터 타입 T의 속성 경로만 허용
  isRequired?: boolean;
}

// 2. 인풋 찍기
// prettier-ignore
export function InputNormal<T extends FieldValues>({ label, name, isRequired, ...props }: IInput<T>) {
  return <InputBase<T> inputType="normal" label={label} isRequired={isRequired} name={name} className={styles.inputNormal} {...props} />;
}
// prettier-ignore
export function InputAddress<T extends FieldValues>({ label, name, isRequired, ...props }: IInput<T>) {
  return <InputBase inputType="address" label={label} isRequired={isRequired} name={name} className={styles.inputAddress} {...props} />;
}
