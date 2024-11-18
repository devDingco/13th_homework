import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import classNames from "classnames";

export interface IInputBaseProps<T extends FieldValues> {
  type: HTMLInputTypeAttribute;
  keyName: Path<T>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  valid?: boolean;
}

export default function InputBase<T extends FieldValues>({
  type,
  keyName,
  className,
  placeholder,
  disabled = false,
  required = false,
  valid = true,
}: IInputBaseProps<T>) {
  const { register } = useFormContext<T>();
  const getClassNames = () => {
    return classNames(styles.input, {
      [styles.input__status__valid]: valid,
      [styles.input__status__invalid]: !valid,
    });
  };

  const appliedClassName = typeof className ? className : getClassNames();

  return (
    <input
      {...register(keyName)}
      type={type}
      className={appliedClassName}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
    />
  );
}
