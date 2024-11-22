"use client";

import React, { MouseEvent } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { RightArrowIcon } from "../icon";
import Link from "next/link";

interface IButtonBaseProps {
  className: string;
  label: string;
  disabled?: boolean;
  onClick?:
    | (() => void)
    | ((event: MouseEvent<HTMLButtonElement>) => Promise<void>);
  style?: React.CSSProperties;
  size: ButtonSize;
  variant: ButtonVariant;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export enum ButtonSize {
  large = "large",
  medium = "medium",
}

export enum ButtonVariant {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export function ButtonBase(props: IButtonBaseProps) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.leadingIcon}
      {props.label}
      {props.trailingIcon}
    </button>
  );
}

type IButtonProps = Pick<
  IButtonBaseProps,
  | "label"
  | "onClick"
  | "disabled"
  | "size"
  | "style"
  | "variant"
  | "leadingIcon"
  | "trailingIcon"
>;

export function Button({
  variant,
  style,
  size,
  label,
  onClick,
  disabled = false,
  leadingIcon,
  trailingIcon,
}: IButtonProps) {
  const getClassNames = () => {
    return classNames(`${styles.button}`, {
      [styles.button__large]: size === ButtonSize.large,
      [styles.button__medium]: size === ButtonSize.medium,

      [styles.button__variant__primary]: variant === ButtonVariant.primary,
      [styles.button__variant__secondary]: variant === ButtonVariant.secondary,
      [styles.button__variant__tertiary]: variant === ButtonVariant.tertiary,

      [styles.button__disabled]: disabled,
    });
  };

  return (
    <ButtonBase
      variant={variant}
      style={style}
      size={size}
      className={getClassNames()}
      label={label}
      onClick={onClick}
      disabled={disabled}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
    ></ButtonBase>
  );
}

export function LoginButton() {
  return (
    <Link href="/login" className={styles.button__login}>
      <span>로그인</span>
      <RightArrowIcon />
    </Link>
  );
}
