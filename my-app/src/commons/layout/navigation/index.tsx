"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

export default function LayoutNavigation() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.navLeft}>
          <Link href="/boards">
            <div className={styles.logoSection}>
              <Image
                src="/images/logo.png"
                alt="페이지 로고"
                className={styles.logoIcon}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </Link>

          <div className={styles.navBar}>
            <div className={`${styles.navChoice} ${styles.navContents}`}>
              트립토크
            </div>
            <div className={styles.navContents}>숙박권 구매</div>
            <div className={styles.navContents}>마이 페이지</div>
          </div>
        </div>
        <div className={styles.navRight}>
          <div>
            <Image
              src="/images/profile1.png"
              alt="프로필 아이콘"
              className={styles.profileIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div>
            <Image
              src="/images/down_arrow.png"
              alt="아래화살표"
              className={styles.downArrow}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </main>
    </>
  );
}
