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

export interface IButtonBaseProps {
  className?: string;
  label: string;
  disabled?: boolean;
  filled?: boolean;
  size?: ButtonSize;
  variant: ButtonVariant;
  onClick?: () => void;
}

export default function ButtonBase({
  className,
  label,
  disabled = false,
  filled = true,
  size = ButtonSize.medium,
  variant,
  onClick,
}: IButtonBaseProps) {
  const getClassNames = () => {
    return classNames(styles.button__base, {
      [styles.button__filled]: filled,
      [styles.button__size__large]: size === ButtonSize.large,
      [styles.button__size__medium]: size === ButtonSize.medium,
      [styles.button__size__small]: size === ButtonSize.small,

      [styles.button__variant__primary]: variant === ButtonVariant.primary,
      [styles.button__variant__secondary]: variant === ButtonVariant.secondary,
      [styles.button__variant__tertiary]: variant === ButtonVariant.tertiary,

      [styles.button__disabled]: disabled,
    });
  };

  return (
    <button
      className={`${getClassNames()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
