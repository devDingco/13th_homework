import { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import * as PortOne from "@portone/browser-sdk/v2";
import {
  CreatePointTransactionOfLoadingDocument,
  FetchTravelproductDocument,
  FetchTravelproductQuestionsDocument,
  FetchUserLoggedInDocument,
  ToggleTravelproductPickDocument,
} from "@/commons/gql/graphql";
import { useParams } from "next/navigation";
import useModal from "@/commons/ui/modal/hook";
import { useSelectedPointStore } from "@/app/_store/selectedPoint-store";
import { useUserInfo } from "@/app/_store/userInfo-store";

export default function useTravelProductDetail() {
  const params = useParams();
  const travelproductId = String(params.travelProductId);

  const [modalsOpened, setModalsOpened] = useState({
    buyingModal: false,
    pointChargeModal: false,
    missingPointModal: false,
  });

  const { selectedPoint } = useSelectedPointStore();
  const { userInfo } = useUserInfo();

  const { data: rowProduct } = useQuery(FetchTravelproductDocument, {
    variables: {
      travelproductId: String(params.travelProductId),
    },
  });
  const [pickedCount, setPickedCount] = useState(
    rowProduct?.fetchTravelproduct.pickedCount ?? 0
  );

  const { data: questions } = useQuery(FetchTravelproductQuestionsDocument, {
    variables: {
      travelproductId,
    },
  });
  const [createPointTransactionOfLoading] = useMutation(
    CreatePointTransactionOfLoadingDocument
  );
  const [toggleTravelproductPick] = useMutation(
    ToggleTravelproductPickDocument
  );

  const { showErrorModal, showSuccessModal } = useModal();

  const openModal = (modalId: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
    setModalsOpened((prev) => ({ ...prev, [modalId]: true }));
  };

  const closeModal = (modalId: string) => {
    document.body.style.overflow = "scroll";
    setModalsOpened((prev) => ({ ...prev, [modalId]: false }));
  };

  const onClickMissingPointModalCancel = () => {
    document.body.style.overflow = "scroll";
    closeModal("buyingModal");
    closeModal("missingPointModal");
  };

  const onClickPointChargeModalCancel = () => {
    document.body.style.overflow = "scroll";
    closeModal("buyingModal");
    closeModal("missingPointModal");
    closeModal("pointChargeModal");
  };

  const handlePayment = async () => {
    const paymentId = crypto.randomUUID();
    try {
      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_STORE_KEY ?? "",
        paymentId,
        orderName: "포인트 충전",
        totalAmount: selectedPoint,
        currency: "CURRENCY_KRW",
        channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY ?? "",
        productType: "PRODUCT_TYPE_REAL",
        payMethod: "EASY_PAY",
        easyPay: {
          easyPayProvider: "EASY_PAY_PROVIDER_KAKAOPAY",
        },
        customer: {
          fullName: userInfo.name,
          email: userInfo.email,
        },
      });

      console.log("결제 응답 상태 코드::", response?.code);

      // 사용자 결제 취소
      if (response?.code === "FAILURE_TYPE_PG") {
        alert("결제를 취소 했습니다.");
        closeModal("pointChargeModal");
        return "";
      }

      console.log("결제 응답::", response);

      closeModal("pointChargeModal");
      return response?.paymentId;
    } catch (error) {
      console.log(error);
      closeModal("pointChargeModal");
      alert("결제를 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleConfirm = async () => {
    try {
      const paymentId = await handlePayment();

      if (!paymentId) {
        alert("결제 ID가 존재하지 않습니다. 다시 시도해 주세요.");
        return;
      }

      await createPointTransactionOfLoading({
        variables: {
          paymentId,
        },
        refetchQueries: [
          {
            query: FetchUserLoggedInDocument,
          },
        ],
      });

      showSuccessModal("상품이 구매 되었습니다.");
      closeModal("buyingModal");
    } catch (error: unknown) {
      if (error instanceof ApolloError)
        showErrorModal("구매 실패", error.graphQLErrors[0].message);
      closeModal("buyingModal");
      console.log(error);
    }
  };

  const onClickBookmark = async () => {
    try {
      const result = await toggleTravelproductPick({
        variables: {
          travelproductId,
        },
      });
      if (result.data) setPickedCount(result.data.toggleTravelproductPick + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    travelproductId,
    rowProduct,
    questions,
    pickedCount,
    modalsOpened,
    setPickedCount,
    onClickPointChargeModalCancel,
    onClickMissingPointModalCancel,
    onClickBookmark,
    handleConfirm,
    openModal,
    closeModal,
    handlePayment,
  };
}
