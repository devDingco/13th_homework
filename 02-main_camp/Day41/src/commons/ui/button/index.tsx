import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

interface IButtonBaseProps {
  className: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function ButtonBase(props: IButtonBaseProps) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}

type IButtonProps = Pick<IButtonBaseProps, "label" | "onClick" | "disabled">;

export function Button__48__full({
  label,
  onClick,
  disabled = false,
}: IButtonProps) {
  const getClassNames = () => {
    return classNames(`${styles.button__48__full}`, {
      [styles.button__disabled]: disabled,
    });
  };

  return (
    <ButtonBase
      className={getClassNames()}
      label={label}
      onClick={onClick}
      disabled={disabled}
    ></ButtonBase>
  );
}
