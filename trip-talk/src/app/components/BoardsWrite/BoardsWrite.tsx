"use client";

import styles from "./styles.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../ImageUploader/ImageUploader";
import UseBoardsWrite from "../../../commons/hooks/UseBoardsWrite";
import { IBoardsWriteHook } from "../../../types/components.type";
import {
  BOARDS_WRITE,
  BUTTON,
  INPUT_CHILDREN,
  PLACEHOLDERS,
} from "../../../enums/constants";

export default function BoardsWrite(props: IBoardsWriteHook) {
  const {
    formAction,
    disabledInput,
    disabledButton,
    handleInputChange,
    handleContentChange,
    onSubmit,
    writer,
    password,
    title,
    contents,
  } = UseBoardsWrite(props);
  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form_title}>게시물 {formAction}</div>
        <div className={styles.author_info_wrapper}>
          <div>
            <Input
              isLabel={true}
              id="writer"
              type="text"
              placeholder={PLACEHOLDERS.WRITER}
              isRequired={true}
              children={INPUT_CHILDREN.WRITER}
              onChange={handleInputChange}
              defaultValue={String(props.data?.fetchBoard.writer)}
              disabled={disabledInput}
            />
            {!writer && (
              <div className={styles.required_field}>
                {BOARDS_WRITE.REQUIRED_FIELDS}
              </div>
            )}
          </div>
          <div>
            <Input
              isLabel={true}
              id="password"
              type="password"
              placeholder={PLACEHOLDERS.PASSWORD}
              isRequired={true}
              children={INPUT_CHILDREN.PASSWORD}
              onChange={handleInputChange}
              disabled={disabledInput}
            />
            {!password && (
              <div className={styles.required_field}>
                {BOARDS_WRITE.REQUIRED_FIELDS}
              </div>
            )}
          </div>
        </div>
        <div className={styles.title_wrapper}>
          <Input
            isLabel={true}
            id="title"
            type="text"
            placeholder={PLACEHOLDERS.TITLE}
            isRequired={true}
            children={INPUT_CHILDREN.TITLE}
            onChange={handleInputChange}
            defaultValue={props.data?.fetchBoard.title}
          />
          {!title && (
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
          <textarea
            id="contents"
            placeholder={PLACEHOLDERS.CONTESTS}
            onChange={handleContentChange}
            defaultValue={props.data?.fetchBoard.contents}
          />
          {!contents && (
            <div className={styles.required_field}>
              {BOARDS_WRITE.REQUIRED_FIELDS}
            </div>
          )}
        </div>
        <div className={styles.address_wrapper}>
          <div>
            <div>
              <Input
                isLabel={true}
                type="number"
                placeholder="01234"
                isRequired={false}
                children={INPUT_CHILDREN.ADDRESS}
                defaultValue={String(
                  props.data?.fetchBoard.boardAddress?.zipcode
                )}
              />
            </div>
            <Button color="white">{BUTTON.ZIP_CODE_SEARCH}</Button>
          </div>
          <Input
            isLabel={false}
            type="text"
            placeholder={PLACEHOLDERS.ADDRESS}
            isRequired={false}
            defaultValue={String(props.data?.fetchBoard.boardAddress?.address)}
          />
          <Input
            isLabel={false}
            type="text"
            placeholder={PLACEHOLDERS.DETAIL_ADDRESS}
            isRequired={false}
            defaultValue={String(
              props.data?.fetchBoard.boardAddress?.addressDetail
            )}
          />
        </div>
        <div className={styles.link_wrapper}>
          <Input
            isLabel={true}
            type="url"
            placeholder={PLACEHOLDERS.URL}
            isRequired={false}
            children={INPUT_CHILDREN.URL}
            defaultValue={String(props.data?.fetchBoard.youtubeUrl)}
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
          <Button color="white">{BUTTON.CANCEL}</Button>
          <Button
            type="submit"
            disabled={disabledButton}
            color={disabledButton ? "gray" : "blue"}
          >
            {formAction}
            {BUTTON.ACTION}
          </Button>
        </div>
      </form>
    </>
  );
}
