"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import addImage from "@assets/add_image.png";
import { MouseEvent } from "react";
// import { FETCH_BOARD } from "../boardQueries";
import { CREATE_BOARD, UPDATE_BOARD } from "../boardMutation";

// 게시물 작성 페이지를 나타내는 함수입니다.
//아래 props에는 수정페이지연결까지 하면 최종적으로 isEdit과 data가 있게됨
export default function BoardsWrite(props) {
  // props.isEdit;

  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const params = useParams();

  const boardId = params.boardId;
  console.log("boardId: ", params.boardId);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  //등록하는 기능으로 사용
  const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    let hasError = false;

    if (name === "") {
      setNameError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (password === "") {
      setPasswordError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (title === "") {
      setTitleError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (content === "") {
      setContentError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setContentError("");
    }
    console.log("========================", hasError);

    if (!hasError)
      //필수 조건을 다 작성했다면
      try {
        console.log(hasError); //false

        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: name,
              password: password,
              title: title,
              contents: content,
              boardAddress: {
                zipcode: "",
                address: "",
                addressDetail: "",
              },
              images: ["", ""],
            },
          },
        });

        console.log("제목: ", result.data);
        console.log("내용: ", result.data.contents);
        // console.log({ data }.data.createBoard.boardId);
        // console.log("id확인::::::", data?.createBoard._id);
        alert("게시글이 등록되었습니다!");

        router.push(`/boards/${result.data.createBoard._id}`);
      } catch (err) {
        console.error(err);
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
  };

  //작성한 내용 수정하는 기능
  const onClickUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      // 비밀번호 확인하기
      const 입력받은비밀번호 = prompt(
        "글을 작성할 때 입력하셨던 비밀번호를 입력해주세요"
      );
      if (!입력받은비밀번호) {
        alert("비밀번호를 입력해 주세요.");
        return;
      }

      // title과 contents 각각의 객체에 수정된 내용을 담아준다.
      //수정된 내용이 없으면 빈상자로 둠.
      const updateData: { title?: string; contents?: string } = {};
      if (title !== "") updateData.title = title;
      if (content !== "") updateData.contents = content;

      // GraphQL mutation을 통해 호출한 값 result에 담아주기
      const result = await updateBoard({
        variables: {
          updateBoardInput: updateData, // 수정할 데이터만 전달
          boardId: boardId, // boardId는 useParams로 받아온 값
          password: 입력받은비밀번호, // 비밀번호도 함께 전달
        },
      });

      // 수정 완료 알림 및 페이지 이동
      alert("수정이 완료되었습니다.");
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (err) {
      console.error(err);
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles["enroll-subject"]}>
        <div className={styles["enroll-subject-text"]}>
          게시물 {props.isEdit ? "수정" : "등록"}
        </div>
      </div>
      <div className={styles["enroll-row-container"]}>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-row-flex"]}>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>작성자 </div>
                <div className={styles["enroll-required-indicator"]}> *</div>
              </div>
              <input
                type="text"
                value={name}
                className={`${styles["enroll-input"]} ${
                  props.isEdit ? styles["disabled-input"] : ""
                }`}
                onChange={onChangeName}
                defaultValue={props.data?.fetchBoard.name}
                disabled={props.isEdit}
                placeholder={props.isEdit ? "" : "작성자 명을 입력해 주세요."}
              />

              {/* MARK: 아래 처럼 유즈스테이트  에러값의 상태변화 비번, 제목, 내용도 똑같이 넣어주기 */}
              <div className={styles["error-msg"]}>{nameError}</div>
            </div>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>비밀번호</div>
                <div className={styles["enroll-required-indicator"]}> *</div>
              </div>
              <input
                type="password"
                className={`${styles["enroll-input"]} ${
                  props.isEdit ? styles["disabled-input"] : ""
                }`}
                onChange={onChangePassword}
                defaultValue={props.data?.fetchBoard.password}
                disabled={props.isEdit}
                placeholder={props.isEdit ? "" : "비밀번호를 입력해 주세요."}
              />

              <div className={styles["error-msg"]}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles["enroll-border"]}></div>

        {/* 제목 부분 */}
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>제목</div>
            <div className={styles["enroll-required-indicator"]}> *</div>
          </div>
          <input
            type="text"
            className={styles["enroll-input"]}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
          <div className={styles["error-msg"]}>{titleError}</div>
        </div>

        <div className={styles["enroll-border"]}></div>

        {/* 내용 부분 */}
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>내용</div>
            <div className={styles["enroll-required-indicator"]}> *</div>
          </div>
          <textarea
            placeholder="내용을 입력해 주세요."
            className={`${styles["enroll-input"]} ${styles["enroll-textarea"]}`}
            onChange={onChangeContent}
            defaultValue={props.data?.fetchBoard.contents}
          ></textarea>
          <div className={styles["error-msg"]}>{contentError}</div>
        </div>

        {/* 주소 부분 */}
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>주소</div>
          </div>
          <div className={styles["enroll-address-firstrow"]}>
            <input
              type="number"
              className={styles["zipcode-input"]}
              placeholder="12345"
            />
            <button className={styles["zipcode-search-button"]}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles["enroll-input"]}
            type="text"
          />
          <input
            placeholder="상세주소"
            className={styles["enroll-input"]}
            type="text"
          />
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles["enroll-input"]}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <div className={styles["enroll-border"]}></div>

        <div className={styles["enroll-row-section"]}>
          <div>사진 첨부</div>
          <div className={styles["picture-enroll-row"]}>
            <Image src={addImage} alt="이미지추가" />
            <Image src={addImage} alt="이미지추가" />
            <Image src={addImage} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles["enroll-button-container"]}>
        <button className={styles["enroll-cancel-button"]}>취소</button>

        {/* MARK: 수정하고 넣어줘야함  */}

        <button onClick={props.isEdit ? onClickUpdate : onClickSubmit}>
          {props.isEdit ? "수정" : "등록"}하기
        </button>
      </div>
    </div>
  );
}
