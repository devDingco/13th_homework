"use client";

import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonBase extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

// 1. 버튼 뼈대 만들기
function ButtonBase({ children, ...props }: IButtonBase) {
  const formContext = useFormContext();
  const isFormValid = formContext ? formContext.formState.isValid : true;
  return (
    <button {...props} disabled={props.type !== "button" && !isFormValid}>
      {children}
    </button>
  );
}

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonPrimaryMFull(props: IButton) {
  return <ButtonBase className={styles.button__primary__m__full} {...props} />;
}
