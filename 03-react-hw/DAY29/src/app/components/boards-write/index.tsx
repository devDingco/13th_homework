import { ApolloError, gql, useMutation } from "@apollo/client";
import FormField from "../FormField";
import styles from "../boards/new/new.module.css";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
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

interface BoardFormProps {
  isEdit: boolean;
  data?: any;
  boardId?: string;
}

export default function BoardForm({ isEdit, data, boardId }: BoardFormProps) {
  const router = useRouter();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<FormData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    boardAddress: { zipcode: "", address: "", addressDetail: "" },
    youtubeUrl: "",
    images: [],
  });

  // 초기 데이터 상태 관리 (수정페이지에서)
  const [initialData, setInitialData] = useState<FormData | null>(null);

  // GraphQL 뮤테이션 훅
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  // useEffect: 그려질 때 처음에 딱 한번 실행?함
  useEffect(() => {
    // 수정 모드, 데이터가 존재할 때만 실행
    if (isEdit && data?.fetchBoard) {
      const initialFormData: FormData = {
        writer: data.fetchBoard.writer || "",
        password: "",
        title: data.fetchBoard.title || "",
        contents: data.fetchBoard.contents || "",
        boardAddress: data.fetchBoard.boardAddress || {
          zipcode: "",
          address: "",
          addressDetail: "",
        },
        youtubeUrl: data.fetchBoard.youtubeUrl || "",
        images: data.fetchBoard.images || [],
      };
      // formData와 initialData 상태 업데이트
      setFormData(initialFormData);
      setInitialData(initialFormData);
    }
  }, [isEdit, data]);
  // isEdit와 data를 포함시켜 이 값들이 변경될 때만 효과가 실행되도록 함

  // 입력 필드 변경 핸들러
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 버튼 활성화 여부 결정
  const isButtonEnabled = useMemo(() => {
    if (isEdit) {
      // 수정일때: 하나의 필드라도 변경되었는지 확인
      return Object.keys(formData).some(
        (key) => formData[key] !== initialData?.[key]
      );
    } else {
      // 등록일때: 필수 필드가 채워져 있는지 확인
      return REQUIRED_FIELDS.every(
        (field) => (formData[field] as string).trim() !== ""
      );
    }
  }, [formData, initialData, isEdit]);
  // formData, initialData, isEdit이 변경될 때만 재계산

  // 폼 제출 핸들러
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isButtonEnabled) return;

    const variables = {
      ...(formData.title && { title: formData.title }),
      ...(formData.contents && { contents: formData.contents }),
      ...(formData.youtubeUrl && { youtubeUrl: formData.youtubeUrl }),
      // ...(formData.boardAddress && { boardAddress: formData.boardAddress }),
    };

    try {
      let result;
      if (isEdit) {
        // 수정 모드일 때 비밀번호 입력 받기
        const password = prompt(
          "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
        );

        if (password === null) {
          console.log("비밀번호 입력이 취소.");
          return;
        }

        if (!boardId) {
          console.error("boardId가 없습니다.");
          alert("게시글 ID를 찾을 수 없습니다.");
          return;
        }

        // 수정 로직
        result = await updateBoard({
          variables: {
            updateBoardInput: variables,
            password,
            boardId,
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
      const resultBoardId = isEdit ? boardId : result.data.createBoard._id;
      router.push(`/boards/${resultBoardId}/`);
    } catch (error: unknown) {
      console.error("Error details:", error);

      if (error instanceof ApolloError) {
        console.log("GraphQL errors:", error.graphQLErrors);
        console.log("Network error:", error.networkError);

        const passwordError = error.graphQLErrors.find(
          (err) => err.extensions?.code === "INVALID_PASSWORD"
        );

        if (passwordError) {
          alert("비밀번호가 틀렸습니다. 다시 시도해주세요.");
        } else {
          alert(
            isEdit
              ? "게시글 수정에 실패했습니다."
              : "게시글 등록에 실패했습니다."
          );
        }
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>게시물 {isEdit ? "수정" : "등록"}</nav>
      <form className={styles.게시물등록form} onSubmit={handleSubmit}>
        <div className={styles.작성자입력상자}>
          {/* 작성자 입력 필드 */}
          <FormField
            label="작성자"
            name="writer"
            onChange={handleChange}
            required
            defaultValue={formData.writer}
            disabled={isEdit}
          />
          {/* 비밀번호 입력 필드 */}
          <FormField
            label="비밀번호"
            type="password"
            name="password"
            onChange={handleChange}
            required={!isEdit} // 수정 시 선택적으로 변경 가능
            disabled={isEdit}
          />
        </div>
        {/* 제목 입력 필드 */}
        <FormField
          label="제목"
          name="title"
          onChange={handleChange}
          required
          defaultValue={formData.title}
        />
        {/* 내용 입력 필드 */}
        <FormField
          label="내용"
          name="contents"
          onChange={handleChange}
          required
          defaultValue={formData.contents}
        />
        {/* 주소 입력 필드 */}
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
        {/* 유튜브 링크 입력 필드 */}
        <FormField
          label="유튜브 링크"
          name="youtubeUrl"
          onChange={handleChange}
          defaultValue={formData.youtubeUrl}
        />
        {/* 사진 첨부 기능 */}
        {/* 취소, 등록/수정 버튼 */}
        <div className={styles.취소등록버튼상자}>
          <button type="button" onClick={() => router.back()}>
            취소
          </button>
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
