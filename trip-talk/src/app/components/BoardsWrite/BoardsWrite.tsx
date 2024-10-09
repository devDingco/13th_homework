"use client";

import styles from "./styles.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../ImageUploader/ImageUploader";
import { IBoardsWriteHook } from "../../../types/components.type";
import { BOARDS_WRITE } from "../../../enums/constants";
import { usePathname } from "next/navigation";
import TextArea from "../TextArea/TextArea";
import useBoardsWrite from "../../../commons/hooks/useBoardsWrite";

export default function BoardsWrite(props: IBoardsWriteHook) {
  const { handleInputChange, onSubmit, formData } = useBoardsWrite(props);
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
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form_title}>
          게시물 {props.isEdit ? "수정" : "등록"}
        </div>
        <div className={styles.author_info_wrapper}>
          <div>
            <Input
              id="writer"
              onChange={handleInputChange}
              defaultValue={props.data?.fetchBoard.writer as string}
              disabled={props.isEdit}
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
              onChange={handleInputChange}
              disabled={props.isEdit}
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
            onChange={handleInputChange}
            defaultValue={props.data?.fetchBoard.title}
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
                defaultValue={
                  props.data?.fetchBoard.boardAddress?.zipcode as string
                }
              />
            </div>
            <Button id="zip_code_search" color="white" />
          </div>
          <Input
            id="address"
            defaultValue={
              props.data?.fetchBoard.boardAddress?.address as string
            }
          />
          <Input
            id="detail_address"
            defaultValue={
              props.data?.fetchBoard.boardAddress?.addressDetail as string
            }
          />
        </div>
        <div className={styles.link_wrapper}>
          <Input
            id="url"
            defaultValue={props.data?.fetchBoard.youtubeUrl as string}
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
      </form>
    </>
  );
}
