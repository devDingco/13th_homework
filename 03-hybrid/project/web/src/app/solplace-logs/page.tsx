"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Icon from "@/components/icon";
import ButtonFloatingAction from "@/components/button/button-floating-action";
import useSolplaceLogs from "./hook";
import Footer from "@/commons/layout/footer";
import Tabbar from "@/components/tabbar";

export interface ISampleData {
  id: number;
  name: string;
  contents: string;
  images: string[];
}

export const SAMPLE_DATA: ISampleData[] = [];

export default function SolPlaceLogsPage() {
  const { onClickCard, onClickFloatingActionButton } = useSolplaceLogs();

  return (
    <div className={styles.solplaceLogs__container}>
      {SAMPLE_DATA.length === 0 && (
        <div className={styles.empty}>
          <p>등록된 플레이스가 없습니다.</p>
        </div>
      )}
      <div className={styles.cardList__container}>
        {SAMPLE_DATA.map((el, index) => (
          <div
            key={`${el.name}__${index}`}
            className={styles.card}
            onClick={() => onClickCard(el)}
          >
            <Image
              // src={`https://storage.googleapis.com/${el.images[0]}`}
              src={el.images[0]}
              alt="이미지"
              width={0}
              height={0}
              sizes="100vw"
              className={styles.image}
            />

            <div className={styles.title}>
              <p className={styles.title__name}>{el.name}</p>
              <p className={styles.title__remark}>{el.contents}</p>
            </div>

            <div className={styles.location}>
              <Icon src="location.svg" width={1} height={1} />
              <p>서울시 용산구</p>
            </div>
          </div>
        ))}
      </div>
      <ButtonFloatingAction onClick={onClickFloatingActionButton} />
      <Footer isFixed={true}>
        <Tabbar />
      </Footer>
    </div>
  );
}
