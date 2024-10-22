"use client";
import { checkValidationFile } from "@/commons/lib/validationFile";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useState, useRef } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isValid = checkValidationFile(file); // 파일 유효성 검사
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });
    console.log(result.data.uploadFile.url);

    setImageUrl(result.data.uploadFile.url);
  };

  const ImageUpload = () => {
    // document.getElementById("imgFileInput")?.click();
    // useRef를 사용하는 이유 : ref를 사용하면 DOM에 직접 접근할 수 있기 때문에
    // ref를 사용하지 않으면 document.getElementById("imgFileInput")?.click(); 이런식으로 사용해야함
    fileRef.current?.click();
  };

  return (
    <>
      <div
        className="w-28 h-28 rounded-lg cursor-pointer bg-black text-white flex items-center justify-center"
        onClick={() => ImageUpload()}
      >
        이미지 선택
      </div>
      <input
        ref={fileRef}
        className="hidden"
        type="file"
        onChange={onChangeFile}
        accept="image/jpeg,image/png" // 이미지만 선택 가능
      />
      {imageUrl !== "" && (
        <Image
          id="fileImg"
          src={`https://storage.googleapis.com/${imageUrl}`}
          alt=""
          width="100"
          height="100"
        />
      )}
    </>
  );
}
