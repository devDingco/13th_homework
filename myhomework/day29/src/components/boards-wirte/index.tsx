"use client";

import styles from "./styles.module.css";

import { Modal } from "antd";
import { useBoardsWrite } from "./hook";
import { IBoardsWriteProps } from "./types";
import DaumPostcodeEmbed from "react-daum-postcode";

const BoardsWrite = (props: IBoardsWriteProps) => {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    registButton,
    onClickUpdate,
    cancelButton,
    onClickSearchAddress,
    handleComplete,
    onChangeDetailAddress,
    isActive,
    isOpen,
    writername,
    passwordPlaceholder,
    titlePlaceholder,
    contentsPlaceholder,
    adrNum,
    adrType,
    adrDetail,
    youtube,
    zipcode,
    basicAddress,
    detailAddress,
  } = useBoardsWrite(props);

  return (
    <div className={styles.layout}>
      <div className={styles.postTitle}>
        {props.isEdit ? "게시물 수정" : "게시물 등록"}
      </div>
      <div className={styles.part}>
        <div className={styles.group}>
          {" "}
          <div>
            작성자<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.writer}
            type="text"
            placeholder={writername}
            onChange={onChangeWriter}
            defaultValue={props.data?.fetchBoard.writer ?? ""}
            disabled={props.isEdit ? true : false}
          />
        </div>
        <div className={styles.group}>
          {" "}
          <div>
            비밀번호<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.password}
            type="password"
            placeholder={passwordPlaceholder}
            onChange={onChangePassword}
            // defaultValue={props.data?.fetchBoard.password}
            disabled={props.isEdit ? true : false}
          />
        </div>
      </div>

      <div className={styles.part}>
        <div className={styles.group}>
          {" "}
          <div>
            제목<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.title}
            type="text"
            placeholder={titlePlaceholder}
            onChange={onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
        </div>
      </div>

      <div className={styles.content_part}>
        <div className={styles.group}>
          {" "}
          <div>
            내용<span className={styles.asterisk}> *</span>
          </div>
          <textarea
            id={styles.contents}
            rows={10}
            placeholder={contentsPlaceholder}
            onChange={onChangeContent}
            defaultValue={props.data?.fetchBoard.contents}
          ></textarea>
        </div>
      </div>

      <div className={styles.address}>
        <div className={styles.group}>
          {" "}
          주소
          <div className={styles.section}>
            <input
              id={styles.addressNum}
              type="text"
              placeholder={adrNum}
              value={zipcode}
              readOnly
            />
            <button
              className={styles.searchAddress}
              type="button"
              onClick={onClickSearchAddress}
            >
              우편번호 검색
            </button>
            {isOpen && (
              <Modal
                open={true}
                onOk={onClickSearchAddress}
                onCancel={onClickSearchAddress}
              >
                <DaumPostcodeEmbed onComplete={handleComplete} />
              </Modal>
            )}
          </div>
          <input
            id={styles.addressType}
            type="text"
            placeholder={adrType}
            value={basicAddress}
            readOnly
          />
          <input
            id={styles.addressDetail}
            type="text"
            placeholder={adrDetail}
            onChange={onChangeDetailAddress}
            defaultValue={detailAddress}
          />
        </div>
      </div>

      <div className={styles.upload}>
        <div className={styles.group}>
          {" "}
          유튜브 링크
          <input id={styles.youtube} type="url" placeholder={youtube} />
        </div>
      </div>

      <div className={styles.upload}>
        <div className={styles.group}>
          {" "}
          사진 첨부
          <div className={styles.photoGroup}>
            <button className={styles.photobox}>클릭해서 사진 업로드</button>
            <button className={styles.photobox}>클릭해서 사진 업로드</button>
            <button className={styles.photobox}>클릭해서 사진 업로드</button>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.cancel} type="button" onClick={cancelButton}>
          취소
        </button>
        <button
          className={styles.regist}
          type="button"
          onClick={props.isEdit ? onClickUpdate : registButton}
          style={{
            backgroundColor: isActive === true ? "#2974E5" : "#C7C7C7",
          }}
        >
          {props.isEdit ? "수정" : "등록"}하기
        </button>
      </div>
    </div>
  );
};

export default BoardsWrite;
