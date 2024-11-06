"use client";

import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";

export default function PaymentPage() {
  const onClickPayment = async () => {
    const result = await PortOne.requestPayment({
      storeId: `${process.env.NEXT_PUBLIC_PORTONE_STORE_ID}`,
      channelKey: `${process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY}`,
      paymentId: uuidv4(), // 결제 고유번호 - 결제 완료 후 결제 정보 조회를 위해 사용, uuid로 생성
      orderName: "짜장면",
      totalAmount: 100,
      currency: "CURRENCY_KRW",
      productType: "PRODUCT_TYPE_REAL",
      payMethod: "EASY_PAY",
      easyPay: {
        easyPayProvider: "EASY_PAY_PROVIDER_KAKAOPAY",
      },
      customer: {
        fullName: "홍길동",
        phoneNumber: "01088566146",
        email: "jomira0220@naver.com",
        address: {
          country: "COUNTRY_KR",
          addressLine1: "서울특별시 강남구 역삼동",
          addressLine2: "3층",
        },
        zipcode: "06232",
      },
      redirectUrl: "http://localhost:3000/section27/27-01-payment-success", // 결제 완료 후 리다이렉트 될 URL - 모바일 웹에서만 사용
    });

    console.log("결제 결과 확인 : ", result);

    // !! 주의 : storeId와 channelKey는 변경해야함, 상품관련내용들은 상품정보들 끌어와서 넣기
    // 백엔드에다가 결제관련 데이터를 보내줘야 한다. 뮤테이션 실행!
    // createPointTransactionOfLoading(paymentId: ID!): PointTransaction!

    // !! 결제 시간을 저장하는것의 위험성
    // new Date().toISOString() -> 서버시간이 아닌 클라이언트 시간으로 저장될 수 있음, 그러므로 서버시간을 사용하도록 설정해야함, new date()는 최소화하는것이 좋음
    // 모든 경우의 수를 고려해야한다. 그것이 극히 드문 경우일지라도 그것을 고려해서 개발해야한다.
    // 또한 보안적인 측면에서 더 안전한 방법에 대해서 고민하고 적용해야한다.
    // 백엔드에서 결제를 요청받은 시간이 진짜 결제 시간이고 그것을 저장하는것이 좋다.
    // 나라마다 시간이 다르기 때문에 백엔드에서는 UTC(세계 표준 시간) 시간을 기준으로 사용하는것이 좋다.
    // 이렇게 백엔드에서 받게되는 시간은 그 나라에 시간으로 다시 변환해서 사용하면 된다.

    // 이러한 시간 및 날짜 관련 처리를 쉽게 해주는 라이브러리 moment, date-fns, dayjs 등이 있다.
    // 라이브러리 선택시에는 npm trends 등을 통해 검색해서 사용자가 많고 지원이 계속 되는 라이브러리를 선택하는것이 좋다.
  };

  // 이벤트를 발생시키는 두가지 방법
  // 1. 사용자의 행동(클릭, 마우스오버 등)에 의한 이벤트
  // 2. 특정 시간에 도달했을 때 발생하는 이벤트 - 크론탭
  // 3. 시스템(프로그램)에 의한 이벤트

  return (
    <>
      <button
        className="rounded-xl bg-black text-white p-4"
        onClick={() => onClickPayment()}
      >
        결제하기
      </button>
    </>
  );
}
