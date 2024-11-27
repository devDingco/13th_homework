"use client";

import useImageUpload from "@/commons/hooks/useImageUpload";

export default function ImageUpload() {
  const { onClickImage, handleImageUpload, fileRef, images } = useImageUpload();
  return (
    <>
      <div
        onClick={onClickImage}
        className="flex flex-row gap-2 overflow-x-scroll"
      >
        <div className="flex w-[100px] h-[100px] flex-col justify-center items-center rounded-lg bg-gray-100 flex-shrink-0">
          <p className="text-gray-600 text-lg font-normal">+</p>
          <p className="text-gray-600 text-xs font-normal">사진 등록</p>
        </div>
        {images.map((el) => (
          <img src={el} className="w-[100px] h-[100px] rounded-lg" />
        ))}
      </div>
      <input
        className="hidden"
        type="file"
        onChange={handleImageUpload}
        ref={fileRef}
      />
    </>
  );
}
