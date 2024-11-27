import Image from "next/image";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/asset/left_arrow.svg"
          width={24}
          height={24}
          alt="leftArrow"
        />
        <div className={styles.title}>플레이스 등록</div>
      </div>
    </div>
  );
}
