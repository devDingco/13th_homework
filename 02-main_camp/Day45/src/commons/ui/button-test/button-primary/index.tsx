import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import ButtonBase, {
  ButtonSize,
  ButtonVariant,
  IButtonBaseProps,
} from "../button-base";

type IButtonPrimaryProps = Required<IButtonBaseProps>;

export default function ButtonPrimary({
  className,
  size,
  label,
  disabled,
  trailingIcon,
  leadingIcon,
  onClick,
}: IButtonPrimaryProps) {
  const props = {
    className,
    size,
    label,
    disabled,
    trailingIcon,
    leadingIcon,
    onClick,
  };

  return <ButtonBase variant={ButtonVariant.primary} {...props} />;
}
