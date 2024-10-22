"use client";

import styles from "./styles.module.css";
import { useBoardsWrite } from "./hooks";
import { IBoardsWriteProps } from "./types";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import Image from "next/image";

function BoardsWrite(props: IBoardsWriteProps) {
  const {
    onChange,
    onClickSubmit,
    onClickEdit,
    isActive,
    errorMessage,
    onToggleModal,
    handleComplete,
    isOpen,
    onChangeAddress,
    address,
    onChangeYouTube,
    onChangeFile,
    onClickImage,
    imageUrl,
    onClickDeleteImage,
  } = useBoardsWrite(props);

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
                disabled={true}
                value={
                  props.isEdit
                    ? props.data?.fetchBoard.boardAddress.zipcode
                    : address?.zipcode
                }
              ></input>
              <div
                onClick={onToggleModal}
                className={styles.addressNumberButton}
              >
                우편번호 검색
              </div>
            </div>
          </div>
          <input
            type="text"
            name="address"
            placeholder="주소를 입력해 주세요."
            value={
              props.isEdit
                ? props.data?.fetchBoard.boardAddress.address
                : address?.address
            }
            disabled={true}
          ></input>
          <input
            onChange={onChangeAddress}
            type="text"
            name="addressDetail"
            placeholder="상세주소"
            defaultValue={props.data?.fetchBoard.boardAddress.addressDetail}
          ></input>
        </div>
        <hr className={styles.hr} />
        <div className={styles.inputBox}>
          <label className={styles.inputBox_label} htmlFor="youtubeInput">
            유튜브 링크
          </label>
          <input
            onChange={onChangeYouTube}
            className={styles.inputBox_input}
            name="youtubeUrl"
            type="text"
            id="youtubeInput"
            placeholder="링크를 입력해 주세요."
            defaultValue={props.data?.fetchBoard.youtubeUrl}
          ></input>
        </div>
        <hr className={styles.hr} />
        <div className={styles.inputBox}>
          <label className={styles.inputBox_label}>사진첨부</label>
          <div className={styles.photoCardBox}>
            {[0, 1, 2].map((index) => (
              <div
                className={styles.photoBox}
                key={index}
                onClick={() => onClickImage(index)}
              >
                <div className={styles.photoCard}>
                  <input
                    type="file"
                    onChange={(event) => onChangeFile(event, index)}
                    style={{ display: "none" }}
                    accept="image/jpeg,image/png"
                  />
                  <button
                    className={styles.photoCardImage}
                    onClick={(event) => onClickDeleteImage(event, index)}
                  >
                    <Image
                      className={styles.photoCardImage}
                      src={`https://storage.googleapis.com/${imageUrl[index]}`}
                      alt="fileImage"
                      width={0}
                      height={0}
                    />
                  </button>
                </div>
              </div>
            ))}
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
      {isOpen && (
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </div>
  );
}

export default BoardsWrite;
