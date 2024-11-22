import React from "react";
import { ButtonBase, ButtonVariant, IButtonBaseProps } from "../button-base";

type IButtonTertiaryProps = Pick<
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

export function ButtonTertiary(props: IButtonTertiaryProps) {
  return <ButtonBase variant={ButtonVariant.tertiary} {...props} />;
}
