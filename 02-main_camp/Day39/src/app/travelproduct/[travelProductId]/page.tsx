"use client";

import React from "react";
import styles from "./styles.module.css";
import {
  TravelProductSample1,
  TravelProductSample2,
  Delete,
  Link,
  Location,
  Bookmark,
  Profile40,
  TravelProductContentsSample,
  LocationSample,
} from "@/commons/ui/icon";
import { useQuery } from "@apollo/client";
import { FetchTravelproductDocument } from "@/commons/gql/graphql";
import Divider from "@/app/_components/commons/divider";
import CommentWriting from "@/commons/ui/comment/writing";
import Comment from "@/commons/ui/comment/comment";
import NewTravelProductComment from "@/app/_components/travelProduct/comment";

export default function DetailTravelProduct() {
  const { data } = useQuery(FetchTravelproductDocument, {
    variables: {
      travelproductId: "67021b115413b3002914ce34",
    },
  });
  return (
    <div className={styles.detail__travel__product}>
      <div className={styles.top__container}>
        <div className={styles.header__container}>
          <div className={styles.title__container}>
            <h3 className={styles.header}>{data?.fetchTravelproduct.name}</h3>
            <div className={styles.icon__container}>
              <Delete />
              <Link />
              <Location />
              <Bookmark />
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
              <button className={styles.buyingButton}>구매하기</button>
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
      <CommentWriting
        label="문의하기"
        placeholder="문의사항을 입력해 주세요."
        buttonText="문의 하기"
      />
      <Divider />
      <NewTravelProductComment />
    </div>
  );
}
