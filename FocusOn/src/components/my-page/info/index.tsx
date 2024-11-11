"use client";

import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { FETCH_USER_LOGGED_IN } from "./queries";
import { useMutation, useQuery } from "@apollo/client";
import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { CreatePointTransactionOfLoadingDocument } from "@/commons/graphql/graphql";

const Info = () => {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  console.log("여기", data);
  const [createPointTransactionOfLoading] = useMutation(
    CreatePointTransactionOfLoadingDocument
  );
  const [point, setPoint] = useState();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => setPoint(100)}>100</div>,
    },
    {
      key: "2",
      label: <div onClick={() => setPoint(500)}>500</div>,
    },
    {
      key: "3",
      label: <div onClick={() => setPoint(1000)}>1000</div>,
    },
  ];

  const pointMutation = async (paymentId) => {
    try {
      const result = await createPointTransactionOfLoading({
        variables: {
          paymentId,
        },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPoint = async () => {
    if (!data) return;
    try {
      const result = await PortOne.requestPayment({
        storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
        channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
        paymentId: uuidv4(),
        orderName: "Point",
        totalAmount: Number(point),
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        customer: {
          fullName: "ming",
          phoneNumber: "010-1234-5678",
          email: "aabbcc@naver.com",
          address: {
            country: "COUNTRY_KR",
            addressLine1: "서울시",
            addressLine2: "3층",
          },
          zipcode: "11111",
        },
        redirectUrl: "http://localhost:3000",
      });
      console.log(result);
      pointMutation(result?.paymentId);
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  return (
    <>
      <div>충전하실 금액을 선택해 주세요.</div>
      <Dropdown menu={{ items }} placement="bottom">
        <button>금액 선택</button>
      </Dropdown>
      <div>{point}</div>
      <button onClick={onClickPoint}>포인트 충전</button>
    </>
  );
};
export default Info;
