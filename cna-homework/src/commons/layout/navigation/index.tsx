import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

interface NavigationProps {
  selectedTab: string;
  onClickTab: (tab: string) => void;
}
export default function Navigation({ selectedTab, onClickTab }: NavigationProps) {
  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.navigationContent}>
          <div className={styles.leftMenu}>
            <div className={styles.logoArea}>
              <Link href="/">
                <Image src="/images/logo.png" alt="logo" width={50} height={30} />
              </Link>
            </div>
            <div className={styles.menuArea}>
              <Link href="/boards">
                <span
                  onClick={() => onClickTab("트립토크")}
                  className={selectedTab === "트립토크" ? styles.activeTab : ""}
                >
                  트립토크
                </span>
              </Link>
              <Link href="/purchase">
                <span
                  onClick={() => onClickTab("숙박권구매")}
                  className={selectedTab === "숙박권구매" ? styles.activeTab : ""}
                >
                  숙박권 구매
                </span>
              </Link>
              <Link href="/mypage">
                <span
                  onClick={() => onClickTab("마이페이지")}
                  className={selectedTab === "마이페이지" ? styles.activeTab : ""}
                >
                  마이페이지
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.rightMenu}>
            <div className={styles.profileArea}>
              <Image src="/images/profile.png" alt="profile" width={25} height={25} />
            </div>
            <Image src="/images/down-arrow.png" alt="arrow" width={7} height={4} />
          </div>
        </div>
      </div>
    </>
  );
}
