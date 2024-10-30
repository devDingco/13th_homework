// 마이페이지 / 거래내역

"use client";

import TransactionHistory from "@/components/mypage/info-transactionHistory/page";
import Information from "@/components/mypage/information";

export default function transactionHistoryPage() {
  return (
    <>
      <Information />
      <TransactionHistory />
    </>
  );
}
