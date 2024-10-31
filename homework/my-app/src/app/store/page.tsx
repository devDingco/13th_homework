import styles from "./style.module.css";

const products = [
  {
    id: 1,
    name: "Cato Lapalma Chair",
    price: "$2300",
    image: "/images/chair1.jpg",
  },
  {
    id: 2,
    name: "Farla Lapalma Chair",
    price: "$2450",
    image: "/images/chair2.jpg",
  },
  {
    id: 3,
    name: "Kiti Lapalma Chair",
    price: "$2340",
    image: "/images/chair3.jpg",
  },
  {
    id: 4,
    name: "Lynx Lapalma Chair",
    price: "$3400",
    image: "/images/chair4.jpg",
  },
  {
    id: 5,
    name: "Shanghai Dining Chair",
    price: "$1900",
    image: "/images/chair5.jpg",
  },
  {
    id: 6,
    name: "NY11 Dining Chair",
    price: "$1600",
    image: "/images/chair6.jpg",
  },
  {
    id: 7,
    name: "Mono Wendelbo Chair",
    price: "$1800",
    image: "/images/chair7.jpg",
  },
  {
    id: 8,
    name: "Mono Upholstered Chair",
    price: "$1500",
    image: "/images/chair8.jpg",
  },
];

const ProductList = () => {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.price}>{product.price}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
