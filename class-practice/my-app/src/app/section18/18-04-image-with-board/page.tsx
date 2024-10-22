"use client";
import { checkValidationFile } from "@/commons/libraries/18-03-validation-file";
import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

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

  //---------------------------------------------------

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContent] = useState("");

  const onChangeWiter = (event) => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: writer,
          password: "1234",
          title: title,
          contents: contents,
          images: [imageUrl],
        },
      },
    });
    console.log(result);
  };

  return (
    <>
      작성자: <input type="text" onChange={onChangeWiter} /> <br />
      제목: <input type="text" onChange={onChangeTitle} /> <br />
      내용: <input type="text" onChange={onChangeContent} /> <br />
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
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </>
  );
}
