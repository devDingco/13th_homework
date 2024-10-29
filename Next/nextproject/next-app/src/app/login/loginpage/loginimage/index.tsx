"use client";
import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
export default function LoginImage() {
  return (
    <>
      <Image
        src="/assets/Banner1.png"
        alt="mainimg"
        width={10}
        height={10}
        className={styles.css_mainimg}
        sizes="100vw"
      />
    </>
  );
}
