"use client";

import Image from "next/image";
import { HEADER } from "../../../constants/constants";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import useLayoutHeader from "../../hooks/useLayoutHeader";

export default function LayoutHeader() {
  const onClick = useLayoutHeader();

  return (
    <div className="flex flex-row justify-between py-5">
      <div className="flex flex-row gap-6">
        <div onClick={onClick} className="relative w-[51.521px] h-8">
          <Image src="/pngs/logo.png" alt="logo" fill />
        </div>
        <p>{HEADER.TRIP_TALK}</p>
        <p>{HEADER.PURCHASE_ACCOMMODATION_TICKETS}</p>
        <p>{HEADER.MY_PAGE}</p>
      </div>
      <div className="flex flex-row gap-1">
        <div className="flex justify-center w-10 h-10 bg-lightGray rounded-full">
          <UserOutlined className="text-xl" />
        </div>
        <CaretDownOutlined className="text-xs" />
      </div>
    </div>
  );
}
