"use client";

import { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.css";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import classNames from "classnames";

type ValidationStatus = "default" | "error";

interface IInputBaseProps<T extends FieldValues> {
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder: string;
  keyName: Path<T>;
  validationStatus?: ValidationStatus;
}

function InputBase<T extends FieldValues>({
  type,
  placeholder,
  className,
  keyName,
}: IInputBaseProps<T>) {
  const { register } = useFormContext<T>();
  return (
    <input
      {...register(keyName)}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
}

export function Input<T extends FieldValues>(props: IInputBaseProps<T>) {
  const getClassNames = () => {
    if (typeof props.validationStatus === "undefined") return;

    return classNames(`${styles.input}`, {
      [styles.error__input]: props.validationStatus === "error",
    });
  };

  return <InputBase className={getClassNames()} {...props} />;
}

interface IBaseInputHeaderProps {
  label?: string;
  isHiddenHeader?: boolean;
  isRequired?: boolean;
  children: React.ReactNode;
  className?: string;
}

function BaseInputHeader({ children, className }: IBaseInputHeaderProps) {
  return <span className={className}>{children}</span>;
}

export function InputHeader(props: IBaseInputHeaderProps) {
  return (
    <div className={styles.input__header__container}>
      <BaseInputHeader className={styles.input__header} {...props} />
      {props.isRequired && <div className={styles.required__mark}>*</div>}
    </div>
  );
}

interface IInputFormProps<T extends FieldValues> {
  keyName: Path<T>;
  label?: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  children?: React.ReactNode;
  isRequired?: boolean;
  isHiddenHeader?: boolean;
  validationStatus?: ValidationStatus;
  errorMessage?: string;
}

export function InputForm<T extends FieldValues>({
  keyName,
  label,
  type,
  placeholder,
  children,
  isRequired = false,
  isHiddenHeader = false,
  validationStatus = "default",
  errorMessage,
}: IInputFormProps<T>) {
  const props = {
    label,
    type,
    placeholder,
    isRequired,
    children,
    keyName,
    validationStatus,
  };

  return (
    <div className={styles.form__container}>
      {!isHiddenHeader && (
        <InputHeader isRequired={isRequired}>{label}</InputHeader>
      )}
      <div className={styles.form__input__container}>
        <Input {...props} />
        {/* 인풋 오른쪽에 버튼과 같은 요소가 있는 경우 사용. */}
        {children}
      </div>
      <span className={styles.error__message}>{errorMessage}</span>
    </div>
  );
}
