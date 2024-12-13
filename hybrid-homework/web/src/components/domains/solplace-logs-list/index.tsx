"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import PlaceCard from "./place-card";
import Link from "next/link";
import Footer from "@/commons/layout/footer";
import { useQuery } from "@apollo/client";
import { FETCH_SOLPLACE_LOGS } from "./queries";

export default function SolplaceLogsList() {
  const { data } = useQuery(FETCH_SOLPLACE_LOGS);
  const placeData = data?.fetchSolplaceLogs || [];
  return (
    <>
      <main className={styles.container}>
        {placeData.length > 0 ? (
          <div className={styles.grid}>
            {placeData.map((place) => (
              <PlaceCard data={place} key={place.id} />
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
