"use client";

import styles from "./styles.module.css";

import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const myGraphqlSetting = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

const BoardsWrite = (props) => {
  const router = useRouter();
  const params = useParams();
  console.log("Params:", params);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [registInformation] = useMutation(myGraphqlSetting);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  // 수정하기 페이지에서는 작성자와 비밀번호를 입력하지 않아도 수정하기 버튼을 활성화
  useEffect(() => {
    if (props.isEdit && props.data?.fetchBoard) {
      setTitle(props.data.fetchBoard.title || "");
      setContent(props.data.fetchBoard.contents || "");

      // 제목과 내용이 비어있지 않으면 수정 버튼을 활성화
      if (
        props.data.fetchBoard.title?.trim() &&
        props.data.fetchBoard.contents?.trim()
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [props.data, props.isEdit]);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);

    if (props.isEdit) {
      // 수정할 때: 제목과 내용이 입력되어 있는지 확인
      setIsActive(!!event.target.value && !!title && !!content);
    } else {
      // 등록할 때: 작성자, 비밀번호, 제목, 내용이 모두 입력되어 있는지 확인
      setIsActive(!!event.target.value && !!password && !!title && !!content);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (props.isEdit) {
      // 수정할 때: 제목과 내용이 입력되어 있는지 확인
      setIsActive(!!writer && !!title && !!content);
    } else {
      // 등록할 때: 작성자, 비밀번호, 제목, 내용이 모두 입력되어 있는지 확인
      setIsActive(!!writer && !!event.target.value && !!title && !!content);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (props.isEdit) {
      // 수정할 때: 제목과 내용이 입력되어 있는지 확인
      setIsActive(!!event.target.value && !!content);
    } else {
      // 등록할 때: 작성자, 비밀번호, 제목, 내용이 모두 입력되어 있는지 확인
      setIsActive(!!writer && !!password && !!event.target.value && !!content);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    if (props.isEdit) {
      // 수정할 때: 제목과 내용이 입력되어 있는지 확인
      setIsActive(!!title && !!event.target.value);
    } else {
      // 등록할 때: 작성자, 비밀번호, 제목, 내용이 모두 입력되어 있는지 확인
      setIsActive(!!writer && !!password && !!title && !!event.target.value);
    }
  };

  const registButton = async () => {
    try {
      const result = await registInformation({
        variables: {
          createBoardInput: {
            writer: writer,
            password: password,
            title: title,
            contents: content,
          },
        },
      });
      console.log(result);
      console.log(result.data.createBoard._id);
      resetFormData();
      alert("게시글 등록에 성공하였습니다.");

      router.push(`/boards/${result.data.createBoard._id}`);
    } catch {
      alert("에러가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const onClickUpdate = async () => {
    const promptPassword = prompt("비밀번호를 입력해주세요");

    if (!promptPassword) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      const myvariables = {
        boardId: params.boardId,
        password: promptPassword,
        updateBoardInput: {
          title,
          contents: content,
        },
      };

      const result = await updateBoard({ variables: myvariables });

      // 성공적으로 수정된 경우
      alert("수정이 완료되었습니다.");
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      // 오류 로그 추가
      console.error("Update error:", error);

      // error.graphQLErrors가 배열인지 체크 후 에러 메시지 확인
      if (error.graphQLErrors?.some((e) => e.message === "Invalid password")) {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const writername = "작성자 명을 입력해 주세요.";
  const passwordPlaceholder = "비밀번호를 입력해 주세요.";
  const titlePlaceholder = "제목을 입력해 주세요.";
  const contentsPlaceholder = "내용을 입력해 주세요.";
  const adrNum = "01234";
  const adrType = "주소를 입력해 주세요.";
  const adrDetail = "상세주소";
  const youtube = "링크를 입력해 주세요.";

  function resetFormData() {
    // 폼 초기화
    const el = document.querySelectorAll("input, textarea");
    for (let i = 0; i < el.length; i++) {
      const element = el[i] as HTMLInputElement | HTMLTextAreaElement;
      element.value = "";
    }
  }

  const cancelButton = () => {
    resetFormData();
    alert("등록이 취소되었습니다.");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.postTitle}>
        {props.isEdit ? "게시물 수정" : "게시물 등록"}
      </div>
      <div className={styles.part}>
        <div className={styles.group}>
          {" "}
          <div>
            작성자<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.writer}
            type="text"
            placeholder={writername}
            onChange={onChangeWriter}
            defaultValue={props.data?.fetchBoard.writer}
            disabled={props.isEdit ? true : false}
          />
        </div>
        <div className={styles.group}>
          {" "}
          <div>
            비밀번호<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.password}
            type="password"
            placeholder={passwordPlaceholder}
            onChange={onChangePassword}
            defaultValue={props.data?.fetchBoard.password}
            disabled={props.isEdit ? true : false}
          />
        </div>
      </div>

      <div className={styles.part}>
        <div className={styles.group}>
          {" "}
          <div>
            제목<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.title}
            type="text"
            placeholder={titlePlaceholder}
            onChange={onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
        </div>
      </div>

      <div className={styles.content_part}>
        <div className={styles.group}>
          {" "}
          <div>
            내용<span className={styles.asterisk}> *</span>
          </div>
          <textarea
            id={styles.contents}
            rows={10}
            placeholder={contentsPlaceholder}
            onChange={onChangeContent}
            defaultValue={props.data?.fetchBoard.contents}
          ></textarea>
        </div>
      </div>

      <div className={styles.address}>
        <div className={styles.group}>
          {" "}
          주소
          <div className={styles.section}>
            <input id={styles.addressNum} type="text" placeholder={adrNum} />
            <button className={styles.searchAddress} type="button">
              우편번호 검색
            </button>
          </div>
          <input id={styles.addressType} type="text" placeholder={adrType} />
          <input
            id={styles.addressDetail}
            type="text"
            placeholder={adrDetail}
          />
        </div>
      </div>

      <div className={styles.upload}>
        <div className={styles.group}>
          {" "}
          유튜브 링크
          <input id={styles.youtube} type="url" placeholder={youtube} />
        </div>
      </div>

      <div className={styles.upload}>
        <div className={styles.group}>
          {" "}
          사진 첨부
          <div className={styles.photoGroup}>
            <button className={styles.photobox}>클릭해서 사진 업로드</button>
            <button className={styles.photobox}>클릭해서 사진 업로드</button>
            <button className={styles.photobox}>클릭해서 사진 업로드</button>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.cancel} type="button" onClick={cancelButton}>
          취소
        </button>
        <button
          className={styles.regist}
          type="button"
          onClick={props.isEdit ? onClickUpdate : registButton}
          style={{ backgroundColor: isActive === true ? "#2974E5" : "#C7C7C7" }}
        >
          {props.isEdit ? "수정" : "등록"}하기
        </button>
      </div>
    </div>
  );
};

export default BoardsWrite;
