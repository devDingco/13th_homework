"use client";

import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";

type PostSearchPopProps = {
  disabled?: boolean;
  setaddress: (value: string) => void;
  setzonecode: (value: string) => void;
  setLat?: (value: string) => void;
  setLng?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
};

interface IAddressDataType {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

const PostSearchPopBtn = (props: PostSearchPopProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    setaddress,
    setzonecode,
    setLat,
    setLng,
    disabled = false,
    children,
    className,
  } = props;

  const handleComplete = (data: IAddressDataType) => {
    let fullAddress = data.address;
    let extraAddress = "";
    const zoneCode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setaddress(fullAddress);
    setzonecode(zoneCode);

    // 주소 -> 좌표 변환 요청
    fetchCoordinates(fullAddress);

    setIsModalOpen(false); // 모달 닫기
  };

  const fetchCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          address
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
            // Referer: "http://localhost:3000", //! 이부분 실제 배포시 카카오 개발자 콘솔과 함께 수정해야함
          },
        }
      );

      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다.");
      }

      const data = await response.json();
      if (data.documents.length > 0) {
        const { y, x } = data.documents[0];
        if (setLat) setLat(y);
        if (setLng) setLng(x);
      } else {
        console.error("좌표를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("좌표 변환 오류:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed left-0 top-0 z-100 w-screen h-screen flex items-center justify-center">
          <div
            className="bg-[rgba(0,0,0,0.6)] w-screen h-screen"
            onClick={handleCancel}
          ></div>
          <div className="w-80 h-[50vh] flex flex-col gap-3 bg-white rounded-xl p-4 absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2">
            <DaumPostcodeEmbed onComplete={handleComplete} />
            <button
              type="button"
              className="bg-[var(--primary)] text-white rounded-lg h-14 w-full"
              onClick={handleCancel}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={disabled}
        className={className ? className : ""}
        onClick={() => handleOk()}
      >
        {children}
      </button>
    </>
  );
};

export default PostSearchPopBtn;
