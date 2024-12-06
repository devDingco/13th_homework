"use client";

import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1. 버튼 뼈대 만들기
function ButtonBase(props) {
  const formContext = useFormContext();
  const isFormValid = formContext ? formContext.formState.isValid : true;
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      disabled={!isFormValid}
    >
      {props.children}
    </button>
  );
}

export function ButtonPrimaryMFull(props) {
  return <ButtonBase className={styles.button__primary__m__full} {...props} />;
}
