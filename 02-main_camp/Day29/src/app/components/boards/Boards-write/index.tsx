"use client";
import styles from "./styles.module.css";
import { useBoardWrite } from "./hook";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_TITLE from "@/commons/constants/title";
import { IBoardWriteInput } from "./types";
import {
  ContentsInputForm,
  DefaultInputForm,
  RequiredInputForm,
} from "./components/input-form/text";
import { TextInputType } from "./components/input-form/types";
import { AddressInputForm } from "./components/input-form/address-from";
import Divider from "@/app/components/commons/divider";

const BoardsWrite = (props: IBoardWriteInput) => {
  console.log("컴포넌트가 다시 그려집니다.");
  const board = {
    writer: props.data?.fetchBoard.writer,
    title: props.data?.fetchBoard.title,
    contents: props.data?.fetchBoard.contents,
  };

  const pageTitle = props.isEdit
    ? CONSTANTS_TITLE.EDIT
    : CONSTANTS_TITLE.SUBMIT;

  const {
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContents,
    onChangeYoutubeLink,
    onClickSubmit,
    onClickEdit,
    onClickCancel,
    writerErrorMessage,
    passwordErrorMessage,
    titleErrorMessage,
    contentsErrorMessage,
    isActive,
  } = useBoardWrite(props.isEdit);

  const RegisterForm = () => {
    const disabledSubmitButtonStyle = {
      backgroundColor: "#C7C7C7",
      color: "#E4E4E4",
      disabled: "true",
    };

    const submitButtonStyle = {
      backgroundColor: "#2974E5",
      color: "#FFFFFF",
      disabled: "false",
    };

    const buttonAction = props.isEdit ? onClickEdit : onClickSubmit;

    return (
      <>
        <button className={styles.cancelButton} onClick={onClickCancel}>
          취소
        </button>
        <button
          className={styles.submitButton}
          style={isActive ? submitButtonStyle : disabledSubmitButtonStyle}
          onClick={buttonAction}
        >
          {pageTitle}하기
        </button>
      </>
    );
  };

  return (
    <div className={styles.rootContainer}>
      <header className={styles.headerContainer}>게시물 {pageTitle}</header>
      <main className={styles.mainContainer}>
        <div className={styles.userInputForm}>
          <RequiredInputForm
            type={TextInputType.text}
            title={CONSTANTS_TITLE.WRITER}
            placeholder={CONSTANTS_DESCRIPTION.WRITER}
            errorMessage={writerErrorMessage}
            defaultValue={board.writer ?? ""}
            onChange={onChangeWriter}
          />
          <RequiredInputForm
            type={TextInputType.password}
            title={CONSTANTS_TITLE.PASSWORD}
            placeholder={CONSTANTS_DESCRIPTION.PASSWORD}
            errorMessage={passwordErrorMessage}
            defaultValue={props.isEdit ? "********" : ""}
            onChange={onChangePassword}
          />
        </div>
        <Divider />
        <RequiredInputForm
          type={TextInputType.text}
          title={CONSTANTS_TITLE.TITLE}
          placeholder={CONSTANTS_DESCRIPTION.TITLE}
          errorMessage={titleErrorMessage}
          defaultValue={board.title}
          onChange={onChangeTitle}
        />
        <Divider />
        <ContentsInputForm
          title={CONSTANTS_TITLE.CONTENTS}
          placeholder={CONSTANTS_DESCRIPTION.CONTENTS}
          onChange={onChangeContents}
          errorMessage={contentsErrorMessage}
          defaultValue={board.contents}
        />
        <AddressInputForm />
        <Divider />
        <DefaultInputForm
          type={TextInputType.text}
          title={CONSTANTS_TITLE.YOUTUBE_LINK}
          placeholder={CONSTANTS_DESCRIPTION.YOUTUBE_LINK}
          onChange={onChangeYoutubeLink}
        />
        <Divider />
        <PhotoUploadForm />
      </main>
      <footer className={styles.footerContainer}>
        <RegisterForm />
      </footer>
    </div>
  );
};

export default BoardsWrite;

const PhotoUploadForm = () => {
  return (
    <div className={styles.BoardsNew_inputForm}>
      {CONSTANTS_TITLE.UPLOAD_PHOTO}
      <div className={styles.uploadButtonContainer}>
        <UploadButton />
        <UploadButton />
        <UploadButton />
      </div>
    </div>
  );
};

const UploadButton = () => {
  return (
    <div className={styles.uploadImageContainer}>
      <input type="file" id={styles.uploadImage} />
      <div className={styles.uploadDescription}>
        <label htmlFor="uploadImage" id={styles.uploadLabel}>
          <img src="/assets/add.png" />
          클릭해서 사진 업로드
        </label>
      </div>
    </div>
  );
};
