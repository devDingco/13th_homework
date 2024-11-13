"use client";

import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // 네비게이션 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import * as PortOne from "@portone/browser-sdk/v2";

import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const FECTH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($id: ID!) {
    fetchTravelproduct(travelproductId: $id) {
      _id
      name
      remarks
      contents
      price
      tags
      images
    }
  }
`;

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation ($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId)
  }
`;

export default function PurchaseDetail() {
  const params = useParams();
  console.log("Params:", params);
  const { data } = useQuery(FECTH_TRAVEL_PRODUCT, {
    variables: { id: params.purchaseId },
  });
  console.log("data:", data);

  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );

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

      await createPointTransactionOfLoading({
        variables: {
          paymentId: result?.paymentId, // => 백엔드로 결제 정보 보내는 로직 이렇게 짜면 되는건가요?
        },
      });
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };
  // console.log(data?.fetchTravelproduct.tags);
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
      <div>6731aff39712e0002973f12c</div>
      {/* 코드수정할때 계속 생성하기 귀찮아서 박아둔 purchaseID 값 */}
      <span className={styles.summaryText}>
        {data?.fetchTravelproduct.remarks}
      </span>
      <span className={styles.hashTagText}>
        {data?.fetchTravelproduct.tags}
      </span>
      {/* 타이틀 아래부분 ======================== */}
      {/* 왜 스와이퍼의 스타일 적용이 안되는 것인가,,,, */}
      <section className={styles.middleArea}>
        <div className={styles.imageSection}>
          <div className={styles.showImage}>
            <Swiper
              className="swiper-container" // 명시적으로 추가
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 3000, // 자동 슬라이드 전환 시간 (밀리초)
                disableOnInteraction: false, // 사용자가 슬라이드를 조작해도 자동 전환 계속 유지
              }}
              navigation={true} // 네비게이션 버튼 활성화
              pagination={{
                clickable: true, // 페이지네이션 클릭 가능
              }}
            >
              {data?.fetchTravelproduct.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    className={styles.images}
                    src={`https://storage.googleapis.com/${image}`}
                    width={1000} // 고정된 너비
                    height={500} // 고정된 높이
                    alt="이미지"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

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
