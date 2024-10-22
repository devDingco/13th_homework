"use client";
import { checkValidationFile } from "@/commons/lib/validationFile";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoardWithImg($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

export default function ImageUploadPage() {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createBoard] = useMutation(CREATE_BOARD);

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.name;
    const temp = { ...values };
    temp[type] = event.target.value;
    setValues(temp);
  };

  console.log(values);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          password: "1234",
          images: [imageUrl],
          ...values,
        },
      },
    });
    console.log(result);
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isValid = checkValidationFile(file); // 파일 유효성 검사
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });
    console.log(result.data.uploadFile.url);

    setImageUrl(result.data.uploadFile.url);
  };

  const ImageUpload = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div>
        작성자:{" "}
        <input
          name="writer"
          className="border"
          type="text"
          onChange={(e) => onChangeValue(e)}
        />
        <br />
        제목:{" "}
        <input
          name="title"
          className="border"
          type="text"
          onChange={(e) => onChangeValue(e)}
        />
        <br />
        내용:{" "}
        <input
          name="contents"
          className="border"
          type="text"
          onChange={(e) => onChangeValue(e)}
        />
        <br />
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
        <br />
        <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
      </div>
    </>
  );
}
