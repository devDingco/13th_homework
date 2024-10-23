import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className={styles.navigation_box}>
      <div className={styles.navigation}>
        <div className={styles.left_area}>
          <Image
            src="/images/logo.png"
            width={51.521}
            height={32}
            alt="로고이미지"
          />
          <Link href="/boards">
            <div className={styles.active_menu}>트립토크</div>
          </Link>
          <div className={styles.menu}>숙박권 구매</div>
          <div className={styles.menu}>마이 페이지</div>
        </div>
        <div className={styles.right_area}>
          <Image
            src="/images/profile.png"
            width={40}
            height={40}
            alt="프로필이미지"
          />
          <Image
            src="/images/down_arrow.png"
            width={24}
            height={24}
            alt="드롭다운"
          />
        </div>
      </div>
    </div>
  );
};
export default Navigation;
