export const priceViewSet = (price: number | string) => {
  if (typeof price === "string") {
    price = Number(price);
  }
  return price.toLocaleString("ko-KR") + "원";
};

// 안쓰고있음
