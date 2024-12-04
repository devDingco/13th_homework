"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { Footer } from "@/commons/layout/footer";

export default function Mypages() {
  const [isLoactionChecked, setIsLoactionChecked] = useState(false);
  const [isNotificationChecked, setIsNotificatioChecked] = useState(false);

  const locationToggle = () => {
    setIsLoactionChecked((prev) => !prev);
  };
  const notificationToggle = () => {
    setIsNotificatioChecked((prev) => !prev);
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.item}>
          <p className={styles.itemTitle}>위치권한</p>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isLoactionChecked}
              onChange={locationToggle}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.item}>
          <p className={styles.itemTitle}>알림권한</p>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isNotificationChecked}
              onChange={notificationToggle}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </main>
      <Footer />
    </>
  );
}
