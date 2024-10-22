import Image from "next/image";
import type { ChangeEvent, RefObject } from "react";

interface IImageUploadProps {
  onClickImage: () => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  fileRef: RefObject<HTMLInputElement>;
  url: string;
}

export default function ImageUpload({
  onClickImage,
  onChangeFile,
  fileRef,
  url,
}: IImageUploadProps) {
  return (
    <div
      className="flex flex-col gap-2 justify-center items-center w-40 h-40 bg-gray-50 relative"
      onClick={onClickImage}
    >
      {!url && (
        <>
          <Image src="/images/icons/add.svg" width={40} height={40} alt="Add" />
          <span className="text-gray-600 text-base font-normal leading-normal">
            클릭해서 사진 업로드
          </span>
        </>
      )}
      <input
        type="file"
        onChange={onChangeFile}
        className="hidden"
        ref={fileRef}
      />
      {url && (
        <Image
          src={`https://storage.googleapis.com/${url}`}
          alt="등록한이미지"
          layout="fill"
          objectFit="cover"
        />
      )}
    </div>
  );
}
