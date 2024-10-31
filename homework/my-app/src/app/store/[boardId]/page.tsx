"use client";
import { useParams } from "next/navigation";
import styles from "./style.module.css";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

// GraphQL 쿼리 정의
const FETCH_TRAVEL_PRODUCT = gql`
  query FetchTravelProduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
        deletedAt
      }
      buyer {
        picture
        deletedAt
      }
      seller {
        picture
        deletedAt
      }
      soldAt
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const ProductDetail = () => {
  const params = useParams();

  // 이미지 및 댓글 상태 초기화
  const [selectedImage, setSelectedImage] = useState("");
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  // GraphQL 쿼리로 데이터 가져오기
  const { data, loading, error } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { travelproductId: params.boardId },
  });

  // 첫 번째 이미지로 기본 선택
  useState(() => {
    if (data?.fetchTravelproduct.images.length > 0) {
      setSelectedImage(
        `https://storage.googleapis.com/${data.fetchTravelproduct.images[0]}`
      );
    }
  }, [data]);

  // 이미지 선택 핸들러
  const handleImageSelect = (image) => {
    setSelectedImage(`https://storage.googleapis.com/${image}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      {/* 상단 섹션: 이미지 및 판매자 정보 */}
      <div className={styles.topSection}>
        <div className={styles.leftSection}>
          <img
            src={selectedImage || "/images/default-image.jpg"}
            alt="상품 이미지"
            className={styles.productImage}
          />
          <div className={styles.thumbnailList}>
            {data?.fetchTravelproduct.images.map((image, index) => (
              <img
                key={index}
                src={`https://storage.googleapis.com/${image}`} // 이미지 URL 앞에 경로 추가
                alt="썸네일"
                className={styles.imageThumbnail}
                onClick={() => handleImageSelect(image)} // 클릭 시 메인 이미지로 설정
              />
            ))}
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.priceContainer}>
            ₩{data?.fetchTravelproduct.price}원
          </div>
          <button className={styles.buyButton}>구매하기</button>
          <div className={styles.seller}>
            <img
              src={
                data?.fetchTravelproduct.seller.picture ||
                "/images/default-avatar.jpg"
              }
              alt="판매자 프로필"
              className={styles.sellerAvatar}
            />
            <span className={styles.sellerName}>
              {data?.fetchTravelproduct.name}
            </span>
          </div>
        </div>
      </div>

      {/* 하단 섹션: 상세 설명, 위치, 댓글 */}
      <div className={styles.bottomSection}>
        <div className={styles.description}>
          <h2 className={styles.sectionTitle}>상세 설명</h2>
          <p>{data?.fetchTravelproduct.contents}</p>
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
              <span></span>
              <span>2024-10-30</span>
            </div>
            <p>이 상품은 정말 좋습니다!</p>
            <button>답변하기</button>
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
