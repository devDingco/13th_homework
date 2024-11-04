"use client";

import React from "react";
import styles from "./style.module.css";
import { IPropsPList } from "./types";
import UseProductListDetail from "./hook";
export default function PListItem({ el, index }: IPropsPList) {
  const { onClickProductdetail } = UseProductListDetail();
  return (
    <>
      <div
        className={styles.css_mylist}
        onClick={() => onClickProductdetail(el._id)}
      >
        <div className={styles.css_commentshow}>
          <div className={styles.css_commentwriter}>
            <div className={styles.css_profilewriter}>
              <div className={styles.css_writer}>{el.name}</div>
            </div>

            <div className={styles.css_image}></div>
          </div>
          <div className={styles.css_commentcontents}>{el.contents}</div>
          {/* <div>{el.createdAt.split("T")[0]}</div> */}
          <div className={styles.css_hr}></div>
        </div>
      </div>
    </>
  );
}
