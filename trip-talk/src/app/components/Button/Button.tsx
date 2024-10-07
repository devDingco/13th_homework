import styles from "./styles.module.css";
import Image from "next/image";
import { IButtonProps } from "../../../types/components.type";

export default function Button({
  type,
  disabled,
  children,
  color,
  src,
  alt,
}: IButtonProps) {
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
        {src && alt && <Image src={src} alt={alt} width={24} height={24} />}
        {children}
      </button>
    </>
  );
}
