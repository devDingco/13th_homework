"use client";
import { checkValidationFile } from "@/commons/libraries/18-03-validation-file";
import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";

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

  const fileRef = useRef();

  const onChangeFile = async (event) => {
    const file = event.target.files[0]; // 배열로 들어오는 이유 : <input type="file" multiple />일때 드래그로 여러개 이미지 선택가능
    console.log(file);

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const result = await uploadFile({
      variables: {
        file,
      },
    });

    console.log(result.data.uploadFile.url);
    setImageUrl(result.data.uploadFile.url);
  };

  const onClickImage = () => {
    // document.getElementById('파일태그아이디')?.click() --순수자바스크립트
    fileRef.current?.click(); //현재 참조하고 있는 파일 인풋태그를 클릭하게 된다.
  };

  return (
    <>
      <div
        style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
        onClick={onClickImage}
      >
        이미지선택
      </div>
      <input
        type="file"
        onChange={onChangeFile}
        style={{ display: "none" }}
        ref={fileRef}
        accept="image/jpeg,image/png" // 허용할 파일형식들, jeg/jpeg모두 가능, 띄어쓰기없이 콤마로 구분가능
      />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
    </>
  );
}
