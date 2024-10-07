"use client";
import styles from "./styles.module.css";
import { useBoardWrite } from "./hook";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_TITLE from "@/commons/constants/title";

const BoardsWrite = (props: any) => {
  const board = {
    writer: props.data?.fetchBoard.writer,
    password: props.data?.fetchBoard.password,
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
    <div className={styles.BoardsNew_rootContainer}>
      <header className={styles.BoardsNew_header}>게시물 {pageTitle}</header>
      <main className={styles.BoardsNew_main}>
        <div className={styles.BoardsNew_UserInputForm}>
          <BasicInputForm
            isRequired={true}
            title={CONSTANTS_TITLE.WRITER}
            placeholder={CONSTANTS_DESCRIPTION.WRITER}
            onChangeHandler={onChangeWriter}
            errorMessage={writerErrorMessage}
            isEdit={props.isEdit}
            defaultValue={board.writer}
          />
          <BasicInputForm
            isRequired={true}
            title={CONSTANTS_TITLE.PASSWORD}
            placeholder={CONSTANTS_DESCRIPTION.PASSWORD}
            onChangeHandler={onChangePassword}
            errorMessage={passwordErrorMessage}
            isEdit={props.isEdit}
            defaultValue={props.isEdit ? "********" : ""}
          />
        </div>
        <Divider />
        <BasicInputForm
          isRequired={true}
          title={CONSTANTS_TITLE.TITLE}
          placeholder={CONSTANTS_DESCRIPTION.TITLE}
          onChangeHandler={onChangeTitle}
          errorMessage={titleErrorMessage}
          defaultValue={board.title}
        />
        <Divider />
        <ContentsInputForm
          title={CONSTANTS_TITLE.CONTENTS}
          placeholder={CONSTANTS_DESCRIPTION.CONTENTS}
          onChangeHandler={onChangeContents}
          errorMessage={contentsErrorMessage}
          defaultValue={board.contents}
        />
        <AddressInputForm />
        <Divider />
        <BasicInputForm
          isRequired={false}
          title={CONSTANTS_TITLE.YOUTUBE_LINK}
          placeholder={CONSTANTS_DESCRIPTION.YOUTUBE_LINK}
        />
        <Divider />
        <PhotoUploadForm />
      </main>
      <footer className={styles.BoardsNew_footer}>
        <RegisterForm />
      </footer>
    </div>
  );
};

export default BoardsWrite;

export const BasicInputForm = (props: any) => {
  if (props.isRequired) {
    return (
      <div id={styles.PostInputForm} className={styles.BoardsNew_inputForm}>
        <div className={styles.inputTitle}>
          {props.title}
          <span className={styles.requiredMark}>*</span>
        </div>
        <TextInput
          isEdit={props.isEdit}
          placeholder={props.placeholder}
          onChangeHandler={props.onChangeHandler}
          defaultValue={props.defaultValue}
          value={props.value}
        />
        <p className={styles.inputError}>{props.errorMessage}</p>
      </div>
    );
  } else {
    return (
      <div id={styles.PostInputForm} className={styles.BoardsNew_inputForm}>
        <div className={styles.inputTitle}>{props.title}</div>
        <TextInput placeholder={props.placeholder} />
      </div>
    );
  }
};

const ContentsInputForm = (props: any) => {
  return (
    <div className={styles.BoardsNew_inputForm}>
      <div className={styles.inputTitle}>
        {props.title}
        <span className={styles.requiredMark}>*</span>
      </div>
      <textarea
        className={styles.inputTextArea}
        placeholder={props.placeholder}
        onChange={props.onChangeHandler}
        defaultValue={props.defaultValue}
        value={props.value}
      ></textarea>
      <p className={styles.inputError}>{props.errorMessage}</p>
    </div>
  );
};

const AddressInputForm = () => {
  return (
    <div className={styles.BoardsNew_inputForm}>
      {CONSTANTS_TITLE.ADDRESS}
      <div className={styles.ZipCodeContainer}>
        <TextInput placeholder={CONSTANTS_DESCRIPTION.ZIP_CODE} />
        <ZipCodeSearchButton />
      </div>
      <TextInput placeholder={CONSTANTS_DESCRIPTION.ADDRESS} />
      <TextInput placeholder={CONSTANTS_DESCRIPTION.ADDRESS_DETAIL} />
    </div>
  );
};

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

const TextInput = (props: any) => {
  return (
    <input
      className={styles.inputText}
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChangeHandler}
      defaultValue={props.defaultValue}
      value={props.value}
      disabled={props.isEdit}
    />
  );
};

export const Divider = () => {
  return <div className={styles.divider}></div>;
};

const ZipCodeSearchButton = () => {
  return <button className={styles.zipCodeSearchButton}>우편번호 검색</button>;
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
