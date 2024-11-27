import React from "react";
import IconRightArrow from "../icon/icon-right_arrow";
import styles from "./styles.module.css";
import TextInputTitle from "../textInput/textInput-title";

export default function AddressContainer() {
  return (
    <div className={styles.AddressContainer__wrapper}>
      <TextInputTitle title="플레이스 주소" />
      <div className={styles.AddressContainer}>
        <button>플레이스 주소 입력</button>
        <IconRightArrow />
      </div>
    </div>
  );
}
