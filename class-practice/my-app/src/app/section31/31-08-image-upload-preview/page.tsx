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

    // const result = await uploadFile({
    //   variables: {
    //     file,
    //   },
    // });
    // console.log(result.data.uploadFile.url);
    // setImageUrl(result.data.uploadFile.url);

    // 1. 임시URL 생성 => (가짜 URL 내 브라우저에서만 접근 가능)
    const result = URL.createObjectURL(file);
    console.log("result", result);

    // 2. 임시URL 생성 => (진짜 URL - 다른 브라우저에서도 접근 가능. 하지만 용량 큼)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log("event.target?.result", event.target?.result);
      if (typeof event.target?.result === "string")
        setImageUrl(event.target?.result);
    };
  };
  return (
    <>
      <input type="file" onChange={onChangeFile} />
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`} /> */}
      <img src={imageUrl} />
    </>
  );
}
