"use client";

import styles from "./styles.module.css";

import { Button, Modal } from "antd";
import { useBoardsWrite } from "./hook";
import { IBoardsWriteProps } from "./types";
import DaumPostcodeEmbed from "react-daum-postcode";
import Image from "next/image";
import add from "/public/icon/add.png";
import deleteIcon from "/public/icon/delete.svg";

const BoardsWrite = (props: IBoardsWriteProps) => {
  // const fileRefs = [];
  // for (i = 0; i < 3; i++) {
  //   fileRefs.push(useRef<HTMLInputElement>(null));
  // }

  const {
    onChangeInputs,
    registButton,
    onClickUpdate,
    cancelButton,
    onClickSearchAddress,
    postcodeComplete,
    onChangeDetailAddress,
    onChangeYoutube,
    isActive,
    isOpen,
    zipcode,
    basicAddress,
    detailAddress,
    youtubeLink,
    onClickImage,
    onChangeFile,
    imageUrl,
    fileRefArray,
    isHover,
    onMouseHover,
    onMouseNoneHover,
    onClickRemovePrevImg,
  } = useBoardsWrite(props);

  return (
    <div className={styles.layout}>
      <div className={styles.postTitle}>
        {props.isEdit ? "게시물 수정" : "게시물 등록"}
      </div>
      <div className={styles.part}>
        <div className={styles.group}>
          <div>
            작성자<span className={styles.asterisk}> *</span>
          </div>
          <input
            id="writer"
            className={styles.writer}
            type="text"
            placeholder="작성자 명을 입력해 주세요."
            onChange={onChangeInputs}
            defaultValue={props.data?.fetchBoard.writer ?? ""}
            disabled={props.isEdit ? true : false}
          />
        </div>
        <div className={styles.group}>
          <div>
            비밀번호<span className={styles.asterisk}> *</span>
          </div>
          <input
            id="password"
            className={styles.password}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={onChangeInputs}
            disabled={props.isEdit ? true : false}
          />
        </div>
      </div>

      <div className={styles.part}>
        <div className={styles.group}>
          <div>
            제목<span className={styles.asterisk}> *</span>
          </div>
          <input
            id="title"
            className={styles.title}
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeInputs}
            defaultValue={props.data?.fetchBoard.title}
          />
        </div>
      </div>

      <div className={styles.content_part}>
        <div className={styles.group}>
          <div>
            내용<span className={styles.asterisk}> *</span>
          </div>
          <textarea
            id="contents"
            className={styles.contents}
            rows={10}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeInputs}
            defaultValue={props.data?.fetchBoard.contents}
          ></textarea>
        </div>
      </div>

      <div className={styles.address}>
        <div className={styles.group}>
          주소
          <div className={styles.section}>
            <input
              id={styles.addressNum}
              type="text"
              placeholder="01234"
              defaultValue={zipcode}
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
                <DaumPostcodeEmbed onComplete={postcodeComplete} />
              </Modal>
            )}
          </div>
          <input
            id={styles.addressType}
            type="text"
            placeholder="주소를 입력해 주세요."
            defaultValue={basicAddress}
            readOnly
          />
          <input
            id={styles.addressDetail}
            type="text"
            placeholder="상세주소"
            onChange={onChangeDetailAddress}
            defaultValue={detailAddress}
          />
        </div>
      </div>

      <div className={styles.upload}>
        <div className={styles.group}>
          유튜브 링크
          <input
            id={styles.youtube}
            type="url"
            placeholder="링크를 입력해 주세요."
            onChange={onChangeYoutube}
            value={youtubeLink}
          />
        </div>
      </div>

      <div className={styles.upload}>
        <div className={styles.group}>
          사진 첨부
          <div className={styles.photoGroup}>
            {Array(3)
              .fill("")
              .map((value, index) => {
                return (
                  <>
                    <div
                      className={styles.photobox}
                      onClick={() => onClickImage(index)}
                      key={index}
                      onMouseOver={() => onMouseHover(index)} // index 전달
                      onMouseOut={() => onMouseNoneHover(index)} // index 전달
                    >
                      {imageUrl[index] === "" ? (
                        <>
                          <Image src={add} alt="plus icon" />
                          <p>클릭해서 사진 업로드</p>
                        </>
                      ) : (
                        <>
                          <Image
                            src={deleteIcon}
                            alt="delete icon"
                            className={isHover[index] ? styles.deleteIcon : ""}
                            style={
                              isHover[index]
                                ? { display: "block" }
                                : { display: "none" }
                            }
                            onClick={(event) =>
                              onClickRemovePrevImg(event, index)
                            }
                          />
                          <Image
                            src={`https://storage.googleapis.com/${imageUrl[index]}`}
                            alt="preview"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={styles.prevImage}
                          />
                        </>
                      )}
                    </div>
                    <input
                      id={String(index)}
                      type="file"
                      onChange={onChangeFile}
                      style={{ display: "none" }}
                      ref={fileRefArray[index]}
                      accept="image/jpeg,image/png"
                      // 지정해준 확장자를 제외하고 다른 파일은 선택 자체가 안 되는 명령어
                      // 1. jpg/jpeg 모두 가능, 2. 띄어쓰기 없이 ','로 구분
                    />
                  </>
                );
              })}
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
