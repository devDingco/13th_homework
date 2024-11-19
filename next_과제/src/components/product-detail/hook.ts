"use client";

import { useParams } from "next/navigation";
import {
  FetchTravelproductDetailDocument,
  DeleteTravelproductDocument,
} from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useMyProductCheck } from "@/commons/stores/my-product-check-store";
import { useUserInfo } from "@/commons/stores/user-info-store";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/commons/stores/modal-store";

export const useProductDetail = () => {
  const router = useRouter();
  const { setIsModal } = useModalStore();
  const { productId }: { productId: string } = useParams();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      setIsModal({ name: "success", contents: "링크 복사가 완료되었습니다." });
      setShowMessage(false);
    }
  }, [showMessage]);

  const { setMyProductCheck } = useMyProductCheck();
  const { data: travelproductData } = useQuery(
    FetchTravelproductDetailDocument,
    {
      variables: { travelproductId: productId },
    }
  );
  const data = travelproductData?.fetchTravelproduct;

  // 내 상품인지 체크하여 상품 삭제 버튼 노출 및 답변하기 버튼 노출
  const sellerId = data?.seller?._id ?? ""; // 상품 판매자 id
  const { userInfo } = useUserInfo(); // 로그인한 유저 정보

  useEffect(() => {
    setMyProductCheck(userInfo?.id === sellerId);
  }, [userInfo, sellerId]);

  const [productDelete] = useMutation(DeleteTravelproductDocument);

  // ! 내 상품인경우 삭제 처리
  const onProductDelete = async () => {
    setIsModal({
      name: "delete_check",
      contents: "정말로 상품을 삭제하시겠습니까?",
      confirm: async () => {
        try {
          await productDelete({
            variables: { travelproductId: productId },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });
  };

  // ! 상품 링크 복사
  const onProductLinkCopy = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link); // clipboard API - 브라우저 내장 API
    setShowMessage(true); // 메시지 노출
  };

  return {
    productId,
    data,
    onProductDelete,
    onProductLinkCopy,
    router,
  };
};
