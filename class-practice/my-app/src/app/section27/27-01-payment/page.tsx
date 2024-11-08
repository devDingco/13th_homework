"use client";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";

export default function PaymentPage() {
  const onClickPayment = async () => {
    const result = await PortOne.requestPayment({
      storeId: "store-e207db8d-49d2-47c4-9ef5-64f6a1fed3ea",
      channelKey: "channel-key-404c6736-7b16-4ee9-8e0c-e6a120aa30f3",
      paymentId: uuidv4(),
      orderName: "아파트아파트",
      totalAmount: 3000,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      customer: {
        fullName: "철수",
        phoneNumber: "010-1111-1111",
        email: "aaaa@aaa.com",
        address: {
          country: "COUNTRY_KR",
          addressLine1: "서울시",
          addressLine2: "3층",
        },
        zipcode: "111111",
      },
      redirectUrl: "http://localhost:3000/section27/27-01-payment-성공페이지",
    });

    // 결제 성공 시 로직
    console.log(result);

    // 백엔드에다 결제관련 데이터 넘겨주기 (뮤테이션 실행하기) => 숙제API에서 사용(주의: storeId, channelKey 변경)
    // createPointTransactionOfLoading(paymentId: 이부분에 넘기기)
  };

  return <button onClick={onClickPayment}>결제하기</button>;
}
