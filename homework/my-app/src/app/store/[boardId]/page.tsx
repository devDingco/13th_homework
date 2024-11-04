"use client";

import { useParams } from "next/navigation";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { stubArray } from "lodash";
import Comment from "@/components/store-comment-write";

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
        _id
        email
        name
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
  const [selectedImage, setSelectedImage] = useState("");

  const { data, loading, error } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { travelproductId: params.boardId },
  });

  useEffect(() => {
    if (data?.fetchTravelproduct.images?.length > 0) {
      setSelectedImage(
        `https://storage.googleapis.com/${data.fetchTravelproduct.images[0]}`
      );
    }
  }, [data]);

  const handleImageSelect = (image) => {
    setSelectedImage(`https://storage.googleapis.com/${image}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{data.fetchTravelproduct.name}</div>
        <div className={styles.remarks}>{data.fetchTravelproduct.remarks}</div>
        <div className={styles.tags}>
          {data.fetchTravelproduct.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}{" "}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.topSection}>
        <div>
          <div className={styles.leftSection}>
            <Image
              width={500}
              height={500}
              src={selectedImage}
              alt="상품 이미지"
              className={styles.productImage}
            />
            <div className={styles.thumbnailList}>
              {data?.fetchTravelproduct.images.map((image, index) => (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  src={`https://storage.googleapis.com/${image}`}
                  alt="썸네일"
                  className={styles.imageThumbnail}
                  onClick={() => handleImageSelect(image)}
                />
              ))}
            </div>
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
                data?.fetchTravelproduct.seller?.picture
                  ? `https://storage.googleapis.com/${data.fetchTravelproduct.seller.picture}`
                  : "/image/noProfile.webp"
              }
              alt="판매자 프로필"
              className={styles.sellerAvatar}
            />
            <span className={styles.sellerName}>
              {data?.fetchTravelproduct.seller.name}
            </span>
          </div>
          <div className={styles.description}>
            <h2 className={styles.sectionTitle}>상세 설명</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.fetchTravelproduct.contents,
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.location}>
          <h2 className={styles.sectionTitle}>상세 위치</h2>
          <div className={styles.mapContainer}>지도 표시 영역</div>
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default ProductDetail;
