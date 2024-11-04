import Image from "next/image";
import styles from "./styles.module.css";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LayoutNavigation() {
  const router = useRouter();
  const navigationItem = ["트립토크", "숙박권 구매", "마이 페이지"];
  const [selectedItem, setSelectedItem] = useState(0);

  const onClickNavigationItem = (event: MouseEvent<HTMLInputElement>) => {
    const id = Number(event.currentTarget?.id);
    setSelectedItem(id);

    if (id === 0) router.push("/boards");
    // if (id === 1) router.push("/숙박권 구매!");
    if (id === 2) router.push("/mypage");
  };

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navigationLeftItemContainer}>
        <Image
          src="/assets/logo_area.png"
          alt="로고 이미지"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "56px", height: "32px" }}
        ></Image>
        <div className={styles.navigationItemContainer}>
          {navigationItem.map((el, index) => (
            <span
              key={el}
              id={String(index)}
              className={
                selectedItem === index
                  ? styles.navigationSelectedItem
                  : styles.navigationItem
              }
              onClick={onClickNavigationItem}
            >
              {el}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.profileContainer}>
        <button className={styles.profileButton}>
          <Image
            src="/assets/profile_icon.png"
            alt="프로필 이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "25px" }}
          ></Image>
        </button>
        <button className={styles.arrowDownButton}>
          <Image
            src="/assets/arrow_down.png"
            alt="프로필 이미지 더보기"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "7.5px" }}
          ></Image>
        </button>
      </div>
    </div>
  );
}
