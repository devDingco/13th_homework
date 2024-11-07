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
import Divider from "@/app/_components/commons/divider";
import Modal from "antd/es/modal/Modal";
import DaumPostcodeEmbed from "react-daum-postcode";
import ImageUploadForm from "./components/image-upload-form";
import { Button, ButtonSize, ButtonVariant } from "@/commons/ui/button";

const BoardsWrite = (props: IBoardWriteInput) => {
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
    boardInput,
    boardAddress,
    fileRefs,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
  } = useBoardWrite(props.isEdit, props.data);

  const RegisterForm = () => {
    const buttonAction = props.isEdit ? onClickEdit : onClickSubmit;

    return (
      <>
        <Button
          size={ButtonSize.large}
          variant={ButtonVariant.tertiary}
          label="취소"
          onClick={onClickCancel}
        ></Button>
        <Button
          size={ButtonSize.large}
          variant={ButtonVariant.primary}
          label={`${pageTitle}하기`}
          onClick={buttonAction}
          disabled={!isActive}
        ></Button>
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
            value={boardInput.writer ?? ""}
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
          value={boardInput.title}
          onChange={onChangeBoardWriteInput}
        />
        <Divider />
        <ContentsInputForm
          name="contents"
          title={CONSTANTS_TITLE.CONTENTS}
          placeholder={CONSTANTS_DESCRIPTION.CONTENTS}
          onChange={onChangeBoardWriteInput}
          errorMessage={requiredInputDescription.contents}
          value={boardInput.contents ?? ""}
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
            <Button
              size={ButtonSize.large}
              variant={ButtonVariant.tertiary}
              label="우편번호 검색"
              onClick={showAddressSearchModal}
            ></Button>
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
            value={boardAddress.addressDetail ?? ""}
          />
        </div>
        <Divider />
        <BoardsWriteInputForm
          isRequired={false}
          name="youtubeUrl"
          type={TextInputType.text}
          title={CONSTANTS_TITLE.YOUTUBE_LINK}
          placeholder={CONSTANTS_DESCRIPTION.YOUTUBE_LINK}
          defaultValue={boardInput.youtubeUrl ?? ""}
          onChange={onChangeBoardWriteInput}
        />
        <Divider />
        <ImageUploadForm
          imageUrl={boardInput.images ?? []}
          fileRefs={fileRefs}
          onChangeFile={onChangeFile}
          onClickImage={onClickImage}
          onClickDeleteImage={onClickDeleteImage}
        />
      </main>
      <footer className={styles.footerContainer}>
        <RegisterForm />
      </footer>
    </div>
  );
};

export default BoardsWrite;
