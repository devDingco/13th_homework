"use client";

import { UploadFileDocument } from "@/commons/graphql/graphql";
import { isValidFile } from "@/commons/libraries/isValidFile";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useRef } from "react";
import add_image from "@/assets/add_image.png";
import { DeleteOutlined } from "@ant-design/icons";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

type UploadImageProps = {
  idx: number;
  imageUrl: string;
  setImageUrls: Function;
};

export default function UploadImage(props: UploadImageProps) {
  const { idx, imageUrl, setImageUrls } = props;

  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadFile] = useMutation(UploadFileDocument);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    if (!isValidFile(file)) return;

    const result = await uploadFile({ variables: { file } });
    setImageUrls((prev: string[]) => {
      const newUrls = [...prev];
      newUrls[idx] = result.data?.uploadFile.url as string;
      return newUrls;
    });
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const onClickDeleteImage = (event: MouseEvent<HTMLButtonElement>) => {
    setImageUrls((prev: string[]) => {
      const newUrls = [...prev];
      newUrls[idx] = "";
      return newUrls;
    });
  };

  return (
    <>
      <div>
        {imageUrl ? (
          <div className="group relative">
            <img
              src={`https://storage.googleapis.com/${imageUrl}`}
              alt="등록된이미지"
              className="h-40 w-40 object-cover"
              width={0}
              height={0}
            />
            <button
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 p-1 text-black opacity-0 shadow-lg transition-opacity hover:bg-red-500 hover:text-white group-hover:opacity-100"
              onClick={onClickDeleteImage}
            >
              <DeleteOutlined className="text-base" />
            </button>
          </div>
        ) : (
          <Image src={add_image} alt="이미지추가" onClick={onClickImage} />
        )}
      </div>
      <input
        type="file"
        ref={fileRef}
        onChange={onChangeFile}
        className="hidden"
        accept="image/jpeg image/png"
      />
    </>
  );
}
