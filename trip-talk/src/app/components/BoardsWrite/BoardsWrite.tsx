"use client";
import styles from "./styles.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../ImageUploader/ImageUploader";
import { IBoardsWrite } from "../../../types/components.type";
import UseBoardsWrite from "../../../commons/hooks/UseBoardsWrite";

export default function BoardsWrite(props: IBoardsWrite) {
  const {
    formAction,
    disabledInput,
    disabledButton,
    handleInputChange,
    handleContentChange,
    onSubmit,
    boardsWriteProps,
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
              placeholder="작성자 명을 입력해 주세요."
              isRequired={true}
              children="작성자"
              onChange={handleInputChange}
              defaultValue={boardsWriteProps.data?.fetchBoard.writer}
              disabled={disabledInput}
            />
            {!writer && (
              <div className={styles.required_field}>필수입력 사항 입니다.</div>
            )}
          </div>
          <div>
            <Input
              isLabel={true}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              isRequired={true}
              children="비밀번호"
              onChange={handleInputChange}
              disabled={disabledInput}
            />
            {!password && (
              <div className={styles.required_field}>필수입력 사항 입니다.</div>
            )}
          </div>
        </div>
        <div className={styles.title_wrapper}>
          <Input
            isLabel={true}
            id="title"
            type="text"
            placeholder="제목을 입력해 주세요."
            isRequired={true}
            children="제목"
            onChange={handleInputChange}
            defaultValue={boardsWriteProps.data?.fetchBoard.title}
          />
          {!title && (
            <div className={styles.required_field}>필수입력 사항 입니다.</div>
          )}
        </div>
        <div className={styles.content_wrapper}>
          <div>
            <p>내용</p>
            <b>*</b>
          </div>
          <textarea
            id="content"
            placeholder="내용을 입력해 주세요."
            onChange={handleContentChange}
            defaultValue={boardsWriteProps.data?.fetchBoard.contents}
          />
          {!contents && (
            <div className={styles.required_field}>필수입력 사항 입니다.</div>
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
                children="주소"
                defaultValue={boardsWriteProps.data?.fetchBoard.zipcode}
              />
            </div>
            <Button color="white">우편번호 검색</Button>
          </div>
          <Input
            isLabel={false}
            type="text"
            placeholder="주소를 입력해 주세요."
            isRequired={false}
            defaultValue={boardsWriteProps.data?.fetchBoard.address}
          />
          <Input
            isLabel={false}
            type="text"
            placeholder="상세주소"
            isRequired={false}
            defaultValue={boardsWriteProps.data?.fetchBoard.addressDetail}
          />
        </div>
        <div className={styles.link_wrapper}>
          <Input
            isLabel={true}
            type="url"
            placeholder="링크를 입력해 주세요."
            isRequired={false}
            children="유튜브 링크"
            defaultValue={boardsWriteProps.data?.fetchBoard.youtubeUrl}
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
          <Button color="white">취소</Button>
          <Button
            type="submit"
            disabled={disabledButton}
            color={disabledButton ? "gray" : "blue"}
          >
            {formAction}하기
          </Button>
        </div>
      </form>
    </>
  );
}
