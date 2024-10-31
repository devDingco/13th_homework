"use client";
import styles from "./styles.module.css";

function BaseInput({ type, placeholder, className }: any) {
  return <input type={type} placeholder={placeholder} className={className} />;
}

export function Input(props: any) {
  return <BaseInput className={styles.input} {...props} />;
}

function BaseInputHeader({ children, className }: any) {
  return <span className={className}>{children}</span>;
}

export function InputHeader(props: any) {
  return (
    <div className={styles.input__header__container}>
      <BaseInputHeader className={styles.input__header} {...props} />
      <div className={styles.required__mark}>*</div>
    </div>
  );
}

export function InputForm(props: any) {
  return (
    <div className={styles.form__container}>
      <InputHeader>{props.label}</InputHeader>
      <Input {...props} />
    </div>
  );
}
