"use client";
import { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.css";

function BaseInput({ type, placeholder, className }: any) {
  return <input type={type} placeholder={placeholder} className={className} />;
}

export function Input(props: any) {
  return <BaseInput className={styles.input} {...props} />;
}

type IBaseInputHeaderProps = Pick<
  IInputFormProps,
  "label" | "isHiddenHeader" | "isRequired"
> & {
  children: React.ReactNode;
  className?: string;
};

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

interface IInputFormProps {
  label?: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  children?: React.ReactNode;
  isRequired?: boolean;
  isHiddenHeader?: boolean;
}

export function InputForm({
  label,
  type,
  placeholder,
  children,
  isRequired = false,
  isHiddenHeader = false,
}: IInputFormProps) {
  const props = { label, type, placeholder, isRequired, children };
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
