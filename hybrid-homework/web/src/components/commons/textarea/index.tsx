"use client";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import { TextareaHTMLAttributes } from "react";

interface ITextareaBase<T> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  className: string;
  name: Path<T>;
  isRequired: boolean;
}

// 1. 뼈대 만들기
function TextareaBase<T extends FieldValues>({
  label,
  className,
  name,
  isRequired,
  ...props
}: ITextareaBase<T>) {
  const { register, watch } = useFormContext();
  const value = watch(name);
  const contentsLength = value ? value.length : 0;

  return (
    <div className={styles.inputField}>
      <div className={styles.label}>
        {label}
        {isRequired && <span className={styles.required}> *</span>}
      </div>
      <div className={styles.textareaBox}>
        <textarea
          className={className}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          disabled={props.disabled}
          {...register(name)}
        />
        <div className={styles.contentsLength}>{contentsLength}/100</div>
      </div>
    </div>
  );
}

interface ITextarea<T> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: Path<T>;
  isRequired: boolean;
}

// prettier-ignore
// 2. 인풋 찍기
export function TextareaNormal<T extends FieldValues>({ label, isRequired, name, ...props }: ITextarea<T>) {
  return <TextareaBase<T> className={styles.textareaNormal} label={label} isRequired={isRequired} name={name} {...props} />;
}
