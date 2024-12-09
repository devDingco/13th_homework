"use client";

import styles from "./styles.module.css";
import { Navigation } from "@/components/commons/navigation";
import { FOOTER_OPTIONS } from "./constants";

import { useParams, usePathname } from "next/navigation";
import { ButtonPrimaryMFull } from "@/components/commons/button";

interface IFooter {
  buttonText?: string;
}

export default function Footer({ buttonText }: IFooter) {
  const pathname = usePathname();
  const params = useParams();
  const options = FOOTER_OPTIONS(params)[pathname];

  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer
        className={`${styles.footer} ${options.isFixed ? styles.fixed : ""}`}
      >
        {options.isButton && (
          <div className={styles.button}>
            <ButtonPrimaryMFull>{buttonText}</ButtonPrimaryMFull>
          </div>
        )}
        {options.isNav && <Navigation />}
      </footer>
    </>
  );
}
