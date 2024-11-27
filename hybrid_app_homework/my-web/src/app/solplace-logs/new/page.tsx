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

    // 파일 크기 제한 (5MB 이하)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return alert("파일 크기는 5MB 이하로 등록 가능합니다.");
    }

    const base64 = await toBase64(file);
    setImageUrl((prev) => [...prev, base64]);
  };

  const logSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("로그 등록", method.getValues(), imageUrl);
  };

  return (
    <>
      <input
        type="file"
        ref={imgFileRef}
        hidden
        onChange={(e) => imgUpload(e)}
      />
      <div className="grid grid-cols-[1fr_3fr] p-[1.25rem_0_1.25rem_1.25rem]">
        <button
          type="button"
          className="w-[6.25rem] h-[6.25rem] bg-gray-50 flex flex-col items-center justify-center text-[0.75rem] lading-[1.25rem] rounded-lg text-gray-600"
          onClick={() => imgUploadClick()}
        >
          <IoIosAdd size={24} />
          사진 등록
        </button>

        <div className="overflow-x-auto whitespace-nowrap pr-[3.125rem]">
          {imageUrl.map((url, index) => (
            <div
              key={url + index}
              className="relative inline-block align-top ml-3 border border-gray-200 rounded-lg"
            >
              <button
                type="button"
                className="absolute right-2 top-2 w-5 h-5 rounded-full bg-[rgba(0,0,0,0.4)]"
                onClick={() => {
                  setImageUrl((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <IoIosClose size={20} color="white" />
                <span className="blind">사진 삭제</span>
              </button>
              <Image
                className="w-[6.25rem] h-[6.25rem] object-cover rounded-lg"
                key={index}
                src={url}
                alt="이미지"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>

      <FormProvider {...method}>
        <form className="p-5 flex flex-col gap-10 text-[0.875rem] leading-[1.25rem]">
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <div className="flex items-start gap-1">
                <span className="font-semibold text-xs leading-[1.25rem]">
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
              <span className="font-semibold text-xs leading-[1.25rem]">
                플레이스 주소
              </span>
              <input type="number" name="lng" readOnly hidden />
              <input type="number" name="lat" readOnly hidden />
              <input
                type="text"
                {...method.register("address")}
                readOnly
                hidden
              />
              <button
                type="button"
                className="flex items-center justify-between w-full h-11 px-3 border border-black rounded-lg font-bold"
              >
                플레이스 주소 입력 <IoIosArrowForward size={24} />
              </button>
            </label>
            <label className="flex flex-col gap-2">
              <div className="flex items-start gap-1">
                <span className="font-semibold text-xs leading-[1.25rem]">
                  플레이스 내용
                </span>
                <span className="text-red-600 leading-none">*</span>
              </div>
              <textarea
                className="font-medium h-[9.25rem] rounded-lg border border-gray-200 p-4 placeholder:text-gray-400"
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
            className="h-12 font-bold bg-[#2974E5] text-white text-lg leading-[1.5rem] rounded-lg disabled:bg-gray-300 disabled:text-gray-100"
            disabled={!method.formState.isValid || !method.formState.isDirty}
            onClick={(e) => logSubmit(e)}
          >
            로그 등록
          </button>
        </form>
      </FormProvider>
    </>
  );
}
