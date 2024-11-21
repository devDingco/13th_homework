"use client";

import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Navigation() {
  return (
    <div className={styles.header}>
      <div className={styles.headerbox}>
        <div className={styles.leftbar}>
          <Image
            src="/icon/logo.png"
            alt="트립트립 로고"
            width={60}
            height={60}
            sizes="100vw"
          />
          <div className={styles.categoryNav}>
            <Link href="/boards">
              <button className={styles.triptalk}>트립토크</button>
            </Link>
            <Link href="/main">
              <button className={styles.reservation}>숙박권 구매</button>
            </Link>
            <Link href="/mypage">
              <button className={styles.mypageButton}>마이페이지</button>
            </Link>
          </div>
        </div>
        <div className={styles.personalNav}>
          <Link href="/">
            <button className={styles.toLoginButton}>
              로그인 <IoIosArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
