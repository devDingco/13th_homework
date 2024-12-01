import Image from "next/image";
import styles from "./styles.module.css";
import { PLACE_DATA } from "./constans";
import PlaceCard from "./place-card";
import { Footer } from "@/commons/layout/footer";
import Link from "next/link";

export default function SolplaceLogsList() {
  return (
    <>
      <main className={styles.container}>
        {PLACE_DATA.length > 0 ? (
          <div className={styles.grid}>
            {PLACE_DATA.map((data) => (
              <PlaceCard data={data} key={data.id} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              등록된 플레이스가
              <br />
              없습니다.
            </p>
          </div>
        )}

        <Link href="/solplace-logs/new" className={styles.floatingButton}>
          <Image
            src="/assets/add_white.svg"
            width={0}
            height={0}
            sizes="100vw"
            alt="add"
            className={styles.add}
          />
        </Link>
      </main>
      <Footer />
    </>
  );
}
