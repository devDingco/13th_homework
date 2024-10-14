"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import close from "../../../../public/icons/close.svg";
import useBoardWrite from "./hook";
import { IBoardsWriteProps } from "./types";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

// TODO: 남은 요소들(주소, 링크, 이미지 등) 넣기

const BoardsWrite = (props: IBoardsWriteProps) => {
  const {
    owner,
    password,
    title,
    content,
    zipcode,
    address,
    buttonActiveStyle,
    ownerVaild,
    passwordVaild,
    titleVaild,
    contentVaild,
    onChangeOwner,
    onChangePassword,
    onChangeContent,
    onChangeTitle,
    onClickSubmitPostVaildation,
    onClickEditPostVaildation,
    onClickCancle,
    onToggleModal,
    isOpen,
    handleComplete,
  } = useBoardWrite();
  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <p>게시글 등록하기</p>
        <Image src={close} alt="" width={0} height={0} />
      </div>
      <div className={styles.container}>
        {/* 작성자, 비번 */}
        <div className={styles.title}>
          <div className={styles.input}>
            <div className={styles.labelTitle}>
              <p className={styles.label}>작성자</p>
              <p className={styles.star}>*</p>
            </div>
            <input
              id="postOwner"
              className={styles.info}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeOwner}
              disabled={props.isEdit ? true : false}
              defaultValue={props.data?.fetchBoard?.writer ?? ""}
            />
            <p
              id="postOwnerVaild"
              className={styles.vaildation}
              style={{
                display: !owner ? "block" : "none",
                color: "var(--red, #F66A6A)",
                fontSize: "1.6rem",
                fontWeight: "500",
                lineHeight: "2.4rem",
              }}
            >
              {ownerVaild}
            </p>
          </div>
          <div className={styles.input}>
            <div className={styles.labelTitle}>
              <p className={styles.label}>비밀번호</p>
              <p className={styles.star}>*</p>
            </div>
            <input
              id="postPassword"
              className={styles.info}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
              disabled={props.isEdit ? true : false}
            />
            <p
              id="postPasswordVaild"
              className={styles.vaildation}
              style={{
                display: !password ? "block" : "none",
                color: "var(--red, #F66A6A)",
                fontSize: "1.6rem",
                fontWeight: "500",
                lineHeight: "2.4rem",
              }}
            >
              {passwordVaild}
            </p>
          </div>
        </div>
        <hr className={styles.line} />
        {/* 제목 */}
        <div className={styles.input}>
          <div className={styles.labelTitle}>
            <p className={styles.label}>제목</p>
            <p className={styles.star}>*</p>
          </div>
          <input
            id="postTitle"
            className={styles.info}
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
            defaultValue={props.data?.fetchBoard?.title ?? ""}
          />
          <p
            id="postTitleVaild"
            className={styles.vaildation}
            style={{
              display: !title ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {titleVaild}
          </p>
        </div>
        <hr className={styles.line} />
        {/* 내용 */}
        <div className={styles.input}>
          <div className={styles.labelTitle}>
            <p className={styles.label}>내용</p>
            <p className={styles.star}>*</p>
          </div>
          <textarea
            id="postContent"
            className={styles.infoContent}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
            defaultValue={props.data?.fetchBoard?.contents ?? ""}
          ></textarea>
          <p
            id="postContentVaild"
            className={styles.vaildation}
            style={{
              display: content ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {contentVaild}
          </p>
        </div>
        {/* 주소 */}
        <div className={`${styles.input} ${styles.address}`}>
          <p className={styles.label}>주소</p>
          <div className={styles.addressMail}>
            <input
              id="zipcode"
              className={styles.infoAddress}
              type="text"
              placeholder="01234"
              value={zipcode}
              // defaultValue={props.data?.fetchBoard.boardAddress.zipcode}
            />
            <button className={styles.addressSearch} onClick={onToggleModal}>
              우편번호 검색
            </button>
          </div>
          <input
            id="address"
            className={styles.info}
            type="text"
            placeholder="주소를 입력해 주세요."
            value={address}
            // defaultValue={props.data?.fetchBoard.boardAddress.address}
            readOnly
          />
          <input
            className={styles.info}
            type="text"
            placeholder="상세주소"
            // defaultValue={props.data?.fetchBoard.boardAddress.addressDetail}
            readOnly
          />
        </div>
        <hr className={styles.line} />
        {/* 유튜브 링크 */}
        <div className={styles.input}>
          <p className={styles.label}>유튜브 링크</p>
          <input
            className={styles.info}
            type="text"
            placeholder="링크를 입력해 주세요."
            // defaultValue={props.data?.fetchBoard.youtubeUrl}
          />
        </div>
        <hr className={styles.line} />
        {/* 사진 첨부 */}
        <div className={styles.postUploadeImg}>
          <p className={styles.label}>사진 첨부</p>
          <div className={styles.postUploadImage}>
            {/* map 사용해서 돌려주기 */}
            <button className={styles.uploadImg}>
              <Image src="/icons/add.svg" alt="add" width={0} height={0} />
              <p>사진 업로드</p>
            </button>
          </div>
        </div>
        <div className={styles.postButtonGroup}>
          <button onClick={onClickCancle} className={`${styles.check} ${styles.cancle}`}>
            취소
          </button>
          {props.isEdit ? (
            <button
              id="postEditButton"
              className={`${styles.check} ${styles.submit}`}
              onClick={onClickEditPostVaildation}
            >
              수정하기
            </button>
          ) : (
            <button
              id="postSubmitButton"
              className={`${styles.check} ${styles.submit}`}
              onClick={onClickSubmitPostVaildation}
              style={{ backgroundColor: buttonActiveStyle ? "var(--n-main, #2974e5)" : "var(--gray-300, #c7c7c7)" }}
            >
              등록하기
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal} closable={true}>
          <DaumPostcodeEmbed onComplete={handleComplete} autoClose={true} {...props} />
        </Modal>
      )}
    </div>
  );
};

export default BoardsWrite;
