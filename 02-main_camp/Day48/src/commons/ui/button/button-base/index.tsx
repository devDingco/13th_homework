import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

export enum ButtonSize {
  large = "large",
  medium = "medium",
  small = "small",
}

export enum ButtonVariant {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export interface IButtonBaseProps<T = React.MouseEvent<HTMLButtonElement>> {
  className?: string;
  style?: React.CSSProperties;
  size: ButtonSize;
  variant: ButtonVariant;
  label: string;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  filled?: boolean;
  onClick?: (event: T) => void | Promise<void>;
}

export function ButtonBase({
  className,
  style,
  size,
  variant,
  label,
  disabled = false,
  leadingIcon,
  trailingIcon,
  filled = true,
  onClick,
}: IButtonBaseProps) {
  const getClassNames = () => {
    return classNames(styles.button, {
      [styles.button__large]: size === ButtonSize.large,
      [styles.button__medium]: size === ButtonSize.medium,
      [styles.button__small]: size === ButtonSize.small,

      [styles.button__variant__primary]: variant === ButtonVariant.primary,
      [styles.button__variant__secondary]: variant === ButtonVariant.secondary,
      [styles.button__variant__tertiary]: variant === ButtonVariant.tertiary,

      [styles.button__filled]: filled,

      [styles.button__enabled]: disabled === true,
    });
  };

  const appliedClassName = className ? className : getClassNames();

  return (
    <button
      className={appliedClassName}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </button>
  );
}
