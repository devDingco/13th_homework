"use client";
import { useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const router = useRouter(); // useRouter 훅 사용

  const menuClick = () => {
    setMenu(!menu);
    router.push("/boards");
  };

  const mypageClick = () => {
    router.push("/boards/mypage");
  };
  const loginClick = () => {
    router.push("/login");
  };

  return (
    <div className={styles.Container}>
      <div className={styles.menuContainer}>
        <div className={styles.menu} onClick={menuClick}>
          Co chokchok
        </div>
        <div className={styles.list}>Trip Talk!</div>
        <div className={styles.list}>숙박권 구매</div>
        <div className={styles.list} onClick={mypageClick}>
          My Page
        </div>
        <div className={styles.list} onClick={loginClick}>
          로그인
        </div>
      </div>
    </div>
  );
};

export default Navbar;
