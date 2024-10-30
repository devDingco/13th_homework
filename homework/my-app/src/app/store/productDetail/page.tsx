"use client";
import styles from "./style.module.css";
import { useState } from "react";

const ProductDetail = () => {
  const imageList = [
    "/image/sampleimg2.jpg",
    "/image/sampleimg2.jpg",
    "/image/sampleimg2.jpg",
  ];

  // 첫 번째 이미지가 처음에 표시되도록 설정
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleReplyToggle = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  return (
    <div className={styles.container}>
      {/* 상단 섹션: 이미지 및 판매자 정보 */}
      <div className={styles.topSection}>
        <div className={styles.leftSection}>
          <img
            src={selectedImage}
            alt="상품 이미지"
            className={styles.productImage}
          />
          <div className={styles.thumbnailList}>
            {imageList.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="썸네일"
                className={styles.imageThumbnail}
                onClick={() => handleImageSelect(image)}
              />
            ))}
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.priceContainer}>₩32,500원</div>
          <button className={styles.buyButton}>구매하기</button>
          <div className={styles.seller}>
            <img
              src="/images/seller-avatar.jpg"
              alt="판매자 아바타"
              className={styles.sellerAvatar}
            />
            <span className={styles.sellerName}>김상준</span>
          </div>
        </div>
      </div>

      {/* 하단 섹션: 상세 설명, 위치, 댓글 */}
      <div className={styles.bottomSection}>
        <div className={styles.description}>
          <h2 className={styles.sectionTitle}>상세 설명</h2>
          <p>
            이 의자는 모던한 감성을 자랑하며 편안함과 스타일을 모두 제공합니다.
          </p>
        </div>

        <div className={styles.location}>
          <h2 className={styles.sectionTitle}>상세 위치</h2>
          <div className={styles.mapContainer}>지도 표시 영역</div>
        </div>

        <div className={styles.commentSection}>
          <div className={styles.commentInputWrapper}>
            <input
              type="text"
              className={styles.commentInput}
              placeholder="문의사항을 입력해 주세요."
            />
            <button className={styles.commentSubmit}>문의하기</button>
          </div>

          <div className={styles.comment}>
            <div className={styles.commentHeader}>
              <span>김상준</span>
              <span>2024-10-30</span>
            </div>
            <p>이 상품은 정말 좋습니다!</p>

            <button onClick={handleReplyToggle}>답변하기</button>

            {isReplyOpen && (
              <div className={styles.replyInputWrapper}>
                <input
                  type="text"
                  className={styles.replyInput}
                  placeholder="답변을 입력해 주세요."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button className={styles.commentSubmit}>답변 남기기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
