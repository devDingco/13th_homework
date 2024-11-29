import React from "react";
import Icon from "../icon";
import styles from "./styles.module.css";

export default function TitleContainer() {
  return (
    <div className={styles.title}>
      <p>Bramble & Brioche 한남점</p>
      <Icon src="pencel.svg" />
    </div>
  );
}
