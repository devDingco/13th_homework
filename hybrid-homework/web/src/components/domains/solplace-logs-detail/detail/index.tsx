"use client";
import { useLoading } from "@/commons/stores/loading-store";
import PlaceContents from "./place-contents";
import PlaceInfo from "./place-info";
import styles from "./styles.module.css";

export default function SolplaceLogsDetail() {
  const isLoading = useLoading((state) => state.isLoading);
  if (isLoading) return <></>;
  return (
    <div className={styles.detail}>
      <PlaceInfo />
      <div className={styles.divider}></div> {/* 구분선 */}
      <PlaceContents />
    </div>
  );
}
