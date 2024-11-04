import React from "react";
import styles from "./styles.module.css";
import ListCard from "@/components/commons/list-card";

interface Author {
  name: string;
  image: string;
}

interface Service {
  id: number;
  name: string;
  tags: string[];
  price: string;
  available: boolean;
  image: string;
  author: Author;
}

const focusOnServices: Service[] = [
  {
    id: 1,
    name: "React 웹 개발",
    tags: ["웹개발", "React"],
    price: "20,000원",
    available: true,
    image: "/images/product.jpg",
    author: { name: "김개발", image: "/images/profile.png" },
  },
  {
    id: 2,
    name: "UI/UX 디자인",
    tags: ["그래픽디자인", "UI/UX"],
    price: "30,000원",
    available: false,
    image: "/images/product.jpg",
    author: {
      name: "이디자인",
      image: "/images/profile.png",
    },
  },
  {
    id: 3,
    name: "유튜브 영상 제작",
    tags: ["콘텐츠제작", "영상"],
    price: "25,000원",
    available: true,
    image: "/images/product.jpg",
    author: { name: "박영상", image: "/images/profile.png" },
  },
];

export default function WishList() {
  return (
    <div className={styles.container}>
      <h2>찜 목록</h2>
      <div className={styles.services_list}>
        {focusOnServices.map((service) => (
          <ListCard service={service} />
        ))}
      </div>
    </div>
  );
}
