import { IInputProps } from "../../../types/components.type";
import styles from "./styles.module.css";

export default function Input({
  isLabel,
  children,
  isRequired,
  id,
  type,
  placeholder,
  onChange,
  defaultValue,
  disabled,
}: IInputProps) {
  return (
    <>
      <div className={styles.input_wrapper}>
        {isLabel && (
          <div className={styles.label_wrapper}>
            <label className={styles.label}>{children}</label>
            {isRequired && <b className={`${styles.required_marker}`}>*</b>}
          </div>
        )}

        <input
          className={styles.input}
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </div>
    </>
  );
}
