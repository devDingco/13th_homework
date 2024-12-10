import SolplaceMap from "@/components/commons/solplace-map";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function PlaceInfo() {
  const center = { lat: 37.5665, lng: 126.978 };
  const { solplaceLogId } = useParams();
  // 지도 보기 상태
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  // 지도 토글
  const toggleLocation = () => {
    setIsLocationOpen((prev) => !prev);
  };

  return (
    <div className={styles.detailInfo}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Bramble & Brioche 한남점</div>
        <Link href={`/solplace-logs/${solplaceLogId}/edit`}>
          <Image
            className={styles.icon24}
            src="/assets/edit.svg"
            width={0}
            height={0}
            sizes="100vw"
            alt="add"
          />
        </Link>
      </div>

      <div className={styles.locationArea}>
        <div className={styles.location}>
          <div className={styles.address}>
            <Image
              className={styles.icon16}
              src="/assets/location_icon.svg"
              width={0}
              height={0}
              sizes="100vw"
              alt="location"
            />
            <div className={styles.addressTitle}>
              서울특별시 용산구 이태원로49길 24-14
            </div>
          </div>

          <div className={styles.dropdown} onClick={toggleLocation}>
            <div>지도 {isLocationOpen ? "접기" : "보기"}</div>
            <Image
              className={styles.icon24}
              src={
                isLocationOpen
                  ? "/assets/up_arrow.svg"
                  : "/assets/down_arrow.svg"
              }
              width={0}
              height={0}
              sizes="100vw"
              alt="downArrow"
            />
          </div>
        </div>
        {isLocationOpen && <SolplaceMap center={center} />}
      </div>
    </div>
  );
}
