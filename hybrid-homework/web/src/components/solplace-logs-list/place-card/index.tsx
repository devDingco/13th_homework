import Image from "next/image";
import styles from "./styles.module.css";

export default function PlaceCard({ data }) {
  return (
    <div className={styles.card} key={data.id}>
      <Image
        src={data.image}
        width={0}
        height={0}
        sizes="100vw"
        className={styles.image}
        alt="cardImage"
      />
      <div className={styles.contents}>
        <div className={styles.info}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.description}>{data.description}</div>
        </div>
        <div className={styles.address}>
          <Image
            className={styles.icon16}
            src="/asset/location_icon.svg"
            width={0}
            height={0}
            sizes="100vw"
            alt="location_icon"
          />
          <div className={styles.addressTitle}>{data.address}</div>
        </div>
      </div>
    </div>
  );
}
