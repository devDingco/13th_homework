"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation ($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      amount
      balance
    }
  }
`;

const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation ($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      name
      price
    }
  }
`;

const FETCH_POINT_TRANSACTIONS = gql`
  query {
    fetchPointTransactions(page: 1) {
      amount
      balance
      status
    }
  }
`;

export default function PointRecharge() {
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );

  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );
  // 포인트 거래 잘 되는지 확인하려고 만든거
  const { data } = useQuery(FETCH_POINT_TRANSACTIONS);

  console.log("거래내역:", data);

  const onClickPointCharge = async () => {
    try {
      const result = await PortOne.requestPayment({
        storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
        channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
        paymentId: uuidv4(), // 고유한 결제 ID입니다. 필요시 uuid로 대체 가능
        orderName: "포인트 충전",
        totalAmount: 100000,
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

      const paymentId = result?.paymentId;
      if (!paymentId) throw new Error("결제 ID를 가져올 수 없습니다.");

      await createPointTransactionOfLoading({
        variables: {
          paymentId,
        },
      });
    } catch (error) {
      console.error("포인트 충전 중 오류 발생:", error);
    }
  };

  const onClickPurchaseProduct = async (useritemId: string) => {
    try {
      if (!useritemId) {
        throw new Error("상품 ID가 필요합니다.");
      }

      const result = await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId,
        },
      });

      console.log("상품 구매 결과:", result);
      // 추가 로직 (성공 시, 페이지 이동 등)
    } catch (error) {
      console.error("상품 구매 중 오류 발생:", error);
    }
  };

  return (
    <main className={styles.main}>
      <div>포인트 충전하는 곳 컴포넌트</div>
      <button onClick={onClickPointCharge}>포인트 충전하기</button>

      {/* 포인트 결제하는 부분도 한번에 모아둬서 테스트하고 테스트 성공하면 제대로 된 위치에 놓을 예정 */}
      <div>임시로 만듬, 포인트 사용해서 결제하는 부분 상품 금액은 22222원 </div>
      <button
        onClick={() => onClickPurchaseProduct("6731aff39712e0002973f12c")}
      >
        상품 구매하기
      </button>
    </main>
  );
}
