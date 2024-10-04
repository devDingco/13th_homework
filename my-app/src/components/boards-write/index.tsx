"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useMutation, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

const CREATE_QUERY = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;
const UPDATE_QUERY = gql`
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
      updatedAt
    }
  }
`;

function BoardsWrite(props) {
  const params = useParams();
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_QUERY);
  const [updateBoard] = useMutation(UPDATE_QUERY);

  const [errorMessage, setErrorMessage] = useState<IInput>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [validation, setValidation] = useState<IInput>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  interface IInput {
    writer: string;
    password: string;
    title: string;
    contents: string;
  }

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedValidation = {
      ...validation,
      [event.target.name]: event.target.value,
    };

    const isAllFilled = props.isEdit
      ? updatedValidation.title !== "" && updatedValidation.contents !== ""
      : Object.values(updatedValidation).every((value) => value !== "");

    setValidation(updatedValidation);
    setIsActive(isAllFilled);
  };

  const onClickSubmit = async () => {
    try {
      const errors: IInput = {
        writer: "",
        password: "",
        title: "",
        contents: "",
      };

      // 빈 값 검증
      if (!validation.writer) errors.writer = "필수 입력 사항입니다.";
      if (!validation.password) errors.password = "필수 입력 사항입니다.";
      if (!validation.title) errors.title = "필수 입력 사항입니다.";
      if (!validation.contents) errors.contents = "필수 입력 사항입니다.";

      setErrorMessage(errors);

      if (
        validation.writer &&
        validation.password &&
        validation.title &&
        validation.contents
      ) {
        alert("게시글 등록이 가능한 상태입니다!");
        const result = await createBoard({
          variables: {
            createBoardInput: {
              ...validation,
            },
          },
        });
        console.log(result, "등록결과");
        router.push(`/boards/${result.data.createBoard._id}`);
      }
    } catch (error) {
      console.error("에러가 발생하였습니다. 다시 시도해 주세요.", error);
    }
  };

  const onClickEdit = async () => {
    try {
      const checkPassWord = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );
      console.log("작동하나?1");
      const errors: IInput = {
        writer: "",
        password: "",
        title: "",
        contents: "",
      };

      // 빈 값 검증
      if (!validation.writer) errors.writer = "필수 입력 사항입니다.";
      if (!validation.password) errors.password = "필수 입력 사항입니다.";
      if (!validation.title) errors.title = "필수 입력 사항입니다.";
      if (!validation.contents) errors.contents = "필수 입력 사항입니다.";

      setErrorMessage(errors);
      console.log("작동하나2");
      if (checkPassWord && validation.title && validation.contents) {
        const updateVariables = {};
        if (validation.title) updateVariables.title = validation.title;
        if (validation.contents) updateVariables.contents = validation.contents;
        const result = await updateBoard({
          variables: {
            updateBoardInput: {
              ...updateVariables,
            },
            password: checkPassWord,
            boardId: params.boardId,
          },
        });
        console.log(result, "수정결과");
        router.push(`/boards/${params.boardId}`);
      }
    } catch (error) {
      console.log(error.graphQLErrors[0].message);
      alert(error.graphQLErrors[0].message);
    }
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>게시물 등록</header>
      <main className={styles.main}>
        <div className={styles.writer_password_box}>
          <div className={`${styles.inputBox} ${styles.div}`}>
            <label className={styles.inputBox_label} htmlFor="writerInput">
              작성자<span className={styles.span}>*</span>
            </label>
            <input
              className={styles.inputBox_input}
              type="text"
              id="writerInput"
              placeholder="작성자 명을 입력해 주세요"
              name="writer"
              onChange={onChange}
              defaultValue={props.data?.fetchBoard.writer}
              disabled={props.isEdit ? true : false}
            ></input>
            <div className="errorText writerError">{errorMessage.writer}</div>
          </div>
          <div className={`${styles.inputBox} ${styles.div}`}>
            <label className={styles.inputBox_label} htmlFor="passwordInput">
              비밀번호<span className={styles.span}>*</span>
            </label>
            <input
              className={styles.inputBox_input}
              type="text"
              id="passwordInput"
              placeholder={
                props.isEdit ? "********" : "비밀번호를 입력해 주세요."
              }
              name="password"
              onChange={onChange}
              disabled={props.isEdit ? true : false}
            ></input>
            <div className={styles.errroText}>{errorMessage.password}</div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.inputBox}>
          <label className={styles.inputBox_label} htmlFor="titleInput">
            제목<span className={styles.span}>*</span>
          </label>
          <input
            className={styles.inputBox_input}
            type="text"
            id="titleInput"
            placeholder="제목을 입력해 주세요."
            name="title"
            onChange={onChange}
            defaultValue={props.data?.fetchBoard.title}
          ></input>
          <div className={styles.errroText}>{errorMessage.title}</div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.inputBox}>
          <label className={styles.inputBox_label} htmlFor="contentTextarea">
            내용<span className={styles.span}>*</span>
          </label>
          <textarea
            className={styles.contentTextarea}
            placeholder="내용을 입력해주세요."
            name="contents"
            onChange={onChange}
            defaultValue={props.data?.fetchBoard.contents}
          ></textarea>
          <div className={styles.errorText}>{errorMessage.contents}</div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.address_box}>
          <div className={`${styles.inputBox} ${styles.addressNumber}`}>
            <label
              className={styles.inputBox_label}
              htmlFor="addressNumberInput"
            >
              주소
            </label>
            <div className={styles.addressNumberSearchBox}>
              <input
                type="text"
                className={styles.addressNumberSearchBox_input}
                placeholder="01234"
              ></input>
              <div className={styles.addressNumberButton}>우편번호 검색</div>
            </div>
          </div>
          <input type="text" placeholder="주소를 입력해 주세요."></input>
          <input type="text" placeholder="상세주소"></input>
        </div>
        <hr className={styles.hr} />
        <div className={styles.inputBox}>
          <label className={styles.inputBox_label} htmlFor="youtubeInput">
            유튜브 링크
          </label>
          <input
            className={styles.inputBox_input}
            type="text"
            id="youtubeInput"
            placeholder="링크를 입력해 주세요."
          ></input>
        </div>
        <hr className={styles.hr} />
        <div className={styles.inputBox}>
          <label className={styles.inputBox_label}>사진첨부</label>
          <div className={styles.photoCardBox}>
            <div className={styles.photoBox}>
              <div className={styles.photoCard}>
                <Image
                  className={styles.add_img}
                  src="/img/add.png"
                  alt="addImg"
                  width={0}
                  height={0}
                />
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
            <div className={styles.photoBox}>
              <div className={styles.photoCard}>
                <Image
                  className={styles.add_img}
                  src="/img/add.png"
                  alt="addImg"
                  width={0}
                  height={0}
                />
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
            <div className={styles.photoBox}>
              <div className={styles.photoCard}>
                <Image
                  className={styles.add_img}
                  src="/img/add.png"
                  alt="addImg"
                  width={0}
                  height={0}
                />
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <button className={`${styles.button} ${styles.cancel}`}>취소</button>
        <button
          className={`${styles.button} ${styles.register}`}
          onClick={props.isEdit ? onClickEdit : onClickSubmit}
          disabled={!isActive}
          style={{ backgroundColor: isActive === true ? "#2974e5" : "#c7c7c7" }}
        >
          {props.isEdit ? "수정" : "등록"}하기
        </button>
      </footer>
    </div>
  );
}

export default BoardsWrite;
