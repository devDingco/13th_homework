import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import classNames from "classnames";

export enum InputSize {
  large = "large",
  medium = "medium",
  small = "small",
}

export interface IInputBaseProps<T extends FieldValues> {
  keyName: Path<T>;
  size: InputSize;
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  valid?: boolean;
}

export function InputBase<T extends FieldValues>({
  keyName,
  type,
  className,
  placeholder,
  disabled = false,
  required = false,
  valid = true,
  size,
}: IInputBaseProps<T>) {
  const { register } = useFormContext<T>();
  const getClassNames = () => {
    return classNames(styles.input__base, className, {
      [styles.input__status__invalid]: !valid,
      [styles.input__size__small]: size === InputSize.small,
      [styles.input__size__medium]: size === InputSize.medium,
    });
  };

  const appliedClassName = className ? className : getClassNames();

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
