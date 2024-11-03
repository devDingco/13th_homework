"use client";

import React from "react";
import { MoreVertical } from "lucide-react";

// CSS Module import
import styles from "./styles.module.css";

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
];

export default function FreelanceServicesList() {
  return (
    <div className={styles.container}>
      <div className={styles.services_list}>
        {focusOnServices.map((service) => (
          <div key={service.id} className={styles.service_item}>
            <div className={styles.image_container}>
              <img
                src={service.image}
                alt={service.name}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div>
                  <h3 className={styles.title}>{service.name}</h3>
                  <div className={styles.tags}>
                    {service.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className={styles.more_button}>
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className={styles.buttons}>
                <button className={styles.book_button}>상담 신청</button>
                <button className={styles.details_button}>상세 보기</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
