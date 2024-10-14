"use client";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function NavigationPage() {
  const router = useRouter();
  const onClickMain = () => {
    router.push("../../../../boards");
  };
  return (
    <>
      <div className={styles.css_navbox}>
        <div className={styles.css_nav}>
          <div className={styles.css_navbutton}>
            <div className={styles.css_logo}>
              <Image
                src="/logo192.png"
                alt="logo"
                width={40}
                height={20}
                sizes="100vw"
                onClick={onClickMain}
              />
            </div>
            <div className={styles.css_tap}>
              <div className={styles.css_tap1}>탭 1</div>
              <div className={styles.css_tap2}>탭 2</div>
              <div className={styles.css_tap3}>탭 3</div>
            </div>
          </div>

          <div className={styles.css_user}>
            <Image
              src="/assets/Profile.png"
              alt="user"
              width={30}
              height={10}
              sizes="100vw"
            />
            <Image
              src="/assets/Down_arrow.png"
              alt="arrow"
              width={30}
              height={20}
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}
