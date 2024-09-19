import { ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  color: "blue" | "white";
};

export default function Button({ children, color }: ButtonProps) {
  const colorVariants = {
    blue: "bg-btn-blue text-white",
    white: "bg-white text-black border-black",
  };

  return (
    <>
      <button className={`${styles.button} ${colorVariants[color]}`}>
        {children}
      </button>
    </>
  );
}
