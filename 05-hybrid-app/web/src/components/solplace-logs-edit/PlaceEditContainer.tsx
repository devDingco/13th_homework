"use client";

import Footer from "@/components/layout/footer/Footer";
import ImageUpload from "../solplace-logs-new/ImageUpload";
import PlaceAddress from "../solplace-logs-new/PlaceAddress";
import PlaceContents from "../solplace-logs-new/PlaceContents";
import PlaceName from "../solplace-logs-new/PlaceName";
import { FormProvider } from "react-hook-form";
import usePlaceEditForm from "@/common/hooks/solplace-logs/edit/usePlaceEditForm";

export default function PlaceEditContainer() {
  const { methods, onSubmit, handleSubmitClick, formRef, data } =
    usePlaceEditForm();
  const {
    formState: { isValid },
  } = methods; // 폼 상태 가져오기
  return (
    <>
      <FormProvider {...methods}>
        <form
          ref={formRef}
          onSubmit={methods.handleSubmit(onSubmit)}
          className=" px-20 py-24 flex flex-col gap-20 w-full"
        >
          {/* 사진 등록 */}
          <ImageUpload images={data?.fetchSolplaceLog.images} />

          {/* 플레이스 이름 */}
          <PlaceName />

          {/* 플레이스 주소 */}
          <PlaceAddress />

          {/* 플레이스 내용 */}
          <PlaceContents />
        </form>
      </FormProvider>
      {/* 로그 등록 버튼 */}
      <Footer>
        <button
          onClick={handleSubmitClick}
          disabled={!isValid} // 사용자가 입력을 다 안하면 비활성화
          className={`w-full h-48 px-16 py-12 bg-[#2873e4] rounded-lg text-center text-white text-lg font-bold leading-normal ${
            !isValid && "bg-gray-400"
          }`}
        >
          수정
        </button>
      </Footer>
    </>
  );
}
