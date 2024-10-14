"use client";

import { usePathname } from "next/navigation";
import LayoutNavigation from "./navigation";
import LayoutBanner from "./banner";
import styles from "./styles.module.css";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();

  return (
    <div className={styles.layoutContainer}>
      <LayoutNavigation />
      <LayoutBanner />
    </div>
  );
}
