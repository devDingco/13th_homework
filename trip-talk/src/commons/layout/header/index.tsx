"use client";

import Image from "next/image";
import { HEADER } from "../../../constants/constants";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import useLayoutHeader from "../../hooks/useLayoutHeader";

export default function LayoutHeader() {
  const {
    onClickTripTalk,
    onClickMoveMainPage,
    onClickMovePurchasePage,
    onClickMoveMyPage,
    mainPage,
    purchasePage,
    myPage,
  } = useLayoutHeader();

  return (
    <div className="flex flex-row justify-between py-5">
      <div className="flex flex-row items-center gap-6">
        <div
          onClick={onClickMoveMainPage}
          className="relative w-[51.521px] h-8 p-2"
        >
          <Image src="/pngs/logo.png" alt="logo" fill />
        </div>
        <div
          onClick={onClickTripTalk}
          className={
            mainPage
              ? "text-black border-solid border-b-2 p-2 cursor-pointer"
              : "text-gray p-2 cursor-pointer"
          }
        >
          {HEADER.TRIP_TALK}
        </div>
        <div
          onClick={onClickMovePurchasePage}
          className={
            purchasePage
              ? "text-black border-solid border-b-2 p-2 cursor-pointer"
              : "text-gray p-2 cursor-pointer"
          }
        >
          {HEADER.PURCHASE_ACCOMMODATION_TICKETS}
        </div>
        <div
          onClick={onClickMoveMyPage}
          className={
            myPage
              ? "text-black border-solid border-b-2 p-2 cursor-pointer"
              : "text-gray p-2 cursor-pointer"
          }
        >
          {HEADER.MY_PAGE}
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <div className="flex justify-center items-center w-10 h-10 bg-lightGray rounded-full">
          <UserOutlined className="text-xl" />
        </div>
        <CaretDownOutlined className="text-xs" />
      </div>
    </div>
  );
}
