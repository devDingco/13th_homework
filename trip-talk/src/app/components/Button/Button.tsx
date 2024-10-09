import styles from "./styles.module.css";
import Image from "next/image";
import { IButtonProps } from "../../../types/components.type";
import { BUTTON } from "../../../constants/constants";

export default function Button({ id, disabled, color }: IButtonProps) {
  const colorVariants = {
    blue: "bg-blue text-white",
    gray: "bg-gray text-white",
    white: "bg-white text-black border-black",
  };

  return (
    <>
      <button
        id={id}
        type={id.includes("submit") ? "submit" : undefined}
        disabled={disabled}
        className={`${styles.button} ${colorVariants[color]}`}
      >
        {BUTTON[id]}
        {id === "menu" ||
          ((id === "edit" || id === "list") && (
            <Image src={`/svgs/${id}.svg`} alt={id} width={24} height={24} />
          ))}
      </button>
    </>
  );
}
