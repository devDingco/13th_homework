"use client";
import { useQuery, gql } from "@apollo/client";
import styles from "./style.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "@/components/boards-list/pagination";

const FETCH_TRAVEL_PRODUCTS = gql`
  query FetchTravelProducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      price
      images
      tags
      contents
      seller {
        name
        picture
      }
    }
  }
`;

const ProductList = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(FETCH_TRAVEL_PRODUCTS, {
    variables: { isSoldout: false, search: "" },
  });
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      {data.fetchTravelproducts.map((product) => (
        <div
          key={product._id}
          className={styles.card}
          onClick={() => router.push(`/store/${product._id}`)}
        >
          <div className={styles.overlay}>
            <Image
              src="/image/bookmark.png"
              width={18}
              height={18}
              alt="북마크아이콘"
              className={styles.bookmarkIcon}
            />
          </div>
          <Image
            src={
              product.images?.[0]
                ? `https://storage.googleapis.com/${product.images[0]}`
                : "/image/noImage.jpg"
            }
            alt={product.name}
            className={styles.image}
            width={300}
            height={300}
            priority
          />

          <div className={styles.productName}>{product.name}</div>
          <div
            className={styles.price}
          >{`${product.price.toLocaleString()} 원`}</div>
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
                product.seller.picture
                  ? `https://storage.googleapis.com/${product.seller.picture}`
                  : "/image/noProfile.webp"
              }
              width={0}
              height={0}
              sizes="100"
              alt="Profile"
              className={styles.profileIcon}
            />
            <div>{product.seller.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
