"use client";

import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";

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
            <button className={styles.triptalk}>트립토크</button>
            <button className={styles.reservation}>숙박권 구매</button>
            <Link href="/mypage">
              <button className={styles.mypageButton}>마이페이지</button>
            </Link>
          </div>
        </div>
        <div className={styles.personalNav}>
          <button className={styles.profileButton}>
            <Image
              src="/icon/profile_img.png"
              alt="회원 프로필"
              width={40}
              height={40}
              sizes="100vw"
            />
          </button>
          <button className={styles.dropdownButton}>
            <Image
              src="/icon/down_arrow.svg"
              alt="드롭다운"
              width={24}
              height={24}
              sizes="100vw"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
