import { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import {
  CreatePointTransactionOfBuyingAndSellingDocument,
  FetchTravelproductDocument,
  FetchTravelproductQuestionsDocument,
  ToggleTravelproductPickDocument,
} from "@/commons/gql/graphql";
import { useParams } from "next/navigation";
import useModal from "@/commons/ui/modal/hook";

export default function useTravelProductDetail() {
  const params = useParams();
  const travelproductId = String(params.travelProductId);

  const [modalsOpened, setModalsOpened] = useState({
    buyingModal: false,
    pointChargeModal: false,
  });

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
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CreatePointTransactionOfBuyingAndSellingDocument
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

  const onClickPointChargeModalCancel = () => {
    document.body.style.overflow = "scroll";
    closeModal("buyingModal");
    closeModal("pointChargeModal");
  };

  const handleConfirm = async () => {
    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId: travelproductId,
        },
      });
      showSuccessModal("상품이 구매 되었습니다.");
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
    onClickBookmark,
    handleConfirm,
    openModal,
    closeModal,
  };
}
