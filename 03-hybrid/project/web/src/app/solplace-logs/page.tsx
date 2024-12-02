"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Icon from "@/components/icon";
import ButtonFloatingAction from "@/components/button/button-floating-action";
import { useRouter } from "next/navigation";
import useSolplaceLogs from "./hook";

const SAMPLE_DATA = [
  {
    name: "오브레크 경주",
    remark: "티라미수에 밤보다 더 어울리는",
    image: "/assets/solplace_sample2.svg",
  },
  {
    name: "Bramble & Brioche 한남점",
    remark: "한국에서 느낄 수 없었던 영국 감성의",
    image: "/assets/solplace_sample1.svg",
  },
  {
    name: "미드나잇 딤섬",
    remark: "너무 편안한 분위기의 딤섬 맛집입니다",
    image: "/assets/solplace_sample3.svg",
  },
  {
    name: "모찌 비주",
    remark: "세상에 없던 찹쌀떡 맛집",
    image: "/assets/solplace_sample4.svg",
  },
  {
    name: "오브레크 경주",
    remark: "티라미수에 밤보다 더 어울리는",
    image: "/assets/solplace_sample2.svg",
  },
  {
    name: "Bramble & Brioche 한남점",
    remark: "한국에서 느낄 수 없었던 영국 감성의",
    image: "/assets/solplace_sample1.svg",
  },
  {
    name: "미드나잇 딤섬",
    remark: "너무 편안한 분위기의 딤섬 맛집입니다",
    image: "/assets/solplace_sample3.svg",
  },
  {
    name: "모찌 비주",
    remark: "세상에 없던 찹쌀떡 맛집",
    image: "/assets/solplace_sample4.svg",
  },
];

export default function SolPlaceLogsPage() {
  const { onClickCard } = useSolplaceLogs();

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
            onClick={onClickCard}
          >
            <Image
              src={el.image}
              alt="이미지"
              width={0}
              height={0}
              sizes="100vw"
              className={styles.image}
            />

            <div className={styles.title}>
              <p className={styles.title__name}>{el.name}</p>
              <p className={styles.title__remark}>{el.remark}</p>
            </div>

            <div className={styles.location}>
              <Icon src="location.svg" width={1} height={1} />
              <p>서울시 용산구</p>
            </div>
          </div>
        ))}
      </div>
      <ButtonFloatingAction />
    </div>
  );
}
