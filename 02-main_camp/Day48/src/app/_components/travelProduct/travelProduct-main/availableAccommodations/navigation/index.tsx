import Image from "next/image";
import styles from "./styles.module.css";

import React from "react";

interface IAvailableAccommodationsNavigationItemProps {
  iconUrl: string;
  title: string;
}

const Accommodations = [
  {
    name: "1인 전용",
    url: "/assets/single_person.svg",
  },
  {
    name: "아파트",
    url: "/assets/apartment.svg",
  },
  {
    name: "호텔",
    url: "/assets/hotel.svg",
  },
  {
    name: "캠핑",
    url: "/assets/camp.svg",
  },
  {
    name: "룸 서비스 가능",
    url: "/assets/planterior.svg",
  },
  {
    name: "불멍",
    url: "/assets/fire.svg",
  },
  {
    name: "반신욕&스파",
    url: "/assets/spa.svg",
  },

  {
    name: "바다 위 숙소",
    url: "/assets/house_on_the_sea.svg",
  },
  {
    name: "플랜테리어",
    url: "/assets/planterior.svg",
  },
];

export default function AvailableAccommodationsNavigation() {
  return (
    <div className={styles.navigation__container}>
      {Accommodations.map((el, index) => (
        <div className={styles.item__container} key={index}>
          <Image
            src={el.url}
            alt={`${el.name} 아이콘`}
            width={40}
            height={40}
          />
          <p>{el.name}</p>
        </div>
      ))}
    </div>
  );
}
