"use client";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await uploadFile({ variables: { file } });
    console.log(result.data.uploadFile.url);

    setImageUrl(result.data.uploadFile.url);
  };

  return (
    <>
      <input type="file" onChange={onChangeFile} />
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
