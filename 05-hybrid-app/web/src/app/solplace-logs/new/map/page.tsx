"use client";

import useMap from "@/common/hooks/useMap";
import Footer from "@/components/layout/footer/Footer";
import MapAddEidt from "@/components/MapAddEidt";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MapAddPage() {
  const { register, setValue } = useForm();
  const { address } = useMap({});

  // address가 업데이트될 때마다 console.log 출력
  useEffect(() => {
    console.log("현재 상세주소", address);
    setValue("address", address); // 주소가 업데이트되면 폼에 값 설정
  }, [address, setValue]);
  return (
    <>
      <MapAddEidt isEdit={false} />
      <Footer className="px-20 pt-20 pb-40 flex flex-col gap-20">
        <input
          {...register("address")}
          value={address}
          className="h-48 w-full px-20 py-12 text-center rounded-[100px] border-2 border-gray-100 shadow text-[#333333] text-base font-semibold leading-normal"
        />
        <button className="bg-[#2873e4] w-full px-16 py-12 rounded-lg justify-center text-center text-white text-lg font-bold leading-normal">
          이 위치로 등록
        </button>
      </Footer>
    </>
  );
}
