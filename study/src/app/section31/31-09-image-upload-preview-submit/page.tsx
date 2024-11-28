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

  const [imageUrl, setImageUrl] = useState<string | null>(null); // 미리보기 이미지 URL을 저장할 상태
  const [imageFile, setImageFile] = useState<File | null>(null); // 서버에 업로드할 이미지 파일을 저장할 상태

  // 파일 업로드 미리보기
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. 이미지 미리보기용 URL 생성 - 가짜 URL 내 브라우저에서만 확인 가능
    // URL.createObjectURL을 사용하여 파일을 읽어온 후, 가짜 URL을 생성하여 이미지 URL로 사용하는 형태
    // 최신 브라우저에서만 접근 가능하다.
    const previewImgUrl = URL.createObjectURL(file);

    // 2. 이미지 미리보기용 URL 생성 - 다른 브라우저에서도 접근 가능하지만 용량이 큰 url
    // fileReader를 사용하여 파일을 읽어온 후, 읽어온 파일을 base64로 변환하여 이미지 URL로 사용하는 형태
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") return;
      setImageUrl(result as string); // 미리보기 이미지 URL을 저장
      setImageFile(file); // 서버에 업로할 파일을 저장
    };
  };

  // 게시글 등록하기
  const onClickSubmit = async () => {
    // 1. 이미지 파일 서버로 업로드
    const resultFile = await uploadFile({
      variables: { file: imageFile },
    });
    // 업로드된 이미지 URL
    const uploadImageUrl = resultFile.data?.uploadFile.url ?? "";

    // 2. 게시글 등록하기
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: "김민준",
          password: "1234",
          title: "제목입니다람쥐",
          contents: "내용입니다람쥐",
          images: [uploadImageUrl],
        },
      },
    });
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-8">
      <input type="file" onChange={onChangeFile} />
      {imageUrl && (
        // 가짜 URL로 이미지를 미리보기 처리할것이기 때문에 url 앞쪽에 img 서버주소를 붙여줄 필요가 없다.
        <Image
          src={imageUrl}
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
