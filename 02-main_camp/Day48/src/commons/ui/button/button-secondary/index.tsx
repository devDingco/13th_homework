import React from "react";
import { ButtonBase, ButtonVariant, IButtonBaseProps } from "../button-base";

type IButtonSecondaryProps = Pick<
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

export function ButtonSecondary(props: IButtonSecondaryProps) {
  return <ButtonBase variant={ButtonVariant.secondary} {...props} />;
}
