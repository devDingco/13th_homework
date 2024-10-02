"use client";

import React, { ChangeEvent, useState } from "react";
import ImgUploadBtn from "@/app/boards/new/_components/ImgUploadBtn";
import styles from "./boardNew.module.css";
import "@/app/globals.css";
import { gql, useMutation } from "@apollo/client";
import InputField from "@/components/Input";
import TextareaField from "@/app/boards/new/_components/TextareaField";
import { useRouter } from "next/navigation";
import AddressInput from "./_components/AddressInput";

interface FormData {
  username: string;
  pwd: string;
  title: string;
  content: string;
  zipCode: string;
  address: string;
  detailAddress: string;
}

interface FormErrors {
  username?: string;
  pwd?: string;
  title?: string;
  content?: string;
}

// GraphQL
const CREATE_BOARD = gql`
  mutation CreateBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
  ) {
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
      }
    ) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const BoardsNew: React.FC = () => {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    pwd: "",
    title: "",
    content: "",
    zipCode: "",
    address: "",
    detailAddress: "",
  });

  const [reqerrors, setReqErrors] = useState<FormErrors>({
    username: "",
    pwd: "",
    title: "",
    content: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    setReqErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    const requiredFields = ["username", "pwd", "title", "content"];
    const allFieldsFilled = requiredFields.every(
      (field) => updatedFormData[field as keyof FormData].trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {};
    ["username", "pwd", "title", "content"].forEach((key) => {
      if (formData[key as keyof FormData].trim() === "") {
        newErrors[key as keyof FormErrors] = "필수입력 사항입니다.";
        isValid = false;
      }
    });

    setReqErrors(newErrors);
    return isValid;
  };

  const onClickAdd = async () => {
    if (validateForm()) {
      try {
        const result = await createBoard({
          variables: {
            writer: formData.username,
            password: formData.pwd,
            title: formData.title,
            contents: formData.content,
          },
        });

        console.log("게시글 등록 결과:", result);
        console.log(result.data.createBoard._id); //글번호
        alert("게시글 등록이 완료되었습니다!");

        const pageNum = result.data.createBoard._id;

        setFormData({
          username: "",
          pwd: "",
          title: "",
          content: "",
          zipCode: "",
          address: "",
          detailAddress: "",
        });
        setIsFormValid(false);

        router.push(`/boards/${pageNum}`); //페이지 이동
      } catch (error) {
        console.error("게시글 등록 중 오류 발생:", error);
        alert("에러가 발생하였습니다. 다시 시도해 주세요.(게시글 등록 오류)");
      }
    }
  };

  // 우편번호.....
  const handlePostcodeSearch = () => {
    console.log("우편번호 검색");
  };

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>게시물 등록</nav>
      {/* 작성자, 비밀번호 입력칸 */}
      <div className={styles.작성자입력상자}>
        <InputField
          label="작성자"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="작성자 명을 입력해 주세요."
          required
          error={reqerrors.username}
          className={styles.중간입력창크기}
        />
        <InputField
          label="비밀번호"
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          required
          error={reqerrors.pwd}
          className={styles.중간입력창크기}
        />
      </div>
      <hr />
      {/* 게시글 등록 부분 */}
      <div className={styles.게시글등록전체상자}>
        <InputField
          label="제목"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목을 입력해 주세요."
          required
          error={reqerrors.title}
          className={styles.긴입력창크기}
        />
        <hr />
        {/* 내용 부분*/}
        <TextareaField
          label="내용"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="내용을 입력해 주세요."
          required
          error={reqerrors.content}
          className={styles.내용입력창크기}
          rows={6}
        />
        <hr />
        {/* 주소 부분*/}
        <AddressInput
          zipCode={formData.zipCode}
          address={formData.address}
          detailAddress={formData.detailAddress}
          onZipCodeChange={(e) =>
            setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
          }
          onAddressChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
          onDetailAddressChange={(e) =>
            setFormData((prev) => ({ ...prev, detailAddress: e.target.value }))
          }
          onSearchClick={handlePostcodeSearch}
        />
        <hr />
        {/* 유튜브 링크 부분 */}
        <InputField
          label="유튜브 링크"
          name="youtubeLink"
          value=""
          onChange={() => {}}
          placeholder="링크를 입력해 주세요."
          className={styles.긴입력창크기}
        />
        <hr />
        {/* 사진첨부 부분 */}
        <div className={styles.구분상자}>
          <span>사진 첨부</span>
          <form method="post" encType="multipart/form-data">
            <ImgUploadBtn />
            <ImgUploadBtn />
            <ImgUploadBtn />
          </form>
        </div>
        {/* 취소, 등록하기 버튼 부분 */}
        <div className={styles.취소등록버튼상자}>
          <button>취소</button>
          <button
            onClick={onClickAdd}
            disabled={!isFormValid}
            className={`${styles.등록하기버튼} ${
              isFormValid ? styles.active : styles.disabled
            }`}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardsNew;
