"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "../constants";

export default function Header() {
  const pathname = usePathname();
  const options = HEADER_OPTIONS.GLOBAL[pathname];

  return (
    <div className={styles.header}>
      <header className={styles.header}>
        {options.hasBack && (
          <Image
            src="/asset/left_arrow.svg"
            width={24}
            height={24}
            alt="leftArrow"
          />
        )}
        {options.title ? (
          <div className={styles.title}>{options.title}</div>
        ) : (
          <></>
        )}
      </header>
    </div>
  );
}
