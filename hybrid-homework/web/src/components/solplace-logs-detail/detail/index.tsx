"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import SolplaceMap from "@/components/commons/solplace-map";

export default function SolplaceLogsDetail() {
  // 지도 보기 상태
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  // 지도 토글
  const toggleLocation = () => {
    setIsLocationOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <div className={styles.detailInfo}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>Bramble & Brioche 한남점</div>
            <Image
              className={styles.icon24}
              src="/asset/edit.svg"
              width={0}
              height={0}
              sizes="100vw"
              alt="add"
            />
          </div>

          <div className={styles.locationArea}>
            <div className={styles.location}>
              <div className={styles.address}>
                <Image
                  className={styles.icon16}
                  src="/asset/location_icon.svg"
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
                      ? "/asset/up_arrow.svg"
                      : "/asset/down_arrow.svg"
                  }
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="downArrow"
                />
              </div>
            </div>
            {isLocationOpen && <SolplaceMap lat={37.5665} lng={126.978} />}
          </div>
        </div>
        <div className={styles.divider}></div> {/* 구분선 */}
        <div className={styles.contents}>
          <div>
            Bramble & Brioche는 하루를 천천히 시작하고 싶은 사람들을 위한 아늑한
            브런치 카페예요. 바쁜 일상에서 잠깐 벗어나, 따뜻한 공간에서 여유를
            느끼고 싶다면 이곳이 제격이에요.
          </div>
          <div>
            이곳에서는 누구든 부담 없이 와서 편하게 시간을 보낼 수 있어요. 혼자
            책을 읽거나 친구와 담소를 나누기에도 딱 좋죠. 브리오쉬는 매일
            신선하게 구워지고, 상큼한 브램블 베리 잼과 함께라면 기분까지
            상쾌해질 거예요.
          </div>

          <div>
            특별할 것 없는 평범한 하루를 조금 더 특별하게 만들고 싶을 때,
            Bramble & Brioche가 그 순간을 채워줄 거예요. 인테리어도 감성적이고
            따뜻해서, 그냥 앉아 있기만 해도 힐링되는 공간이에요.
          </div>

          <div>
            언제든지 오세요. 이곳에서 당신만의 시간을 편안하게 즐길 수 있어요.
            따뜻한 브런치 한 접시가 기다리고 있어요.
          </div>
        </div>
      </div>
    </div>
  );
}
