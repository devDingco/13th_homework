import { ChangeEventHandler, ReactNode } from "react";
import styles from "./Input.module.css";

type InputProps = {
  isLabel: boolean;
  children?: ReactNode;
  isRequired: boolean;
  id?: string;
  type: string;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function Input({
  isLabel,
  children,
  isRequired,
  id,
  type,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <>
      <div className={styles.input_wrapper}>
        {isLabel && (
          <div className={styles.label_wrapper}>
            <label className={styles.label}>{children}</label>
            {isRequired && <b className={`${styles.required_marker}`}>*</b> }
          </div>
        )}

        <input className={styles.input} id={id} type={type} placeholder={placeholder} onChange={onChange} />
      </div>
    </>
  );
}
