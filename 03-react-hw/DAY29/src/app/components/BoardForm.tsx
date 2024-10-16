import { gql, useMutation } from "@apollo/client";
import FormField from "./FormField";
import styles from "../boards/new/new.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

// 게시글 수정을 위한
const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
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

export default function BoardForm({ isEdit, data }) {
  const router = useRouter();
  const params = useParams();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
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

  //게시글 수정 뮤테이션 준비
  const [updateBoard] = useMutation(UPDATE_BOARD);

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
    if (!isButtonEnabled) return;

    const myvariables = {};
    if (formData.title) myvariables.title = formData.title;
    if (formData.contents) myvariables.contents = formData.contents;
    if (formData.youtubeUrl) myvariables.youtubeUrl = formData.youtubeUrl;
    if (formData.boardAddress) myvariables.boardAddress = formData.boardAddress;

    try {
      let result;
      if (isEdit) {
        // 수정하기
        result = await updateBoard({
          variables: {
            updateBoardInput: myvariables,
            password: formData.password,
            boardId: data._id,
          },
        });
        console.log("게시글 수정 성공: ", result);
      } else {
        // 등록 로직
        result = await createBoard({
          variables: {
            createBoardInput: formData,
          },
        });
        console.log("게시글 등록 성공: ", result);
      }

      // 성공 시 상세 페이지로 이동
      const boardId = isEdit ? data._id : result.data.createBoard._id;
      router.push(`/boards/${boardId}/`);
    } catch (error) {
      console.error(error, isEdit ? "게시글 수정 실패" : "게시글 등록 실패");
    }
  };

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>게시물 {isEdit ? "수정" : "등록"}</nav>
      <form className={styles.게시물등록form} onSubmit={handleSubmit}>
        {/* 작성자, 비밀번호 입력 */}
        <div className={styles.작성자입력상자}>
          <FormField
            label="작성자"
            name="writer"
            onChange={handleChange}
            required
            defaultValue={data?.fetchBoard.writer}
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
            {isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </form>
    </div>
  );
}
