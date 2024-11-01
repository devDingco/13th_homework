import Image from "next/image";
import styles from "./styles.module.css";
import { CaretDownOutlined } from "@ant-design/icons";

export default function NavigationPage() {
  return (
    <div className={styles.css_wrapper}>
      <nav className={styles.css_nav}>
        <section className={styles.css_navListBtn}>
          <Image
            src="/img/logo area.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.logo_image}
          />
          <button className={styles.css_navBtn}>트립토크</button>
          <button className={styles.css_navBtn}>숙박권구매</button>
          <button className={styles.css_navBtn}>마이페이지</button>
        </section>
        <section className={styles.css_navProfile}>
          <Image
            src="/img/profile.png"
            alt="profile"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.profile_image}
          />
          <CaretDownOutlined />
        </section>
      </nav>
    </div>
  );
}
