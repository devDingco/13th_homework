import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import ButtonBase, { ButtonVariant, IButtonBaseProps } from "../button-base";

type IButtonPrimaryProps = Required<IButtonBaseProps>;

export default function ButtonSecondary({
  size,
  className,
  label,
  disabled,
  trailingIcon,
  leadingIcon,
  onClick,
}: IButtonPrimaryProps) {
  const props = {
    size,
    className,
    label,
    disabled,
    trailingIcon,
    leadingIcon,
    onClick,
  };

  return <ButtonBase variant={ButtonVariant.secondary} {...props} />;
}
