"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import {
  TravelProductSample1,
  TravelProductSample2,
  Delete,
  LinkIcon,
  Location,
  BookmarkIcon,
  Profile40,
  TravelProductContentsSample,
  LocationSample,
} from "@/commons/ui/icon";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import {
  CreatePointTransactionOfBuyingAndSellingDocument,
  FetchTravelproductDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/gql/graphql";
import Divider from "@/app/_components/commons/divider";
import Modal from "@/commons/ui/modal";
import { useParams } from "next/navigation";
import TravelProductQuestionList from "@/app/_components/travelProduct/question-list";
import TravelProductQuestionWrite from "@/app/_components/travelProduct/question-write";
import useModal from "@/commons/ui/modal/hook";

export default function DetailTravelProduct() {
  const params = useParams();
  const travelproductId = String(params.travelProductId);

  const [modalsOpened, setModalsOpened] = useState({
    buyingModal: false,
    pointChargeModal: false,
  });

  const { data } = useQuery(FetchTravelproductDocument, {
    variables: {
      travelproductId: String(params.travelProductId),
    },
  });
  const { data: questions } = useQuery(FetchTravelproductQuestionsDocument, {
    variables: {
      travelproductId,
    },
  });
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CreatePointTransactionOfBuyingAndSellingDocument
  );

  const { showErrorModal, showSuccessModal } = useModal();

  const openModal = (modalId: string) =>
    setModalsOpened((prev) => ({ ...prev, [modalId]: true }));
  const closeModal = (modalId: string) =>
    setModalsOpened((prev) => ({ ...prev, [modalId]: false }));

  const onClickPointChargeModalCancel = () => {
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
      console.log(error);
    }
  };

  return (
    <div className={styles.detail__travel__product}>
      {modalsOpened.buyingModal && (
        <Modal
          title="해당 숙박권을 구매 하시겠어요?"
          description="해당 숙박권은 포인트로만 구매 가능합니다."
          buttonText="구매"
          handleCancel={() => closeModal("buyingModal")}
          handleConfirm={handleConfirm}
        />
      )}
      {modalsOpened.pointChargeModal && (
        <Modal
          title="포인트 부족"
          description={`
            포인트가 부족합니다.
            포인트 충전 후 구매하세요.
            `}
          buttonText="충전"
          handleCancel={onClickPointChargeModalCancel}
          // handleConfirm={() => openModal("pointChargeModal")}
        />
      )}

      <div className={styles.top__container}>
        <div className={styles.header__container}>
          <div className={styles.title__container}>
            <h3 className={styles.header}>{data?.fetchTravelproduct.name}</h3>
            <div className={styles.icon__container}>
              <Delete />
              <LinkIcon />
              <Location />
              <div className={styles.bookmark__container}>
                <BookmarkIcon />
                {data?.fetchTravelproduct.pickedCount ?? 0}
              </div>
            </div>
          </div>
          <span className={styles.description}>
            {data?.fetchTravelproduct.remarks}
          </span>
          <span className={styles.hashTag}>
            {/* {data?.fetchTravelproduct.tags} */}
            #맛있는 뷔페 #건식 사우나 #애견 동반 가능
          </span>
        </div>
        <div className={styles.contents__container}>
          <TravelProductSample1 />
          <TravelProductSample2 />
          <div className={styles.buyingInfo__container}>
            <div className={styles.buying__container}>
              <div className={styles.price__container}>
                <span className={styles.price}>
                  {data?.fetchTravelproduct.price} 원
                </span>
                <div className={styles.cautions__container}>
                  <p>
                    숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                  </p>
                  <p>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</p>
                </div>
              </div>

              <button
                className={styles.buyingButton}
                onClick={() => openModal("buyingModal")}
              >
                구매하기
              </button>
            </div>
            <div className={styles.seller__container}>
              판매자
              <div className={styles.profile__container}>
                <Profile40 />
                <span>김상훈</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className={styles.section__container}>
        <span className={styles.section__title}>상세 설명</span>
        <TravelProductContentsSample />
      </div>

      <Divider />

      <div className={styles.section__container}>
        <span className={styles.section__title}>상세 위치</span>
        <LocationSample />
      </div>
      <TravelProductQuestionWrite travelproductId={travelproductId} />
      <Divider />
      <TravelProductQuestionList
        travelproductId={travelproductId}
        data={questions}
      />
    </div>
  );
}
