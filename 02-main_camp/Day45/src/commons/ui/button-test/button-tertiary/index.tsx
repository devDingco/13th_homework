import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import ButtonBase, {
  ButtonSize,
  ButtonVariant,
  IButtonBaseProps,
} from "../button-base";

type IButtonPrimaryProps = Required<IButtonBaseProps>;

export default function ButtonTertiary({
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

  return <ButtonBase variant={ButtonVariant.tertiary} {...props} />;
}
