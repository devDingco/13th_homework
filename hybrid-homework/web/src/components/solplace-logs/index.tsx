import Image from "next/image";
import styles from "./styles.module.css";

export default function SolplaceLogs() {
  return (
    <main className={styles.container}>
      <div>
        <div className={styles.card}>
          <Image
            src="/asset/default1.jpeg"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.image}
            alt="cardImage"
          />
          <div className={styles.title}>
            <div></div>
            <div className={styles.address}>
              <Image
                className={styles.icon16}
                src="/asset/location_icon.svg"
                width={0}
                height={0}
                sizes="100vw"
                alt="location_icon"
              />
              <div>서울시 용산구</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
