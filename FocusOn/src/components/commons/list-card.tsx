import { MoreVertical } from "lucide-react";
import styles from "./styles.module.css";

export default function ListCard({ service }) {
  return (
    <>
      <div key={service.id} className={styles.service_item}>
        <div className={styles.image_container}>
          <img
            src={service.image}
            alt={service.name}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <div className={service.sold ? styles.sold : styles.sold_hidden}>
            판매 완료
          </div>
          <div className={styles.header}>
            <div>
              <h3 className={styles.title}>{service.name}</h3>
              <div className={styles.tags}>
                {service.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.author}>
            <img
              src={service.author.image}
              alt={service.author.name}
              className={styles.author_image}
            />
            <span className={styles.author_name}>{service.author.name}</span>
          </div>
        </div>
      </div>
    </>
  );
}
