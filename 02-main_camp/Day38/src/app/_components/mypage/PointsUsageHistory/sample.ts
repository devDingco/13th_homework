export const navigationItems = ["전체", "충전내역", "구매내역", "판매내역"];

export const all = [
  { title: "날짜", key: "date" },
  { title: "내용", key: "contents" },
  { title: "거래 및 충전 내용", key: "history" },
  { title: "잔액", key: "balance" },
];

const allItems = [
  {
    date: "2024.10.31",
    contents: "충전",
    history: "+1,000,000",
    balance: "1,220,220",
  },
  {
    date: "2024.10.31",
    contents: "구매",
    history: "-1,000,000",
    balance: "1,220,220",
  },
];

export const sampleAllItems = Array.from(
  { length: 10 },
  (_, index) => allItems[index % 2]
);

export const chargeHistory = [
  { title: "충전일", key: "chargingDate" },
  { title: "결제 ID", key: "paymentId" },
  { title: "충전내역", key: "chargeHistory" },
  { title: "거래 후 잔액", key: "postTransactionBalance" },
];

const chargeHistoryItem = {
  chargingDate: "2024.10.31",
  paymentId: "comply_yoon",
  chargeHistory: "+326,000",
  postTransactionBalance: "1,220,200",
};

export const sampleChargeHistoryItems = Array.from({ length: 10 }, () => ({
  ...chargeHistoryItem,
}));

export const purchaseHistory = [
  { title: "거래일", key: "transactionDate" },
  { title: "상품명", key: "productName" },
  { title: "거래내역", key: "transactionHistory" },
  { title: "거래 후 잔액", key: "postTransactionBalance" },
  { title: "판매자", key: "seller" },
];

const purchaseHistoryItem = {
  transactionDate: "2024.10.31",
  productName: "비스타 워커힐 호텔",
  transactionHistory: "-326,000",
  postTransactionBalance: "1,220,200",
  seller: "최홍식",
};

export const samplePurchaseHistoryItems = Array.from({ length: 10 }, () => ({
  ...purchaseHistoryItem,
}));

export const salesHistory = [
  { title: "거래일", key: "transactionDate" },
  { title: "상품명", key: "productName" },
  { title: "거래내역", key: "transactionHistory" },
  { title: "거래 후 잔액", key: "postTransactionBalance" },
];

const salesHistoryItem = {
  transactionDate: "2024.12.16",
  productName: "파르나스 호텔 제주",
  transactionHistory: "+1,000,000",
  postTransactionBalance: "1,222,000",
};

export const sampleSalesHistoryItems = Array.from({ length: 10 }, () => ({
  ...salesHistoryItem,
}));
