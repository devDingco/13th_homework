"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { IBoardsWriteProps } from "../types";
import { useBoardsWrite } from "./hook";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function BoardsWrite(props: IBoardsWriteProps) {
  const {
    onClickSignup,
    onChangeContent,
    onChangeTitle,
    disabledBtn,
    onChangePw,
    onChangeWriter,
    errorWriter,
    errorPw,
    errorTitle,
    errorContent,
    data,
    showModal,
    isModalOpen,
    handleOk,
    handleCancel,
    handleComplete,
    zonecode,
    address,
    detailAddress,
    onChangeAddress,
    onChangeYoutube,
    imageUrls,
    onChangeFile,
    onClickImage,
    fileRefs,
  } = useBoardsWrite(props);

  const fetchedZonecode = data?.fetchBoard?.boardAddress?.zipcode;
  const fetchedAddress = data?.fetchBoard?.boardAddress?.address;
  const fetchedDetailAddress = data?.fetchBoard?.boardAddress?.addressDetail;

  return (
    <div className={styles.allContainer}>
      {isModalOpen && (
        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
      <div className={styles.container}>
        <div className={styles.title}>게시글 {props.isEdit ? "수정" : "등록"}</div>
        <div className={styles.writerInfo}>
          <div className={styles.writer}>
            <p>
              작성자<span>*</span>
            </p>
            <input
              onChange={onChangeWriter}
              placeholder="작성자 명을 입력해 주세요."
              defaultValue={props.isEdit ? String(props?.data?.fetchBoard?.writer) : ""}
              style={props.isEdit ? { backgroundColor: "#f2f2f2" } : { backgroundColor: "#ffffff" }}
              disabled={props.isEdit}
            />
            <div className={styles.errorMsg}>{errorWriter}</div>
          </div>
          <div className={styles.writer}>
            <p>
              비밀번호<span>*</span>
            </p>
            <input
              onChange={onChangePw}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              defaultValue={props.isEdit ? "******" : ""}
              style={props.isEdit ? { backgroundColor: "#f2f2f2" } : { backgroundColor: "#ffffff" }}
              disabled={props.isEdit}
            />
            <div className={styles.errorMsg}>{errorPw}</div>
          </div>
        </div>
        <div className={styles.titleArea}>
          <p>
            제목<span>*</span>
          </p>
          <input
            onChange={onChangeTitle}
            placeholder="제목을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.title}
          />
          <div className={styles.errorMsg}>{errorTitle}</div>
        </div>
        <div className={styles.contentArea}>
          <p>
            내용<span>*</span>
          </p>
          <textarea
            onChange={onChangeContent}
            placeholder="내용을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.contents}
          />
          <div className={styles.errorMsg}>{errorContent}</div>
        </div>
        <div className={styles.addressArea}>
          <p>주소</p>
          <div className={styles.postNum}>
            <input placeholder="01234" value={zonecode || fetchedZonecode || ""} />
            <button onClick={showModal}>우편번호 검색</button>
          </div>
          <div className={styles.address}>
            <input placeholder="주소를 입력해 주세요." value={address || fetchedAddress || ""} />
          </div>
          <div className={styles.address}>
            <input
              placeholder="상세주소"
              onChange={onChangeAddress}
              value={detailAddress || fetchedDetailAddress || ""}
            />
          </div>
        </div>
        <div className={styles.youtubeArea}>
          <p>유튜브 링크</p>
          <input placeholder="링크를 입력해 주세요." onChange={onChangeYoutube} />
        </div>
        <div className={styles.fileArea}>
          <p>사진 첨부</p>
          <div className={styles.addFileArea}>
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className={styles.file}>
                {imageUrl ? (
                  <Image
                    src={`https://storage.googleapis.com/${imageUrl}`}
                    alt={`file-${index}`}
                    width={160}
                    height={160}
                    sizes="100vw"
                  />
                ) : (
                  <div className={styles.noImage} onClick={() => onClickImage(index)}>
                    <p>+</p>
                    <p>클릭해서 사진 업로드</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileRefs[index]}
                  multiple
                  style={{ display: "none" }}
                  onChange={(event) => onChangeFile(event, index)}
                  accept="image/*"
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.btnArea}>
          <button>취소</button>
          <button
            onClick={onClickSignup}
            disabled={!props.isEdit && disabledBtn}
            className={!props.isEdit && disabledBtn ? `${styles.unActiveBtn} ${styles.disabled}` : styles.unActiveBtn}
          >
            {props.isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </div>
    </div>
  );
}
