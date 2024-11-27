"use client";

import useImageUpload from "@/commons/hooks/useImageUpload";

export default function ImageUpload({ id }: { id: string }) {
  const { onClickImage, handleImageUpload, fileRef, imageUrl } =
    useImageUpload(id);
  return (
    <>
      <div onClick={onClickImage}>
        <div className="flex w-[100px] h-[100px] flex-col justify-center items-center rounded-lg bg-gray-100 cursor-pointer">
          {!imageUrl && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-600 text-lg font-normal">+</p>
              <p className="text-gray-600 text-xs font-normal">사진 등록</p>
            </div>
          )}
          {imageUrl && (
            // <img src={`https://storage.googleapis.com/${imageUrl}`} />
            <img src={imageUrl} className="w-full h-full rounded-lg" />
          )}
        </div>
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
