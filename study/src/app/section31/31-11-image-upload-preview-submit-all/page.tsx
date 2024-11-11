"use client";
import {
  UploadFileDocument,
  CreateBoardDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Button } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function ImageUploadPreviewPage() {
  const [uploadFile] = useMutation(UploadFileDocument); // 파일 업로드 mutation
  const [createBoard] = useMutation(CreateBoardDocument); // 게시글 생성 mutation

  const [imageUrls, setImageUrls] = useState<string[]>(["", "", ""]); // 미리보기 이미지 URL을 저장할 상태
  const [imageFiles, setImageFiles] = useState<File[]>([]); // 서버에 업로드할 이미지 파일을 저장할 상태

  // 파일 업로드 미리보기
  const onChangeFile =
    (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result !== "string") return;

        const tempImageUrl = [...imageUrls];
        tempImageUrl[index] = result as string;
        setImageUrls(tempImageUrl); // 미리보기 이미지 URL을 저장

        const tempImageFiles = [...imageFiles];
        tempImageFiles[index] = file;
        setImageFiles(tempImageFiles); // 서버에 업로할 파일을 저장
      };
    };

  // 게시글 등록하기
  const onClickSubmit = async () => {
    // 1. 이미지 파일 서버로 업로드

    // 1-1) await 매번 실행하여 기다리기 - 비효율적
    // const resultFile1 = await uploadFile({
    //   variables: { file: imageFiles[0] },
    // });
    // const resultFile2 = await uploadFile({
    //   variables: { file: imageFiles[1] },
    // });
    // const resultFile3 = await uploadFile({
    //   variables: { file: imageFiles[2] },
    // });
    // const resultUrls = [resultFile1.data?.uploadFile.url ?? "", resultFile2.data?.uploadFile.url ?? "", resultFile3.data?.uploadFile.url ?? ""];

    // for문 내에서는 await 쓰지 않는것이 좋다.
    // 1-2) Promise.all을 사용하여 이미지 파일 서버로 업로드 - 효율적
    // const resultUrls = await Promise.all([
    //   uploadFile({ variables: { file: imageFiles[0] } }),
    //   uploadFile({ variables: { file: imageFiles[1] } }),
    //   uploadFile({ variables: { file: imageFiles[2] } }),
    // ]);

    // 업로드된 이미지 URL 을 배열로 저장
    // const uploadImageUrls = resultUrls.map(
    //   (result) => result.data?.uploadFile.url ?? ""
    // );

    // 1-3) Promise.all 리팩토링
    const resultUrls = await Promise.all(
      imageFiles.map((file) => uploadFile({ variables: { file } }))
    );
    const uploadImageUrls = resultUrls
      .map((result) => result.data?.uploadFile.url ?? "")
      .filter((url) => url !== ""); // url이 없는 경우 제외

    // 2. 게시글 등록하기
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: "김민준",
          password: "1234",
          title: "제목입니다람쥐",
          contents: "내용입니다람쥐",
          images: uploadImageUrls,
        },
      },
    });
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-8">
      <input type="file" onChange={onChangeFile(0)} />
      <input type="file" onChange={onChangeFile(1)} />
      <input type="file" onChange={onChangeFile(2)} />
      {imageUrls[0] !== "" && (
        // 가짜 URL로 이미지를 미리보기 처리할것이기 때문에 url 앞쪽에 img 서버주소를 붙여줄 필요가 없다.
        <Image
          src={imageUrls[0]}
          alt="이미지"
          style={{ width: "200px" }}
          width="200"
          height="200"
        />
      )}
      {imageUrls[1] !== "" && (
        // 가짜 URL로 이미지를 미리보기 처리할것이기 때문에 url 앞쪽에 img 서버주소를 붙여줄 필요가 없다.
        <Image
          src={imageUrls[1]}
          alt="이미지"
          style={{ width: "200px" }}
          width="200"
          height="200"
        />
      )}
      {imageUrls[2] !== "" && (
        // 가짜 URL로 이미지를 미리보기 처리할것이기 때문에 url 앞쪽에 img 서버주소를 붙여줄 필요가 없다.
        <Image
          src={imageUrls[2]}
          alt="이미지"
          style={{ width: "200px" }}
          width="200"
          height="200"
        />
      )}
      <Button
        size="large"
        variant="solid"
        color="primary"
        onClick={onClickSubmit}
      >
        게시글 등록하기
      </Button>
    </div>
  );
}
