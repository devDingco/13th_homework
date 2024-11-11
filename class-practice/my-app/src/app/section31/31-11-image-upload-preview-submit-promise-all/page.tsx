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
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createBoardWithImage] = useMutation(CREATE_BOARD);

  const onChangeFile = (index) => async (event) => {
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
        const tempUrls = [...imageUrls];
        tempUrls[index] = event.target.result; // 미리보기 주소
        setImageUrls(tempUrls);

        const tempFiles = [...files];
        tempFiles[index] = file;
        setFiles(tempFiles);
      }
    };
  };

  const onClickSubmit = async () => {
    // 1. 이미지 등록하기(upliadFile)
    // 1-1) 안좋은예제 - await를 매번 기다림
    // const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    // const resultFile1 = await uploadFile({ variables: { file: files[2] } });
    // const resultFile2 = await uploadFile({ variables: { file: files[3] } });
    // const resultUrls = [
    //   resultFile0.data.uploadFile.url,
    //   resultFile1.data.uploadFile.url,
    //   resultFile2.data.uploadFile.url,
    // ];

    // 1-2) 좋은예제 - Promise.all사용
    // const results = await Promise.all([
    //   uploadFile({ variables: { file: files[0] } }),
    //   uploadFile({ variables: { file: files[1] } }),
    //   uploadFile({ variables: { file: files[2] } }),
    // ]);
    // console.log(results); // [resultFile0, resultFile1, resultFile2]
    // const resultUrls = results.map((el) => el.data.uploadFile.url); //[url0, url1, url2]

    // 1-3) 좋은예제 - Promise.all 리팩토링
    const results = await Promise.all(
      files.map((el) => uploadFile({ variables: { file: el } })) //files자체가 배열이기때문에 배열기호를 붙이지 않아도 됨
    );

    console.log(results); // [resultFile0, resultFile1, resultFile2]
    const resultUrls = results.map((el) => el.data.uploadFile.url); //[url0, url1, url2]

    // 2. 게시글 등록하기
    const result = await createBoardWithImage({
      variables: {
        createBoardInput: {
          writer: "테스트 작성자",
          password: "1234",
          title: "테스트 제목",
          contents: "졸지 않습니다.",
          images: resultUrls, //resultUrls이 이미 배열형태라서 배열부호 지우고 작성해야함
        },
      },
    });
    console.log("result:", result);
  };

  return (
    <>
      <input type="file" onChange={onChangeFile(0)} />
      <input type="file" onChange={onChangeFile(1)} />
      <input type="file" onChange={onChangeFile(2)} />
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`} /> */}
      <img src={imageUrls[0]} alt="미리보기" />
      <img src={imageUrls[1]} alt="미리보기" />
      <img src={imageUrls[2]} alt="미리보기" />

      <button onClick={onClickSubmit}>게시글 등록하기</button>
    </>
  );
}
