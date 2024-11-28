"use client";

import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Pagination from "@/components/boards-list/pagination";
import StoreSearchBar from "@/components/store-list/search";
import styles from "./style.module.css";

// GraphQL Queries & Mutations
const FETCH_TRAVEL_PRODUCTS = gql`
  query FetchTravelProducts1($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      price
      images
      pickedCount
      tags
      contents
      seller {
        name
        picture
      }
    }
  }
`;

const TOGGLE_PRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`;

const ProductList = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(FETCH_TRAVEL_PRODUCTS, {
    variables: { isSoldout: false },
  });

  const [togglePick] = useMutation(TOGGLE_PRODUCT_PICK);

  const handleTogglePick = async (productId, event) => {
    event.stopPropagation(); // Prevent parent click event
    try {
      await togglePick({
        variables: { travelproductId: productId },
      });
      refetch(); // Refresh data
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Main Banner */}
      <div className={styles.mainBanner}>
        <Image
          src="/image/banner1.jpg"
          alt="Main Banner"
          fill
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <h1>여행의 모든 것</h1>
        </div>
      </div>

      {/* Sub Banner */}
      <div className={styles.subBanner}>
        <Image
          src="/image/banner2.jpg"
          alt="Sub Banner"
          fill
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <h2>특별한 할인 혜택</h2>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.searchbarButtonContainer}>
          <StoreSearchBar refetch={refetch} />
          <button className={`${styles.uploadProductBtn} bg-black text-white`}>
            상품등록
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.container}>
        {data?.fetchTravelproducts.map((product) => (
          <div
            key={product._id}
            className={`${styles.card} rounded-lg bg-white`}
            onClick={() => router.push(`/store/${product._id}`)}
          >
            <div className={styles.imageWrapper}>
              <button
                className={styles.bookmarkButton}
                onClick={(event) => handleTogglePick(product._id, event)}
              >
                <Image
                  src="/image/bookmark.png"
                  width={18}
                  height={18}
                  alt="Bookmark Icon"
                  className={styles.bookmarkIcon}
                />
                <span>{product.pickedCount}</span>
              </button>
              <Image
                src={
                  product.images?.[0]
                    ? `https://storage.googleapis.com/${product.images[0]}`
                    : "/image/noImage.jpg"
                }
                alt={product.name}
                className={styles.productImage}
                width={300}
                height={300}
                priority
              />
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.price}>
                {`${product.price.toLocaleString()} 원`}
              </div>
              <div className={styles.tags}>
                {product.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className={styles.profileContainer}>
                <Image
                  src={
                    product?.seller?.picture
                      ? `https://storage.googleapis.com/${product?.seller?.picture}`
                      : "/image/noProfile.webp"
                  }
                  width={32}
                  height={32}
                  alt="Profile"
                  className={styles.profileIcon}
                />
                <span className={styles.sellerName}>
                  {product?.seller?.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
