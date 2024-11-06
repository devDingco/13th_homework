"use client";

import { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.css";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface IInputBaseProps<T extends FieldValues> {
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder: string;
  keyName: Path<T>;
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
  return <InputBase className={styles.input} {...props} />;
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
}

export function InputForm<T extends FieldValues>({
  keyName,
  label,
  type,
  placeholder,
  children,
  isRequired = false,
  isHiddenHeader = false,
}: IInputFormProps<T>) {
  const props = { label, type, placeholder, isRequired, children, keyName };
  return (
    <div className={styles.form__container}>
      {!isHiddenHeader && (
        <InputHeader isRequired={isRequired}>{label}</InputHeader>
      )}
      <div className={styles.form__Input__container}>
        <Input {...props} />
        {children}
      </div>
    </div>
  );
}
