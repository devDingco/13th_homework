"use client";

import Image from "next/image";
import add from "../../../../public/images/icons/add.svg";
import close from "../../../../public/images/icons/close.svg";
import { useRef, useState } from "react";

export default function ImageUpload() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 이미지
  /*
  const onChangeFile = (index) => async (event) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    console.log("파일", file);

    // 임시 URL 생성
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = (event) => {
      console.log(event.target?.result);

      if (typeof event.target?.result === "string") {
        // 미리보기 URL 업데이트
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = event.target?.result;
        setImageUrls(newImageUrls);

        // 파일 데이터 업데이트
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
      }
    };
  };
  */

  const onChangeFile = (event) => {
    const files = Array.from(event.target.files || []) as File[];
    if (files.length === 0) return; // 파일이 없으면 종료
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    // 미리보기 생성
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageUrls((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    setFiles((prev) => [...prev, ...files]);
    console.log("미리보기 이미지:", imageUrls);
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    console.log("현재선택한 index: ", index);
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="overflow-x-scroll w-full">
      <div className="flex gap-12 w-screen">
        <div
          className="min-w-100 h-100 bg-[#f2f2f2] rounded-lg flex flex-col justify-center items-center hover:cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={onChangeFile}
          />
          <Image src={add} alt="add" />
          <span className="text-[#777777] text-xs font-normal leading-tight">
            사진 등록
          </span>
        </div>

        {/* 이미지 미리보기 */}
        {imageUrls.map((url, index) => (
          <div
            className="relative min-w-100 h-100 rounded-lg"
            key={`image-${url}-${index}`}
          >
            <Image
              src={url}
              alt="미리보기"
              className="min-w-100 h-100 rounded-lg object-cover"
              width={100}
              height={100}
            />
            {/* 삭제하기 */}
            <button
              className="absolute top-8 right-8 w-20 h-20 py-4 bg-black/40 rounded-[100px] justify-center items-center gap-2.5 flex"
              onClick={() => handleRemoveImage(index)}
            >
              <Image src={close} alt="delete" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
