import { INPUT_CHILDREN, PLACEHOLDERS } from "../../../constants/constants";
import { IInputProps } from "../../../types/components.type";
import styles from "./styles.module.css";

export default function Input({
  id,
  onChange,
  defaultValue,
  disabled,
  value,
}: IInputProps) {
  return (
    <div className={styles.input_wrapper}>
      {id !== "address" && id !== "detail_address" && (
        <div className={styles.label_wrapper}>
          <label className={styles.label}>{INPUT_CHILDREN[id]}</label>
          {id !== "zip_code" && id !== "url" && (
            <b className={`${styles.required_marker}`}>*</b>
          )}
        </div>
      )}

      <input
        className={styles.input}
        id={id}
        type={id === "password" ? "password" : "text"}
        placeholder={PLACEHOLDERS[id]}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        value={value}
      />
    </div>
  );
}
