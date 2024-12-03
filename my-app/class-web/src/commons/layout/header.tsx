"use client";

import { LeftOutlined } from "@ant-design/icons";
import styles from "./header.styles.module.css";
import { usePathname } from "next/navigation";
import { HEADER_OPTIOS } from "./constants";

export default function HeaderGlobal() {
  const pathname = usePathname();

  const options = HEADER_OPTIOS.GLOBAL[pathname]; //{title: "플레이스 등록", hasLogo: false}
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        {options.hasBack && <LeftOutlined />}
        {options.title ? <span>{options.title}</span> : <></>}
      </header>
    </main>
  );
}
