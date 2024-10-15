"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./new.module.css";
import FormField from "@/app/components/FormField";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

// 게시글 생성을 위한 GraphQL 뮤테이션 쿼리
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;

// 주소 정보
interface BoardAddress {
  zipcode: string;
  address: string;
  addressDetail: string;
}

// 폼 데이터
interface FormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
  boardAddress?: BoardAddress;
  youtubeUrl?: string;
  images?: string[];
}

// 필수 입력 필드 배열 정의
const REQUIRED_FIELDS: (keyof FormData)[] = [
  "writer",
  "password",
  "title",
  "contents",
];

export default function NewBoardPage() {

  const router = useRouter();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<FormData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    boardAddress: {
      zipcode: "",
      address: "",
      addressDetail: "",
    },
    youtubeUrl: "",
    images: [],
  });

  // 게시글 생성 뮤테이션 준비
  const [createBoard] = useMutation(CREATE_BOARD);

  // 폼 필드의 값이 변경될 때마다 호출되어 formData 상태를 업데이트
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 모든 필수 필드가 채워졌는지 확인하여 버튼 활성화 여부 결정
  const isButtonEnabled = REQUIRED_FIELDS.every(
    (field) => (formData[field] as string).trim() !== ""
  );

  // 폼이 제출될 때 호출되어 게시글 생성 뮤테이션 실행
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isButtonEnabled) {
      try {
        // GraphQL 뮤테이션 실행
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: formData.writer,
              password: formData.password,
              title: formData.title,
              contents: formData.contents,
              // 필요한 경우 다른 필드 추가
            },
          },
        });
        console.log("게시글 등록 성공: ", result);
        // 성공 시 상세 페이지로 이동
        router.push(`/boards/${result.data.createBoard._id}/`);
      } catch (error) {
        console.error(error, "게시글 등록 실패");
      }
    }
  };

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>게시물 등록</nav>
      <form className={styles.게시물등록form} onSubmit={handleSubmit}>
        {/* 작성자, 비밀번호 입력 */}
        <div className={styles.작성자입력상자}>
          <FormField
            label="작성자"
            name="writer"
            onChange={handleChange}
            required
          />
          <FormField
            label="비밀번호"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <hr />
        {/* 게시글 제목 */}
        <FormField label="제목" name="title" onChange={handleChange} required />
        <hr />
        {/* 게시글 내용 */}
        <FormField
          label="내용"
          name="contents"
          onChange={handleChange}
          required
        />
        <hr />
        {/* 주소 입력 */}
        <div className={styles.구분상자}>
          <span>주소</span>
          <div className={styles.우편번호검색상자}>
            <input
              type="text"
              placeholder="01234"
              className={styles.작은입력창크기}
            />
            <button type="button">우편번호 검색</button>
          </div>
          <input
            type="text"
            placeholder="주소를 입력해 주세요."
            className={styles.긴입력창크기}
          />
          <input
            type="text"
            placeholder="상세주소"
            className={styles.긴입력창크기}
          />
        </div>
        <hr />
        {/* 유튜브 링크 */}
        <FormField
          label="유튜브 링크"
          name="youtubeUrl"
          onChange={handleChange}
        />
        <hr />
        {/* 사진 첨부 */}
        <div className={styles.구분상자}>
          <span>사진 첨부</span>
          {/* 사진첨부 컴포넌트 구현 필요 */}
        </div>
        {/* 취소, 등록하기 버튼 */}
        <div className={styles.취소등록버튼상자}>
          <button type="button">취소</button>
          <button
            type="submit"
            className={isButtonEnabled ? styles.등록하기버튼 : styles.disabled}
            disabled={!isButtonEnabled}
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
