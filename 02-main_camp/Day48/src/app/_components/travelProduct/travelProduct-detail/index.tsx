"use client";

import React, { useEffect } from "react";
import useTravelProductDetail from "./hook";
import Modal from "@/commons/ui/modal";
import TravelProductQuestionList from "@/app/_components/travelProduct/question-list";
import TravelProductQuestionWrite from "@/app/_components/travelProduct/question-write";
import Divider from "@/app/_components/commons/divider";
import {
  TravelProductSample1,
  TravelProductSample2,
  Delete,
  LinkIcon,
  Location,
  BookmarkIcon,
  Profile40,
} from "@/commons/ui/icon";
import styles from "./styles.module.css";
import Header, { HeaderSize } from "@/commons/ui/header";
import ModalChargePoint from "@/commons/ui/modal/modal-chargePoint";
import KakaoMap from "@/commons/ui/kakao-map";

export default function TravelProductDetail() {
  const {
    travelproductId,
    rowProduct,
    questions,
    pickedCount,
    modalsOpened,
    setPickedCount,
    onClickMissingPointModalCancel,
    onClickPointChargeModalCancel,
    onClickBookmark,
    handleConfirm,
    openModal,
    closeModal,
  } = useTravelProductDetail();

  const product = rowProduct?.fetchTravelproduct;

  const handleMissingPointModal = () => {
    closeModal("buyingModal");
    closeModal("missingPointModal");
    openModal("pointChargeModal");
  };

  useEffect(() => {
    if (product && typeof product.pickedCount === "number")
      setPickedCount(product.pickedCount);
  }, [product]);

  return (
    <div className={styles.detail__travel__product}>
      {modalsOpened.buyingModal && (
        <Modal
          title="해당 숙박권을 구매 하시겠어요?"
          description="해당 숙박권은 포인트로만 구매 가능합니다."
          buttonText="구매"
          handleCancel={() => closeModal("buyingModal")}
          handleConfirm={() => openModal("missingPointModal")}
        />
      )}
      {modalsOpened.missingPointModal && (
        <Modal
          title="포인트 부족"
          description={`
            포인트가 부족합니다.
            포인트 충전 후 구매하세요.
            `}
          buttonText="충전"
          handleCancel={onClickMissingPointModalCancel}
          handleConfirm={handleMissingPointModal}
        />
      )}
      {modalsOpened.pointChargeModal && (
        <ModalChargePoint
          handleCancel={onClickPointChargeModalCancel}
          handleConfirm={handleConfirm}
        />
      )}
      <div className={styles.top__container}>
        <div className={styles.header__container}>
          <div className={styles.title__container}>
            <Header title={product?.name ?? ""} size={HeaderSize.large} />
            <div className={styles.icon__container}>
              <Delete />
              <LinkIcon />
              <Location />
              <div
                className={styles.bookmark__container}
                onClick={onClickBookmark}
              >
                <BookmarkIcon />
                {pickedCount}
              </div>
            </div>
          </div>
          <span className={styles.description}>{product?.remarks}</span>
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
                <span className={styles.price}>{product?.price} 원</span>
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
                <span>{product?.seller?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className={styles.section__container}>
        <span className={styles.section__title}>상세 설명</span>
        <p>{product?.contents}</p>
      </div>

      <Divider />

      <div className={styles.section__container}>
        <span className={styles.section__title}>상세 위치</span>
        <KakaoMap
          width="100%"
          height="17.5rem"
          lat={product?.travelproductAddress?.lat ?? 0}
          lng={product?.travelproductAddress?.lng ?? 0}
        />
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
