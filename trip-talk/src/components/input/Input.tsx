import { ReactNode } from "react";
import styles from "./Input.module.css";

type InputProps = {
  isLabel: boolean;
  children?: ReactNode;
  isRequired: boolean;
  type: string;
  placeholder: string;
};

export default function Input({
  isLabel,
  children,
  isRequired,
  type,
  placeholder,
}: InputProps) {
  return (
    <>
      <div className={styles.input_wrapper}>
        {isLabel ? (
          <div className={styles.label_wrapper}>
            <label className={styles.label}>{children}</label>
            {isRequired ? <b className={`${styles.required_marker}`}>*</b> : null}
          </div>
        ) : null}

        <input className={styles.input} type={type} placeholder={placeholder} />
      </div>
    </>
  );
}
