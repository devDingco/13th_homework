import React from "react";
import Icon from "../icon";
import styles from "./styles.module.css";

interface ITitleContainerProps {
  title: string;
  onClickEdit: () => void;
}

export default function TitleContainer({
  title,
  onClickEdit,
}: ITitleContainerProps) {
  return (
    <div className={styles.title}>
      <p>{title}</p>
      <button onClick={onClickEdit}>
        <Icon src="pencel.svg" />
      </button>
    </div>
  );
}
