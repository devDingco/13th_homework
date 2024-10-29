"use client";

import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import TextArea from "../TextArea/TextArea";
import { usePathname } from "next/navigation";
import ImageUploader from "../ImageUploader/ImageUploader";
import { BOARDS_WRITE } from "../../../constants/constants";
import { IBoardsWriteHook } from "../../../types/components.type";
import useBoardsWrite from "../../../commons/hooks/useBoardsWrite";
import ModalContainer from "../ModalContainer/ModalContainer";
import { useState } from "react";

export default function BoardsWrite(props: IBoardsWriteHook) {
  const [userPassword, setUserPassword] = useState("");
  const {
    handleInputChange,
    onSubmit,
    formData,
    isInputPasswordModalOpen,
    isWrongPasswordModalOpen,
    isEditCompleteModalOpen,
  } = useBoardsWrite(props, userPassword);

  const path: string = usePathname();
  const isEdit = path.includes("edit")
    ? !(formData.title && formData.contents)
    : !(
        formData.writer &&
        formData.password &&
        formData.title &&
        formData.contents
      );

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form_title}>
        게시물 {props.isEdit ? "수정" : "등록"}
      </div>
      <div className={styles.author_info_wrapper}>
        <div>
          <Input
            id="writer"
            required={true}
            onChange={handleInputChange}
            defaultValue={props.data?.fetchBoard.writer as string}
            disabled={props.isEdit}
            isLabel={true}
          />
          {!formData.writer && (
            <div className={styles.required_field}>
              {BOARDS_WRITE.REQUIRED_FIELDS}
            </div>
          )}
        </div>
        <div>
          <Input
            id="password"
            required={true}
            onChange={handleInputChange}
            disabled={props.isEdit}
            isLabel={true}
          />
          {!formData.password && (
            <div className={styles.required_field}>
              {BOARDS_WRITE.REQUIRED_FIELDS}
            </div>
          )}
        </div>
      </div>
      <div className={styles.title_wrapper}>
        <Input
          id="title"
          required={true}
          onChange={handleInputChange}
          defaultValue={props.data?.fetchBoard.title}
          isLabel={true}
        />
        {!formData.title && (
          <div className={styles.required_field}>
            {BOARDS_WRITE.REQUIRED_FIELDS}
          </div>
        )}
      </div>
      <div className={styles.contents_wrapper}>
        <div>
          <p>내용</p>
          <b>*</b>
        </div>
        <TextArea
          id="contents"
          onChange={handleInputChange}
          defaultValue={props.data?.fetchBoard.contents}
        />
        {!formData.contents && (
          <div className={styles.required_field}>
            {BOARDS_WRITE.REQUIRED_FIELDS}
          </div>
        )}
      </div>
      <div className={styles.address_wrapper}>
        <div>
          <div>
            <Input
              id="zip_code"
              required={false}
              defaultValue={
                props.data?.fetchBoard.boardAddress?.zipcode as string
              }
              isLabel={true}
            />
          </div>
          <Button id="zip_code_search" color="white" />
        </div>
        <Input
          required={false}
          id="address"
          defaultValue={props.data?.fetchBoard.boardAddress?.address as string}
          isLabel={false}
        />
        <Input
          required={false}
          id="detail_address"
          defaultValue={
            props.data?.fetchBoard.boardAddress?.addressDetail as string
          }
          isLabel={false}
        />
      </div>
      <div className={styles.link_wrapper}>
        <Input
          required={true}
          id="youtubeUrl"
          onChange={handleInputChange}
          defaultValue={props.data?.fetchBoard.youtubeUrl as string}
          isLabel={true}
        />
      </div>
      <div className={styles.photo_wrapper}>
        <p>사진 첨부</p>
        <div>
          <ImageUploader />
          <ImageUploader />
          <ImageUploader />
        </div>
      </div>
      <div className={styles.button_wrapper}>
        <Button id="cancel" color="white" />
        <Button
          id="submit"
          disabled={isEdit}
          color={isEdit ? "gray" : "blue"}
        />
      </div>
      {isInputPasswordModalOpen && (
        <ModalContainer
          isSwitched={false}
          children="ALERT!!"
          isPrompt={true}
          alertMessage="글을 등록할 때 입력하셨던 비밀번호를 입력해 주세요."
          setUserPassword={setUserPassword}
        />
      )}
      {isWrongPasswordModalOpen && (
        <ModalContainer
          isSwitched={true}
          children="ERROR!!"
          isPrompt={false}
          alertMessage="비밀번호가 일치하지 않습니다."
        />
      )}
      {isEditCompleteModalOpen && (
        <ModalContainer
          isSwitched={false}
          children="ALERT!!"
          isPrompt={false}
          alertMessage="수정 완료."
        />
      )}
    </form>
  );
}
