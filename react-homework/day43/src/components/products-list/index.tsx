"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import styles from "./styles.module.css";

export default function ProductsList() {
  const [filter, setFilter] = useState("all");

  const top3Services = [
    {
      id: 1,
      name: "프리미엄 로고 디자인",
      tags: ["디자인", "로고"],
      price: "50,000원",
      image: "/images/beach.jpg",
      likes: 120,
      rating: 4.8,
    },
    {
      id: 2,
      name: "SNS 마케팅 패키지",
      tags: ["마케팅", "SNS"],
      price: "30,000원",
      image: "/images/beach.jpg",
      likes: 85,
      rating: 4.5,
    },
    {
      id: 3,
      name: "전문 영어 번역 서비스",
      tags: ["번역", "영어"],
      price: "40,000원",
      image: "/images/beach.jpg",
      likes: 200,
      rating: 4.9,
    },
  ];

  const focusOnServices = [
    {
      id: 1,
      name: "React 웹 개발",
      tags: ["웹개발", "React"],
      price: "20,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "김개발", image: "/images/profile.png" },
      likes: 50,
      rating: 4.7,
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
      likes: 75,
      rating: 4.6,
    },
    {
      id: 3,
      name: "유튜브 영상 제작",
      tags: ["콘텐츠제작", "영상"],
      price: "25,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "박영상", image: "/images/profile.png" },
      likes: 30,
      rating: 4.4,
    },
    {
      id: 4,
      name: "브랜드 마케팅 전략",
      tags: ["마케팅", "브랜딩"],
      price: "35,000원",
      available: false,
      image: "/images/product.jpg",
      author: {
        name: "최마케팅",
        image: "/images/profile.png",
      },
      likes: 100,
      rating: 4.8,
    },
    {
      id: 5,
      name: "일본어 통번역",
      tags: ["번역", "일본어"],
      price: "40,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "정번역", image: "/images/profile.png" },
      likes: 60,
      rating: 4.9,
    },
    {
      id: 6,
      name: "클라우드 IT 컨설팅",
      tags: ["IT컨설팅", "클라우드"],
      price: "22,000원",
      available: true,
      image: "/images/product.jpg",
      author: {
        name: "강컨설팅",
        image: "/images/profile.png",
      },
      likes: 45,
      rating: 4.5,
    },
    {
      id: 7,
      name: "작곡 및 편곡",
      tags: ["음악", "작곡"],
      price: "28,000원",
      available: false,
      image: "/images/product.jpg",
      author: { name: "송작곡", image: "/images/profile.png" },
      likes: 80,
      rating: 4.7,
    },
    {
      id: 8,
      name: "데이터 시각화",
      tags: ["데이터분석", "시각화"],
      price: "33,000원",
      available: true,
      image: "/images/product.jpg",
      author: {
        name: "한데이터",
        image: "/images/profile.png",
      },
      likes: 55,
      rating: 4.6,
    },
  ];

  const filteredServices = focusOnServices.filter(
    (service) =>
      filter === "all" ||
      (filter === "available" && service.available) ||
      (filter === "unavailable" && !service.available)
  );

  return (
    <div className={styles.container}>
      <section className={styles.top3_section}>
        <h2>포커스온 인기 TOP3 서비스</h2>
        <div className={styles.top3_list}>
          {top3Services.map((service) => (
            <div key={service.id} className={styles.top3_item}>
              <div className={styles.top3_image_container}>
                <Image
                  src={service.image}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={styles.like_button}>
                  <Heart size={20} className={styles.like_icon} />
                  <span>{service.likes}</span>
                </div>
              </div>
              <div className={styles.top3_content}>
                <h3>{service.name}</h3>
                <div className={styles.tags}>
                  {service.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className={styles.price}>{service.price}</p>
                <div className={styles.rating}>
                  <Star size={16} fill="#E78B8D" color="#E78B8D" />
                  <span>{service.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.focus_on_services}>
        <h2>포커스온만의 서비스</h2>
        <div className={styles.filter_menu}>
          <button
            className={`${styles.filter_button} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => setFilter("all")}
          >
            전체 보기
          </button>
          <button
            className={`${styles.filter_button} ${
              filter === "available" ? styles.active : ""
            }`}
            onClick={() => setFilter("available")}
          >
            예약 가능
          </button>
          <button
            className={`${styles.filter_button} ${
              filter === "unavailable" ? styles.active : ""
            }`}
            onClick={() => setFilter("unavailable")}
          >
            예약 마감
          </button>
        </div>
        <div className={styles.service_grid}>
          {filteredServices.map((service) => (
            <div key={service.id} className={styles.service_card}>
              <div className={styles.service_image_container}>
                <Image
                  src={service.image}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={styles.like_button}>
                  <Heart size={20} />
                  <span>{service.likes}</span>
                </div>
              </div>
              <div className={styles.service_content}>
                <h3>{service.name}</h3>
                <div className={styles.tags}>
                  {service.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className={styles.price}>{service.price}</p>
                <div className={styles.service_footer}>
                  <div className={styles.author}>
                    <Image
                      src={service.author.image}
                      alt={service.author.name}
                      width={24}
                      height={24}
                    />
                    <span>{service.author.name}</span>
                  </div>
                  <div className={styles.rating}>
                    <Star size={16} fill="#E78B8D" color="#E78B8D" />
                    <span>{service.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
