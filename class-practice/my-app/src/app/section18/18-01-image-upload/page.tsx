"use client";
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUplaodPage() {
  const [imageUrl, setImageUrl] = useState("");

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeFile = async (event) => {
    const file = event.target.files[0]; // 배열로 들어오는 이유 : <input type="file" multiple />일때 드래그로 여러개 이미지 선택가능
    console.log(file);

    const result = await uploadFile({
      variables: {
        file,
      },
    });

    console.log(result.data.uploadFile.url);
    setImageUrl(result.data.uploadFile.url);
  };
  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
    </>
  );
}
