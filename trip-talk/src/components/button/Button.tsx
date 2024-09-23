import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  type?: "submit";
  disabled?: boolean;
  children: ReactNode;
  color: "blue" | "white";
};

export default function Button({
  type,
  disabled,
  children,
  color,
}: ButtonProps) {
  const colorVariants = {
    blue: "bg-btn-blue text-white",
    white: "bg-white text-black border-black",
  };

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={`${styles.button} ${colorVariants[color]}`}
      >
        {children}
      </button>
    </>
  );
}
