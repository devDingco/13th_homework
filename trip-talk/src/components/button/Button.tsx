import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  type?: "submit";
  disabled?: boolean;
  children: ReactNode;
  color: "blue" | "gray" | "white";
  src?: string;
  alt?: string;
};

export default function Button({
  type,
  disabled,
  children,
  color,
  src,
  alt,
}: ButtonProps) {
  const colorVariants = {
    blue: "bg-blue text-white",
    gray: "bg-gray text-white",
    white: "bg-white text-black border-black",
  };

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={`${styles.button} ${colorVariants[color]}`}
      >
        {src && <img src={src} alt={alt} />}
        {children}
      </button>
    </>
  );
}
