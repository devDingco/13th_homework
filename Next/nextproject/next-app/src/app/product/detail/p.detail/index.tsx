"use client";

import { withLoginCheck } from "../../../component/_commons/hocs/withLoginCheck";
import styles from "./style.module.css";
import React from "react";
export default withLoginCheck(function ProductDeatil() {
  return (
    <>
      <div className={styles.css_detaillayout}>
        <div className={styles.css_detailbox}>
          <div className={styles.css_productname}></div>
        </div>
      </div>
    </>
  );
});
