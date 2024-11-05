"use client";

import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1. 버튼뼈대 만들기
function ButtonBase(props) {
  // const { formState } = useFormContext();
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function ButtonSoftMFullMain(props) {
  return (
    <ButtonBase className={styles.button__soft__m__full__main} {...props} />
  );
}

export function ButtonSoftMFitMain(props) {
  return (
    <ButtonBase className={styles.button__soft__m__fit__main} {...props} />
  );
}

export function ButtonCancel(props) {
  return <ButtonBase className={styles.button__cancel} {...props} />;
}
