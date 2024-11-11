"use client";

import styles from "./styles.module.css";

import * as PortOne from "@portone/browser-sdk/v2";

import { v4 as uuidv4 } from "uuid";

import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FECTH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($id: ID!) {
    fetchTravelproduct(travelproductId: $id) {
      _id
      name
      remarks
      contents
      price
      tags
    }
  }
`;

export default function PurchaseDetail() {
  const params = useParams();
  console.log("Params:", params);
  const { data } = useQuery(FECTH_TRAVEL_PRODUCT, {
    variables: {
      id: params.purchaseId,
    },
  });
  console.log("data:", data);

  const onClickPayment = async () => {
    try {
      const result = await PortOne.requestPayment({
        storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
        channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
        paymentId: uuidv4(), // 고유한 결제 ID입니다. 필요시 uuid로 대체 가능
        orderName: data?.fetchTravelproduct?.name || "상품명 미정",
        totalAmount: data?.fetchTravelproduct?.price || 0,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        customer: {
          fullName: "짱구",
          phoneNumber: "010-1234-1234",
          email: "1234@a.com",
          address: {
            // 니중에 주소완성하면 바꿔야 하는 값들
            country: "COUNTRY_KR",
            addressLine1: "서울시",
            addressLine2: "4층",
          },
          zipcode: "01234",
        },
        redirectUrl: "http://localhost:3000/purchase/seccessPage", // 임시작성
      });

      // 결제 성공시 로직
      console.log("결제 성공:", result);

      // 백엔드에 결제 정보를 전달하는 뮤테이션 로직 (예시)
      // createPointTransactionOfLoading(patmentId: ...)(주의: 스토어id, 채널키 변경 필요)({
      //   variables: { paymentId: result.paymentId, amount: result.totalAmount }
      // });
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.titleSection}>
        <span className={styles.title}>{data?.fetchTravelproduct.name}</span>
        <div className={styles.icons}>
          <DeleteOutlined />
          <LinkIcon />
          <PlaceOutlinedIcon />
          <div className={styles.bookmarkIcon}>
            <BookmarkBorderOutlinedIcon />
            <span>26</span>
          </div>
        </div>
      </section>

      <span className={styles.summaryText}>
        {data?.fetchTravelproduct.remarks}
      </span>
      <span className={styles.hashTagText}>
        {data?.fetchTravelproduct.tags}
      </span>

      {/* 타이틀 아래부분 ======================== */}

      <section className={styles.middleArea}>
        <div className={styles.showImage}>이미지 들어가는 곳</div>
        {/* 캐러샐 기능 넣어줘서 자동으로 1장씩 넘어가게 보완할 것 */}
        <div>
          <div className={styles.priceAndPurchaseSection}>
            <span className={styles.price}>
              {data?.fetchTravelproduct.price} 원
            </span>
            <ul className={styles.list}>
              <li>이용권은 포인트 충전 후 구매하실 수 있습니다.</li>
              <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
            </ul>
            <button className={styles.purchaseBtn} onClick={onClickPayment}>
              구매하기
            </button>
          </div>
          <div className={styles.sellerSection}>
            <span className={styles.sellerTitle}>판매자</span>
            <div className={styles.sellerName}>
              <UserOutlined />
              <span>파는사람이름</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.underLine}></div>

      <section className={styles.contentsSection}>
        <span className={styles.contentsTitle}>상세설명</span>
        <p className={styles.contnetsText}>
          {data?.fetchTravelproduct.contents}
        </p>
      </section>

      <div className={styles.underLine}></div>

      <section className={styles.locationSection}>
        <span className={styles.locationTitle}>상세위치</span>
        <div className={styles.locationBox}>위치지도가 나올 부분</div>
      </section>
    </main>
  );
}
