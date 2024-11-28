"use client";

import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoardWithImage($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function ImageUploadPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState();
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createBoardWithImage] = useMutation(CREATE_BOARD);

  const onChangeFile = async (event) => {
    const file = event.target.files[0];
    console.log("file:", file);

    // const result = await uploadFile({
    //   variables: { file },
    // });
    // console.log(result.data.uploadFile.url);
    // setImageUrl(result.data.uploadFile.url);

    // 1. 임시 URL 생성 (내 브라우저에서만 접근 가능)
    // const result = URL.createObjectURL(file);
    // console.log('🚀 ~ onChangeFile ~ result:', result);

    // 2. 임시 URL 생성 (다른 브라우저에서도 접근 가능, 하지만 용량 큼)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log("event.target?.result", event.target?.result);
      if (typeof event.target?.result === "string") {
        setImageUrl(event.target?.result);
        setFile(file);
      }
    };
  };

  const onClickSubmit = async () => {
    // 1. 이미지 등록하기
    const resultFile = await uploadFile({ variables: { file } });
    const url = resultFile.data.uploadFile.url; // 클라우드 주소
    console.log("url", url);

    // 2. 게시글 등록하기
    const result = await createBoardWithImage({
      variables: {
        createBoardInput: {
          writer: "테스트 작성자",
          password: "1234",
          title: "테스트 제목",
          contents: "졸지 않습니다.",
          images: [url],
        },
      },
    });
    console.log("result:", result);
  };

  return (
    <>
      <input type="file" onChange={onChangeFile} />
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`} /> */}
      <img src={imageUrl} alt="미리보기" />

      <button onClick={onClickSubmit}>게시글 등록하기</button>
    </>
  );
}
