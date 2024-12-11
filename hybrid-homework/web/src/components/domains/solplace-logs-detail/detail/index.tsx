"use client";
import PlaceContents from "./place-contents";
import PlaceInfo from "./place-info";
import styles from "./styles.module.css";

export default function SolplaceLogsDetail() {
  return (
    <div className={styles.detail}>
      <PlaceInfo />
      <div className={styles.divider}></div> {/* 구분선 */}
      <PlaceContents />
    </div>
  );
}
