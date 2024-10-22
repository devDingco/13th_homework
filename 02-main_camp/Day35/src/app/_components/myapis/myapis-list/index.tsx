import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { DocumentData } from "firebase/firestore";

interface IMyPlanListProps {
  data: DocumentData[];
}

export default function MyPlanList({ data }: IMyPlanListProps) {
  return (
    <div className={styles.cardListContainer}>
      {data.map((el, index) => (
        <div key={index} className={styles.cardContainer}>
          <div className={styles.left}>
            <div className={styles.titleContainer}>
              <span className={styles.title}>{el.title}</span>
              <div className={styles.locationInfoContainer}>
                <div className={styles.locationInfo}>
                  출발지
                  <div>{el.departureLocation}</div>
                  <p className={styles.date}>{el.startDate}</p>
                </div>
                <Image
                  src="/assets/air-plane.png"
                  alt="비행기 아이콘"
                  width={40}
                  height={40}
                  sizes={"100vw"}
                ></Image>
                <div className={styles.locationInfo}>
                  목적지
                  <div>{el.destination}</div>
                  <p className={styles.date}>{el.endDate}</p>
                </div>
              </div>
              <div className={styles.companionsContainer}>
                동행자
                <div>홍식 | 홍식 | 홍식 | 홍식</div>
              </div>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      ))}
    </div>
  );
}
