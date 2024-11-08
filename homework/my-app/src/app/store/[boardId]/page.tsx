"use client";

import { useParams } from "next/navigation";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Image from "next/image";
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

const TOGGLE_PRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`;

const BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
      name
      remarks
      contents
    }
  }
`;

const ProductDetail = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState("");

  const { data, loading, error } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { travelproductId: params.boardId },
  });

  const [togglePick] = useMutation(TOGGLE_PRODUCT_PICK, {
    variables: { travelproductId: params.boardId },
    refetchQueries: [
      {
        query: FETCH_TRAVEL_PRODUCT,
        variables: { travelproductId: params.boardId },
      },
    ],
  });

  const [buyProduct] = useMutation(BUYING_AND_SELLING, {
    variables: { useritemId: params.boardId },
    onCompleted: (data) => {
      console.log("구매 성공:", data);
    },
    onError: (error) => {
      console.error("구매 오류:", error);
      alert(error);
    },
  });

  const handleTogglePick = async () => {
    try {
      await togglePick();
    } catch (err) {
      console.error("스크랩 기능 오류:", err);
    }
  };
  const handlePurchase = async () => {
    try {
      await buyProduct();
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className={styles.topSection}>
        <div>
          <div className={styles.leftSection}>
            <div className={styles.productImageContainer}>
              <Image
                src={selectedImage}
                alt="상품 이미지"
                className={styles.productImage}
                fill /* 부모 컨테이너 안에서 동작 */
                sizes="(max-width: 768px) 100vw, 50vw" /* 반응형 크기 설정 */
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }} /* 전체 이미지 표시 및 가운데 정렬 */
              />
            </div>
            <div className={styles.thumbnailList}>
              {data?.fetchTravelproduct.images.map((image, index) => (
                <Image
                  key={index}
                  width={80}
                  height={80}
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
          <div className={styles.titleContainer}>
            <div className={styles.nameBookmarkContainer}>
              <div className={styles.title}>{data.fetchTravelproduct.name}</div>

              <button className={styles.overlay} onClick={handleTogglePick}>
                <Image
                  src="/image/bookmark.png"
                  width={18}
                  height={18}
                  alt="북마크아이콘"
                  className={styles.bookmarkIcon}
                />
                {data.fetchTravelproduct.pickedCount}
              </button>
            </div>
            <div className={styles.remarks}>
              {data.fetchTravelproduct.remarks}
            </div>
            <div className={styles.tags}>
              {data.fetchTravelproduct.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  #{tag}{" "}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.description}>
            {/* <h2 className={styles.sectionTitle}>상세 설명</h2> */}
            <div
              dangerouslySetInnerHTML={{
                __html: data?.fetchTravelproduct.contents,
              }}
            />
          </div>
          <div className={styles.priceContainer}>
            ₩{data?.fetchTravelproduct.price}원
          </div>
          <div className={styles.seller}>
            <Image
              src={
                data?.fetchTravelproduct.seller?.picture
                  ? `https://storage.googleapis.com/${data.fetchTravelproduct.seller.picture}`
                  : "/image/noProfile.webp"
              }
              alt="판매자 프로필"
              className={styles.sellerAvatar}
              width={0}
              height={0}
            />
            <span className={styles.sellerName}>
              {data?.fetchTravelproduct.seller.name}
            </span>
          </div>
          <button className={styles.buyButton} onClick={handlePurchase}>
            구매하기
          </button>
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
