"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCTS } from "./queries";

export default function ProductList() {
  const { data } = useQuery(FETCH_PRODUCTS);
  console.log(data);

  const [filter, setFilter] = useState("all");

  const top3Services = [
    {
      id: 1,
      name: "서비스 1",
      tags: ["#디자인", "#로고"],
      price: "50,000원",
      image: "/images/service.jpg",
      likes: 120,
    },
    {
      id: 2,
      name: "서비스 2",
      tags: ["#마케팅", "#SNS"],
      price: "30,000원",
      image: "/images/service.jpg",
      likes: 85,
    },
    {
      id: 3,
      name: "서비스 3",
      tags: ["#번역", "#영어"],
      price: "40,000원",
      image: "/images/service.jpg",
      likes: 200,
    },
  ];

  const focusOnServices = [
    {
      id: 1,
      name: "포커스온 서비스 1",
      tags: ["#웹개발", "#React"],
      price: "20,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "작성자1", image: "/images/profile.png" },
      likes: 50,
    },
    {
      id: 2,
      name: "포커스온 서비스 2",
      tags: ["#그래픽디자인", "#UI/UX"],
      price: "30,000원",
      available: false,
      image: "/images/product.jpg",
      author: { name: "작성자2", image: "/images/profile.png" },
      likes: 75,
    },
    {
      id: 3,
      name: "포커스온 서비스 3",
      tags: ["#콘텐츠제작", "#영상"],
      price: "25,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "작성자3", image: "/images/profile.png" },
      likes: 30,
    },
    {
      id: 4,
      name: "포커스온 서비스 4",
      tags: ["#마케팅", "#브랜딩"],
      price: "35,000원",
      available: false,
      image: "/images/product.jpg",
      author: { name: "작성자4", image: "/images/profile.png" },
      likes: 100,
    },
    {
      id: 5,
      name: "포커스온 서비스 5",
      tags: ["#번역", "#일본어"],
      price: "40,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "작성자5", image: "/images/profile.png" },
      likes: 60,
    },
    {
      id: 6,
      name: "포커스온 서비스 6",
      tags: ["#IT컨설팅", "#클라우드"],
      price: "22,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "작성자6", image: "/images/profile.png" },
      likes: 45,
    },
    {
      id: 7,
      name: "포커스온 서비스 7",
      tags: ["#음악", "#작곡"],
      price: "28,000원",
      available: false,
      image: "/images/product.jpg",
      author: { name: "작성자7", image: "/images/profile.png" },
      likes: 80,
    },
    {
      id: 8,
      name: "포커스온 서비스 8",
      tags: ["#데이터분석", "#시각화"],
      price: "33,000원",
      available: true,
      image: "/images/product.jpg",
      author: { name: "작성자8", image: "/images/profile.png" },
      likes: 55,
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
        <h2>포커스온의 TOP3 서비스</h2>
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
                  <Heart size={20} />
                  <span>{service.likes}</span>
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
          {data?.fetchTravelProducts.map((service) => (
            <div key={service._id} className={styles.service_card}>
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
              <h3>{service.name}</h3>
              <div className={styles.tags}>
                {service.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.author_price}>
                <div className={styles.author}>
                  <Image
                    src={service.author.image}
                    alt={service.author.name}
                    width={25}
                    height={25}
                  />
                  <span>{service.author.name}</span>
                </div>
                <p className={styles.price}>{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
