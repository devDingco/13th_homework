"use client";

import React, { useEffect, useState } from "react";
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
import Dompurify from "dompurify";
import ContactModal from "./contact-modal";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_TRAVEL_PRODUCT_PICK, FETCH_TRAVEL_PRODUCT } from "./queries";
import KakaoMap from "../../commons/kakao-map";

export default function ProductDetail() {
  const params = useParams();
  const productId = params.productId as string;
  const [mapPosition, setMapPosition] = useState(null);

  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { productId },
  });
  console.log(data);

  // data가 로드된 후 카카오맵 초기화
  useEffect(() => {
    if (data?.fetchTravelproduct?.travelproductAddress) {
      setMapPosition({
        lat: data.fetchTravelproduct.travelproductAddress.lat,
        lng: data.fetchTravelproduct.travelproductAddress.lng,
      });
    }
  }, [data]);

  // 찜버튼
  const [toggleTravelproductPick] = useMutation(TOGGLE_TRAVEL_PRODUCT_PICK, {
    refetchQueries: [{ query: FETCH_TRAVEL_PRODUCT, variables: { productId } }],
  });

  const [isPicked, setIsPicked] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleWishlist = async () => {
    try {
      const result = await toggleTravelproductPick({
        variables: { travelproductId: productId },
      });
      console.log("pick result", result);
    } catch (error) {
      console.error(error);
    }
    setIsPicked(!isPicked);

    console.log(
      `Product ${productId} ${isPicked ? "removed from" : "added to"} wishlist`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_section}>
        <div className={styles.title_icon_container}>
          <h1 className={styles.title}>{data?.fetchTravelproduct?.name}</h1>
          <div className={styles.icon_container}>
            <Trash2 className={styles.icon} />
            <Link2 className={styles.icon} />
            <MapPin className={styles.icon} />
            <button
              onClick={toggleWishlist}
              className={`${styles.picked_button} ${
                isPicked ? styles.picked : ""
              }`}
            >
              <Heart
                className={`${styles.icon} ${
                  isPicked ? styles.icon_picked : styles.icon_not_picked
                }`}
              />
              <span className={styles.picked_count}>
                {data?.fetchTravelproduct?.pickedCount}
              </span>
            </button>
          </div>
        </div>
        <div className={styles.remarks}>
          {data?.fetchTravelproduct?.remarks}
        </div>
        <div className={styles.tags}>
          {/* TODO: tag 없을 때도 처리해야 함 */}
          {data?.fetchTravelproduct?.tags.map((tag, index) => (
            <span key={`${tag}_${index}`} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        {/* 사진 */}
        <div className={styles.photo_box}>
          <div className={styles.mainImageContainer}>
            <Image
              src={`https://storage.googleapis.com/${data?.fetchTravelproduct.images[selectedImage]}`}
              alt="Main gallery image"
              className={styles.mainImage}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw"
              priority
            />
          </div>
          <div className={styles.thumbnailContainer}>
            {data?.fetchTravelproduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`${styles.thumbnailButton} ${
                  selectedImage === index ? styles.selected : ""
                }`}
              >
                <Image
                  src={`https://storage.googleapis.com/${image}`}
                  alt={`Gallery thumbnail ${index + 1}`}
                  className={styles.thumbnailImage}
                  fill
                  sizes="(max-width: 768px) 20vw, 100px"
                />
              </button>
            ))}
          </div>

          {/* 서비스 설명 */}
          <div className={styles.description}>
            <h2 className={styles.section_title}>서비스 설명</h2>
            {typeof window !== "undefined" ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: Dompurify.sanitize(data?.fetchTravelproduct.contents),
                }}
              />
            ) : (
              <div></div>
            )}
          </div>

          {/* 지도 */}
          <div className={styles.map}>
            <h2 className={styles.section_title}>상세 위치</h2>
            {mapPosition && (
              <KakaoMap lat={mapPosition.lat} lng={mapPosition.lng} />
            )}
          </div>
        </div>

        {/* 사이드 바 */}
        <div className={styles.sidebar}>
          <div className={styles.card}>
            <div className={styles.price}>
              {data?.fetchTravelproduct.price.toLocaleString("ko-KR")}원
            </div>
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
                <h3 className={styles.seller_name}>
                  {data?.fetchTravelproduct?.seller.name}
                </h3>
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
