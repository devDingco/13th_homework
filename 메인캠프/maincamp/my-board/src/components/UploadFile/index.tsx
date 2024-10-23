'use client';
import Image from 'next/image';
import { useUploadFile } from './hooks';
import { IUploadImage } from './types';

export default function UploadFileComponent({
  imageUrls,
  onUpdateImageUrls,
}: IUploadImage) {
  const {
    handleImage,
    onClickImg,
    setFileInputRef,
    localImageUrls,
    removeImage,
  } = useUploadFile({
    imageUrls,
    onUpdateImageUrls,
  });

  return (
    <div className="flex gap-10 w-full items-center">
      <div className="flex flex-col gap-2 mb-5 flex-1">
        <p>사진 첨부</p>
        <div className="flex gap-3 cursor-pointer">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="relative flex w-40 h-40 flex-col justify-center items-center gap-2 rounded-md bg-gray-50 group"
              onClick={() => onClickImg(index)} // 각 이미지 클릭
            >
              {localImageUrls[index] && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }} // 삭제 버튼 클릭 시 호출
                  className="absolute top-2 right-2 bg-slate-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:translate-x-0.5"
                >
                  X
                </button>
              )}
              {!localImageUrls[index] ? (
                <>
                  <Image
                    src="/images/add.svg"
                    alt="추가버튼"
                    width={30}
                    height={30}
                  />
                  <span>클릭해서 사진 업로드</span>
                </>
              ) : (
                <Image
                  src={`https://storage.googleapis.com/${localImageUrls[index]}`}
                  width={160}
                  height={160}
                  alt="선택한 사진"
                />
              )}
              <input
                type="file"
                style={{ display: 'none' }}
                ref={(el) => setFileInputRef(el, index)} // 각 input에 고유한 ref 할당
                onChange={(e) => handleImage(e, index)} // 각 인덱스별로 이미지 처리
                accept="image/jpeg, image/png"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
