"use client";
import { CreatePointTransactionOfBuyingAndSellingDocument } from "@/commons/graphql/graphql";

import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useProductBuy = () => {
  const { productId }: { productId: string } = useParams();

  const [buying] = useMutation(
    CreatePointTransactionOfBuyingAndSellingDocument
  );

  //! 상품 구매하기
  const onClickBuying = async () => {
    try {
      await buying({
        variables: { useritemId: productId },
      });
      alert("구매가 완료되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onClickBuying,
  };
};
