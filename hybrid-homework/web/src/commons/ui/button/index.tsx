"use client";

import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1. 버튼 뼈대 만들기
function ButtonBase(props) {
  const { formState } = useFormContext();
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      disabled={!formState.isValid}
    >
      {props.children}
    </button>
  );
}

export function ButtonSoftMFull(props) {
  return <ButtonBase className={styles.button__soft__m__full} {...props} />;
}
