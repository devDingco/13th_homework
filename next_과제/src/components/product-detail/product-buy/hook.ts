"use client";
import {
  CreatePointTransactionOfBuyingAndSellingDocument,
  FetchUserLoggedInDocument,
} from "@/commons/graphql/graphql";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";

export const useProductBuy = () => {
  const { productId }: { productId: string } = useParams();

  const [buying] = useMutation(
    CreatePointTransactionOfBuyingAndSellingDocument
  );

  //! 상품 구매하기
  const onClickBuying = async () => {
    try {
      const result = await buying({
        variables: { useritemId: productId },
        refetchQueries: [{ query: FetchUserLoggedInDocument }],
      });
      console.log(result);
      alert("구매가 완료되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return {
    onClickBuying,
  };
};
