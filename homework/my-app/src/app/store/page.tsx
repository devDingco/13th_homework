"use client";
import { useQuery, gql } from "@apollo/client";
import styles from "./style.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

// GraphQL 쿼리 정의
const FETCH_TRAVEL_PRODUCTS = gql`
  query FetchTravelProducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      price
      images
    }
  }
`;

const ProductList = () => {
  const router = useRouter();
  // GraphQL 쿼리로 데이터 가져오기
  const { data, loading, error } = useQuery(FETCH_TRAVEL_PRODUCTS, {
    variables: { isSoldout: false, search: "", page: 1 },
  });

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
          {product.images?.[0] && (
            <Image
              src={`https://storage.googleapis.com/${product.images[0]}`}
              alt={product.name}
              className={styles.image}
              width={0}
              height={0}
            />
          )}
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.price}>{product.price}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
