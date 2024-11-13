"use client";

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "../boardMutation";
import { Spinner } from "../spinner/page"; // 스피너 컴포넌트
import ImageUploadInput from "../imageUploadInput";

const BoardsWrite = (props) => {
  const router = useRouter();
  const params = useParams();

  const boardId = params.boardId;
  console.log("boardId: ", params.boardId);

  // 폼 상태 초기화
  const [writer, setWriter] = useState(props.data?.fetchBoard.writer || "");
  const [title, setTitle] = useState(props.data?.fetchBoard.title || "");
  const [contents, setContents] = useState(
    props.data?.fetchBoard.contents || ""
  );
  const [inputPassword, setInputPassword] = useState("");

  // 에러 메시지 상태 관리
  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  // 이미지 미리보기 및 파일 상태
  const [imageUrls, setImageUrls] = useState(
    props.isEdit
      ? (props.data?.fetchBoard.images || ["", "", ""]).map((url) =>
          url.startsWith("https://")
            ? url
            : `https://storage.googleapis.com/${url}`
        )
      : ["", "", ""]
  );
  const [files, setFiles] = useState<File[]>([]); // 업로드할 파일 배열

  const [loading, setLoading] = useState(false); // 로딩 상태

  // 뮤테이션 설정
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  // const boardId = props.data?.fetchBoard?.id; // 게시글 ID

  // 게시글 등록 함수
  const handleCreate = async () => {
    // 필수 입력 항목 검사
    if (!writer || !inputPassword || !title || !contents) {
      if (!writer) setWriterError("필수입력 사항입니다.");
      if (!inputPassword) setPasswordError("필수입력 사항입니다.");
      if (!title) setTitleError("필수입력 사항입니다.");
      if (!contents) setContentsError("필수입력 사항입니다.");
      return;
    }

    setLoading(true); // 로딩 상태 시작
    try {
      // 이미지 파일을 동시에 업로드
      const uploadResults = await Promise.all(
        files.map((file) => uploadFile({ variables: { file } }))
      );
      const uploadedImageUrls = uploadResults.map(
        (res) => res.data.uploadFile.url
      );

      // 게시글 등록 뮤테이션 실행
      const result = await createBoard({
        variables: {
          createBoardInput: {
            title,
            contents,
            writer,
            password: inputPassword,
            images: uploadedImageUrls,
          },
        },
      });
      alert("게시글이 등록되었습니다.");
      router.push(`/boards/${result.data.createBoard._id}`); // 등록 후 상세 페이지로 이동
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  // 게시글 수정 함수
  const handleUpdate = async () => {
    // 필수 입력 항목 검사
    if (!writer || !inputPassword || !title || !contents) {
      if (!writer) setWriterError("필수입력 사항입니다.");
      if (!inputPassword) setPasswordError("필수입력 사항입니다.");
      if (!title) setTitleError("필수입력 사항입니다.");
      if (!contents) setContentsError("필수입력 사항입니다.");
      return;
    }

    // if (!params.boardId) {
    //   alert("게시글 ID가 없습니다.");
    //   return;
    // }

    setLoading(true); // 로딩 상태 시작
    try {
      // 이미지 파일을 동시에 업로드
      const uploadResults = await Promise.all(
        files.map((file) => uploadFile({ variables: { file } }))
      );
      const uploadedImageUrls = uploadResults.map(
        (res) => res.data.uploadFile.url
      );

      // 게시글 수정 뮤테이션 실행
      await updateBoard({
        variables: {
          boardId: boardId,
          password: inputPassword,
          updateBoardInput: {
            title,
            contents,
            images: uploadedImageUrls,
          },
        },
      });
      alert("게시물이 성공적으로 수정되었습니다.");
      router.push(`/`); // 등록 후 상세 페이지로 이동
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className={styles.layout}>
      {loading && <Spinner />} {/* 로딩 중일 때 스피너 표시 */}
      <div>
        {/* 제목 필드 */}
        <div>
          <label>제목</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
          {titleError && <div className={styles.error}>{titleError}</div>}
        </div>

        {/* 내용 필드 */}
        <div>
          <label>내용</label>
          <textarea
            onChange={(e) => setContents(e.target.value)}
            defaultValue={contents}
          />
          {contentsError && <div className={styles.error}>{contentsError}</div>}
        </div>

        {/* 이미지 업로드 필드 - ImageUploadInput 컴포넌트 사용 */}
        <ImageUploadInput
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          files={files}
          setFiles={setFiles}
        />

        {/* 작성자와 비밀번호 필드 */}
        <div>
          <label>작성자</label>
          <input
            type="text"
            onChange={(e) => setWriter(e.target.value)}
            defaultValue={writer}
            disabled={props.isEdit}
          />
          {writerError && <div className={styles.error}>{writerError}</div>}
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          {passwordError && <div className={styles.error}>{passwordError}</div>}
        </div>
      </div>
      {/* 제출 및 취소 버튼 */}
      <button
        onClick={props.isEdit ? handleUpdate : handleCreate}
        disabled={loading}
      >
        {props.isEdit ? "수정" : "등록"}
      </button>
      <button onClick={() => router.push(`/`)}>취소</button>
    </div>
  );
};

export default BoardsWrite;
