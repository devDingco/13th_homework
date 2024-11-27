import React from "react";
import ButtonBase, { ButtonVariant, IButtonBaseProps } from "../button-base";

type IButtonPrimaryProps = Pick<
  IButtonBaseProps,
  "className" | "label" | "disabled" | "onClick" | "filled" | "size"
> & {};

export default function ButtonTertiary(props: IButtonPrimaryProps) {
  return <ButtonBase variant={ButtonVariant.tertiary} {...props} />;
}
