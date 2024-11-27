"use client";
import React, { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { gql, useQuery, useMutation } from "@apollo/client";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";

// GraphQL Queries & Mutations
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;

const CREATE_POINT_TRANSACTION = gql`
  mutation CreatePointTransactionOfLoading($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      travelproduct {
        _id
        name
        remarks
        contents
      }
      user {
        _id
        email
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const PointModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION
  );
  const [amount, setAmount] = useState(0);
  console.log("유저데이터", userData);

  if (!isOpen) return null; // 모달이 닫힌 상태에서는 렌더링하지 않음

  const onClickPayment = async () => {
    if (!amount || amount <= 0) {
      alert("충전 금액을 입력하세요.");
      return;
    }

    try {
      const paymentId = uuidv4();

      // 1. 결제 요청
      const result = await PortOne.requestPayment({
        storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
        channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
        paymentId: paymentId,
        orderName: "포인트 충전",
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        customer: {
          fullName: userData?.fetchUserLoggedIn?.name,
          email: userData?.fetchUserLoggedIn?.email,
        },
        redirectUrl: "http://localhost:3000/mypage",
      });
      console.log(result);
      alert("결제가 완료되었습니다");
      router.push("/mypage");

      await createPointTransactionOfLoading({
        variables: { paymentId },
      });

      onClose();
    } catch (error) {
      console.error("결제 오류:", error);
      alert("결제 요청 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>포인트 충전</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="amount">충전 금액</label>
          <input
            id="amount"
            type="number"
            placeholder="충전 금액을 입력하세요"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            닫기
          </button>
          <button className={styles.paymentButton} onClick={onClickPayment}>
            충전하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointModal;
