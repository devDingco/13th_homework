"use client";
import styles from "./styles.module.css";
import { useBoardWrite } from "./hook";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_TITLE from "@/commons/constants/title";
import { IBoardWriteInput } from "./types";
import {
  ContentsInputForm,
  BoardsWriteInputForm,
} from "./components/input-form/text";
import { TextInputType } from "./components/input-form/types";
import Divider from "@/app/components/commons/divider";
import Modal from "antd/es/modal/Modal";
import DaumPostcodeEmbed from "react-daum-postcode";

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
    onChangeBoardWriteInput,
    onClickSubmit,
    onClickEdit,
    onClickCancel,
    onCompletionSearchAddress,
    showAddressSearchModal,
    requiredInputDescription,
    isActive,
    isAddressModalOpen,
    boardAddress,
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
          <BoardsWriteInputForm
            isRequired={true}
            name="writer"
            type={TextInputType.text}
            title={CONSTANTS_TITLE.WRITER}
            placeholder={CONSTANTS_DESCRIPTION.WRITER}
            errorMessage={requiredInputDescription.writer}
            defaultValue={board.writer ?? ""}
            onChange={onChangeBoardWriteInput}
          />
          <BoardsWriteInputForm
            isRequired={true}
            name="password"
            type={TextInputType.password}
            title={CONSTANTS_TITLE.PASSWORD}
            placeholder={CONSTANTS_DESCRIPTION.PASSWORD}
            errorMessage={requiredInputDescription.password}
            defaultValue={props.isEdit ? "********" : ""}
            onChange={onChangeBoardWriteInput}
          />
        </div>
        <Divider />
        <BoardsWriteInputForm
          isRequired={true}
          name="title"
          type={TextInputType.text}
          title={CONSTANTS_TITLE.TITLE}
          placeholder={CONSTANTS_DESCRIPTION.TITLE}
          errorMessage={requiredInputDescription.title}
          defaultValue={board.title}
          onChange={onChangeBoardWriteInput}
        />
        <Divider />
        <ContentsInputForm
          name="contents"
          title={CONSTANTS_TITLE.CONTENTS}
          placeholder={CONSTANTS_DESCRIPTION.CONTENTS}
          onChange={onChangeBoardWriteInput}
          errorMessage={requiredInputDescription.contents}
          defaultValue={board.contents}
        />
        <div className={styles.AddressFormContainer}>
          <div className={styles.inputFormTitle}>{CONSTANTS_TITLE.ADDRESS}</div>
          <div className={styles.zipCodeContainer}>
            <input
              name="zipcode"
              type="text"
              className={styles.inputFormText}
              placeholder={CONSTANTS_DESCRIPTION.ZIP_CODE}
              value={boardAddress.zipcode ?? ""}
              readOnly
            />
            <button
              className={styles.zipCodeSearchButton}
              onClick={showAddressSearchModal}
            >
              우편번호 검색
            </button>
            {isAddressModalOpen && (
              <Modal
                open={isAddressModalOpen}
                onOk={showAddressSearchModal}
                onCancel={showAddressSearchModal}
              >
                <div>우편 번호 찾기</div>
                <DaumPostcodeEmbed onComplete={onCompletionSearchAddress} />
              </Modal>
            )}
          </div>
          <input
            name="address"
            type="text"
            className={styles.inputFormText}
            placeholder={CONSTANTS_DESCRIPTION.ADDRESS}
            value={boardAddress.address ?? ""}
            readOnly
          />
          <input
            name="addressDetail"
            type="text"
            className={styles.inputFormText}
            onChange={onChangeBoardWriteInput}
            placeholder={CONSTANTS_DESCRIPTION.ADDRESS_DETAIL}
            defaultValue={boardAddress.addressDetail ?? ""}
          />
        </div>
        <Divider />
        <BoardsWriteInputForm
          isRequired={false}
          name="youtubeUrl"
          type={TextInputType.text}
          title={CONSTANTS_TITLE.YOUTUBE_LINK}
          placeholder={CONSTANTS_DESCRIPTION.YOUTUBE_LINK}
          onChange={onChangeBoardWriteInput}
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
