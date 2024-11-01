"use client";

import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

// 1. 버튼뼈대 만들기
export default function ButtonBase(props) {
  const { formState } = useFormContext();
  return (
    <button className={props.className} disabled={!formState.isValid}>
      {props.children}
    </button>
  );
}
