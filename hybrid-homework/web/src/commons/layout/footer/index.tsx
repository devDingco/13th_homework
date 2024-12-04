"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();
  const isPlace = pathname === "/solplace-logs";

  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer className={styles.footer}>
        <div className={styles.navigation}>
          <Link
            href="/solplace-logs"
            className={isPlace ? styles.itemActive : styles.item}
          >
            <Image
              className={styles.icon}
              src={`/assets/location${isPlace ? "_active" : ""}.svg`}
              width={0}
              height={0}
              alt="item_loaction"
            />
            <p>플레이스</p>
          </Link>

          <Link
            href="/mypages"
            className={isPlace ? styles.item : styles.itemActive}
          >
            <Image
              className={styles.icon}
              src={`/assets/mypage${isPlace ? "" : "_active"}.svg`}
              width={0}
              height={0}
              alt="item_mypage"
            />
            <p>내 설정</p>
          </Link>
        </div>
      </footer>
    </>
  );
}
