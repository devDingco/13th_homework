"use client";
import styles from "./styles.module.css";
import { useFormContext } from "react-hook-form";

function InputBase(props) {
  const { register, formState } = useFormContext();
  return (
    <div>
      <span>{props.title}</span>
      <input
        className={`${props.className}`}
        type={props.type}
        {...register(props.keyname)}
      />

      {formState.errors && (
        <div className="text-red-600">
          {formState.errors.message?.toString()}
        </div>
      )}
    </div>
  );
}

export function InputSoftMM(props) {
  return <InputBase className={styles.input__soft__M_M} {...props} />;
}
