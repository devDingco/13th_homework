import React from "react";
import { ButtonBase, ButtonVariant, IButtonBaseProps } from "../button-base";

type IButtonPrimaryProps = Pick<
  IButtonBaseProps,
  | "size"
  | "label"
  | "disabled"
  | "leadingIcon"
  | "trailingIcon"
  | "onClick"
  | "style"
  | "filled"
>;

export function ButtonPrimary(props: IButtonPrimaryProps) {
  return <ButtonBase variant={ButtonVariant.primary} {...props} />;
}
