import Icon from "@/components/icon";
import styles from "./styles.module.css";
import { MouseEvent } from "react";

interface IButtonFloatingActionProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonFloatingAction({
  onClick,
}: IButtonFloatingActionProps) {
  return (
    <button className={styles.button__floating__action} onClick={onClick}>
      <Icon src="add_white.svg" width={2.25} height={2.25} />
    </button>
  );
}
