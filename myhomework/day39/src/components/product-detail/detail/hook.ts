"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useProductDetail = () => {
  const router = useRouter();
  const [isPurchase, setIsPurchase] = useState(false);

  const onClickPurchase = () => {
    setIsPurchase(true);
  };

  const onClickCancel = () => {
    setIsPurchase(false);
  };

  const onClickBuy = () => {
    Modal.success({
      content: "구매가 완료되었습니다.",
      onOk: () => {
        router.push(`/main`);
      },
    });
  };

  return {
    onClickPurchase,
    isPurchase,
    onClickCancel,
    onClickBuy,
    setIsPurchase,
  };
};
