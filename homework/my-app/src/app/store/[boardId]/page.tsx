"use client";
import { useParams, useRouter } from "next/navigation";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Image from "next/image";
import Comment from "@/components/store-comment-write";
import { Router } from "next/router";
import KakaoMap from "@/components/kakao-map/page";

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
  const router = useRouter();
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("brown");
  const [selectedSize, setSelectedSize] = useState("M");

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
      alert("구매 성공");
      router.push("/mypage");
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
  const address = data?.fetchTravelproduct?.travelproductAddress?.address;
  const addressDetail =
    data?.fetchTravelproduct?.travelproductAddress?.addressDetail;

  return (
    <div className={styles.container}>
      <div className={styles.productGrid}>
        {/* Left Section - Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageContainer}>
            <Image
              src={selectedImage || "/api/placeholder/600/600"}
              alt="상품 이미지"
              className={styles.mainImage}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.thumbnailGrid}>
            {data?.fetchTravelproduct.images.map((image, index) => (
              <div key={index} className={styles.thumbnailContainer}>
                <Image
                  src={`https://storage.googleapis.com/${image}`}
                  alt={`썸네일 ${index + 1}`}
                  className={styles.thumbnail}
                  width={150}
                  height={150}
                  onClick={() => handleImageSelect(image)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className={styles.productInfo}>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>{data.fetchTravelproduct.name}</h1>
              <button
                className={styles.bookmarkButton}
                onClick={handleTogglePick}
              >
                <Image
                  src="/image/bookmark.png"
                  width={18}
                  height={18}
                  alt="북마크아이콘"
                  className={styles.bookmarkIcon}
                />
                <span>{data.fetchTravelproduct.pickedCount}</span>
              </button>
            </div>
            <p className={styles.remarks}>{data.fetchTravelproduct.remarks}</p>
            <div className={styles.tags}>
              {data.fetchTravelproduct.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.accordionContainer}>
            <details className={`${styles.accordion}`} open>
              <summary className={styles.accordionTitle}>상세 정보</summary>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.fetchTravelproduct.contents,
                }}
              />
            </details>
            <details className={`${styles.accordion}`} open>
              <summary className={styles.accordionTitle}>상세 위치</summary>
              <div>
                {address} {addressDetail}
              </div>
            </details>
            {/* 
            <details className={styles.accordion}>
              <summary className={styles.accordionTitle}>배송 정보</summary>
              <div className={styles.accordionContent}>
                {data?.fetchTravelproduct.travelproductAddress.address}
              </div>
            </details> */}
          </div>
          {/* Price and Seller Info */}
          <div className={styles.priceSection}>
            <p className={styles.price}>
              ₩{data?.fetchTravelproduct.price.toLocaleString()}
            </p>
          </div>

          <div className={styles.sellerInfo}>
            <Image
              src={
                data?.fetchTravelproduct.seller?.picture
                  ? `https://storage.googleapis.com/${data.fetchTravelproduct.seller.picture}`
                  : "/image/noProfile.webp"
              }
              alt="판매자 프로필"
              className={styles.sellerAvatar}
              width={40}
              height={40}
            />

            <span className={styles.sellerName}>
              {data?.fetchTravelproduct.seller.name}
            </span>
          </div>

          {/* Purchase Button */}
          <button className={styles.purchaseButton} onClick={handlePurchase}>
            구매하기
          </button>
        </div>
      </div>

      {/* Bottom Section - Map and Comments */}
      <div className={styles.bottomSection}>
        <div className={styles.location}>
          <h2 className={styles.sectionTitle}>상세 위치</h2>
          <div>
            {address} {addressDetail}
          </div>
          <div className={styles.mapContainer}>
            <KakaoMap
              address={address}
              apiKey={process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || ""}
            />
          </div>
        </div>
        <Comment />
      </div>
    </div>
  );
};

export default ProductDetail;
