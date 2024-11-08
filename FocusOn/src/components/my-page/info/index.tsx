"use client";

import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { FETCH_USER_LOGGED_IN } from "./queries";
import { useQuery } from "@apollo/client";
import { Dropdown, MenuProps } from "antd";
import { useState } from "react";

const Info = () => {
  // const { data } = useQuery(FETCH_USER_LOGGED_IN);
  // const [point, setPoint] = useState();

  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: <div onClick={() => setPoint(100)}>100</div>,
  //   },
  //   {
  //     key: "2",
  //     label: <div onClick={() => setPoint(500)}>500</div>,
  //   },
  // ];

  const onClickPoint = async () => {
    const result = await PortOne.requestPayment({
      storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
      channelKey: "channel-key-0c39541b-8e9d-489e-8780-c74f1ebf7ff4",
      paymentId: uuidv4(),
      orderName: "Point",
      totalAmount: 500,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      customer: {
        fullName: "밍밍",
        phoneNumber: "010-1234-5678",
        email: "hihi@gmail.com",
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
  };
  return (
    <>
      {/* <div>충전하실 금액을 선택해 주세요.</div>
      <Dropdown menu={{ items }} placement="bottom">
        <button>금액 선택</button>
      </Dropdown> */}
      <button onClick={onClickPoint}>포인트 충전</button>
    </>
  );
};
export default Info;
