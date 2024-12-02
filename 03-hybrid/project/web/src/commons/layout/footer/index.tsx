import React from "react";
import styles from "./styles.module.css";

interface IFooterProps {
  children: React.ReactNode;
  isFixed?: boolean;
}

export default function Footer({ children, isFixed = false }: IFooterProps) {
  return (
    <>
      <footer
        className={styles.footer}
        style={{
          position: isFixed ? "fixed" : "relative",
          ...(isFixed ? { bottom: 0 } : {}),
        }}
      >
        {children}
      </footer>
      <div style={{ height: "4.75rem" }}></div>
    </>
  );
}
