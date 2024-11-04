"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  MessageCircle,
  Link2,
  Trash2,
  MapPin,
  Heart,
} from "lucide-react";
import styles from "./styles.module.css";
import ContactModal from "./contact-modal";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { FETCH_TRAVEL_PRODUCT, FETCH_TRAVEL_PRODUCT_QUESTION } from "./queries";

export default function ProductDetail() {
  // const params = useParams();
  // const productId = params.productId as string;
  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { productId: "672643b42093f700292fa8a8" },
  });
  const { data: questionData } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTION, {
    variables: { productId: "672643b42093f700292fa8a8" },
  });
  console.log(data);
  console.log(questionData);

  const [selectedImage, setSelectedImage] =
    React.useState("/images/design.jpg");
  const thumbnails = [
    "/images/design.jpg",
    "/images/thumbnail1.jpg",
    "/images/thumbnail2.jpg",
    "/images/thumbnail3.jpg",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title_section}>
          <div className={styles.title_icon_container}>
            <h1 className={styles.title}>프리미엄 로고 디자인</h1>
            <div className={styles.icon_container}>
              <Trash2 className={styles.icon} />
              <Link2 className={styles.icon} />
              <MapPin className={styles.icon} />
              <div className={styles.like_button}>
                <Heart size={20} className={styles.like_icon} />
                <span className={styles.like_text}>12</span>
              </div>
            </div>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>디자인</span>
            <span className={styles.tag}>로고</span>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.photo_box}>
          <div className={styles.main_image_container}>
            <Image
              src={selectedImage}
              alt="메인 제품 이미지"
              width={600}
              height={400}
              className={styles.main_image}
            />
          </div>
          <div className={styles.thumbnail_container}>
            {thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className={styles.thumbnail}
                onClick={() => setSelectedImage(thumbnail)}
              >
                <Image
                  src={thumbnail}
                  alt={`썸네일 ${index + 1}`}
                  width={100}
                  height={100}
                  className={styles.thumbnail_image}
                />
              </div>
            ))}
          </div>

          <div className={styles.description}>
            <h2 className={styles.section_title}>서비스 설명</h2>
            <p>
              프리미엄 로고 디자인 서비스는 고객님의 요구를 반영하여 개성 있는
              로고를 제작합니다. 창의적이고 전문적인 로고로 브랜드 가치를
              높여보세요.
            </p>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <div className={styles.price}>50,000원</div>
            <ul className={styles.warnings}>
              <li>포커스온에서 포인트 충전 후 구매하실 수 있습니다.</li>
              <li>상세 설명에 사용기한을 꼭 확인해 주세요.</li>
            </ul>
            <button className={styles.payment_button}>예약하기</button>
          </div>

          <div className={`${styles.card} ${styles.seller_card}`}>
            <div className={styles.seller_info}>
              <Image
                src="/images/profile.png"
                alt="판매자 프로필"
                width={64}
                height={64}
                className={styles.seller_image}
              />
              <div>
                <h3 className={styles.seller_name}>김디자인</h3>
                <p className={styles.seller_title}>로고 디자인 전문가</p>
              </div>
            </div>
            <a href="#" className={styles.portfolio_link}>
              <ExternalLink className={styles.icon} />
              포트폴리오 보기
            </a>
            <button className={styles.inquiry_button} onClick={toggleModal}>
              <MessageCircle className={styles.icon} />
              문의하기
            </button>
            {isModalOpen && (
              <ContactModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
