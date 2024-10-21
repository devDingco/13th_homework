"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";
import { DocumentData } from "firebase/firestore";

export default function MyPlanPage() {
  const [plans, setPlans] = useState<DocumentData[]>([]);
  const { fetchDocument } = FirebaseAPI();

  const getPlan = async () => {
    const result = await fetchDocument(CollectionList.plan);
    setPlans(result);
  };

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className={styles.cardListContainer}>
      {plans.map((el, index) => (
        <div key={index} className={styles.cardContainer}>
          <div className={styles.left}>
            <div className={styles.titleContainer}>
              <span className={styles.title}>{el.data.title}</span>
              <div className={styles.locationInfoContainer}>
                <div className={styles.locationInfo}>
                  출발지
                  <div>{el.data.departureLocation}</div>
                  <p className={styles.date}>{el.data.startDate}</p>
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
                  <div>{el.data.destination}</div>
                  <p className={styles.date}>{el.data.endDate}</p>
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
