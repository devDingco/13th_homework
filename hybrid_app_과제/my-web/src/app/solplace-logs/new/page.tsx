"use client";

import { useState, useRef } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosAdd,
  IoIosClose,
} from "react-icons/io";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

export default function NewPage() {
  const method = useForm({
    mode: "onChange",
  });

  const imgFileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const imgUploadClick = () => {
    imgFileRef.current?.click();
    console.log("이미지 업로드");
  };

  const imgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 이미지 갯수 제한 (3개 이하)
    if (imageUrl.length >= 3)
      return alert("이미지는 3개까지만 등록 가능합니다.");

    // 파일 크기 제한 (5MB 이하)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return alert("파일 크기는 5MB 이하로 등록 가능합니다.");
    }

    const base64 = await toBase64(file);
    setImageUrl((prev) => [...prev, base64]);
  };

  const logSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그 등록", method.getValues(), imageUrl);
  };

  return (
    <div>
      <div className="p-3 flex justify-start items-center gap-2 h-12 px-5">
        <IoIosArrowBack size={24} />
        <h3 className="font-bold text-lg">플레이스 등록</h3>
      </div>
      <FormProvider {...method}>
        <form className="p-5 flex flex-col gap-10 text-[14px] leading-[20px]">
          <div className="flex flex-col gap-5">
            <input
              type="file"
              ref={imgFileRef}
              hidden
              onChange={(e) => imgUpload(e)}
            />

            <div className="flex gap-2">
              {imageUrl.map((url, index) => (
                <div key={url + index} className="relative">
                  <button
                    type="button"
                    className="absolute right-2 top-2 w-5 h-5 rounded-full bg-[rgba(0,0,0,0.4)]"
                    onClick={() => {
                      setImageUrl((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    <IoIosClose size={20} color="white" />
                  </button>
                  <Image
                    className="w-[100px] h-[100px] object-cover rounded-lg"
                    key={index}
                    src={url}
                    alt="이미지"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
              {imageUrl.length < 3 && (
                <button
                  type="button"
                  className="w-[100px] h-[100px] bg-gray-50 flex flex-col items-center justify-center text-[12px] lading-[20px] rounded-lg text-gray-600"
                  onClick={() => imgUploadClick()}
                >
                  <IoIosAdd size={24} />
                  사진 등록
                </button>
              )}
            </div>

            <label className="flex flex-col gap-2">
              <div className="flex items-start gap-1">
                <span className="font-semibold text-[12px] leading-[20px]">
                  플레이스 이름
                </span>
                <span className="text-red-600 leading-none">*</span>
              </div>

              <input
                className="h-11 font-medium rounded-lg border border-gray-200 px-4 placeholder:text-gray-400"
                placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
                {...method.register("name", {
                  required: true,
                  minLength: {
                    value: 1,
                    message: "플레이스 이름을 입력해 주세요",
                  },
                })}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold text-[12px] leading-[20px]">
                플레이스 주소
              </span>

              <button
                type="button"
                className="flex items-center justify-between w-full h-11 px-3 border border-black rounded-lg font-bold"
              >
                플레이스 주소 입력 <IoIosArrowForward size={24} />
              </button>
              <input type="hidden" {...method.register("address")} readOnly />
            </label>
            <label className="flex flex-col gap-2">
              <div className="flex items-start gap-1">
                <span className="font-semibold text-[12px] leading-[20px]">
                  플레이스 내용
                </span>
                <span className="text-red-600 leading-none">*</span>
              </div>
              <textarea
                className="font-medium h-[148px] rounded-lg border border-gray-200 p-4 placeholder:text-gray-400"
                placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
                {...method.register("contents", {
                  required: true,
                  minLength: {
                    value: 1,
                    message: "플레이스 내용을 입력해 주세요",
                  },
                })}
              />
            </label>
          </div>
          <button
            className="h-12 font-bold bg-[#2974E5] text-white text-[18px] leading-[24px] rounded-lg disabled:bg-gray-300 disabled:text-gray-100"
            disabled={!method.formState.isValid || !method.formState.isDirty}
            onClick={(e) => logSubmit(e)}
          >
            로그 등록
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
