"use client";

import styles from "./styles.module.css";
import Input from "@/components/writeform/Input";
import Textarea from "@/components/writeform/Textarea";
import useBoardNew from "./hook";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import Image from "next/image";

export default function BoardNew(props) {
  const {
    data,
    juso,
    registerCheck,
    errorMessage,
    isModalOpen,
    youtubeUrl,
    fileRef,
    imageUrl,
    onChangeInput,
    onClickRegister,
    onClickEdit,
    onClickEditCancel,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    onChangeAddress,
    onChangeYoutubeUrl,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
  } = useBoardNew(props);

  return (
    <div className="flex flex-col w-[1280px] gap-10 mx-auto my-0 px-0 py-10">
      <div className="w-full font-bold text-xl leading-7">게시물 등록</div>
      <div className="flex flex-col gap-10">
        <div className="flex gap-10">
          <Input
            id="writer"
            onChange={onChangeInput}
            errorMessage={errorMessage.writer}
            defaultValue={props.isEdit ? data?.fetchBoard.writer : ""}
            disabled={props.isEdit ? true : false}
          />
          <Input
            type="password"
            id="password"
            onChange={onChangeInput}
            errorMessage={errorMessage.password}
          />
        </div>
        <hr className={styles.hr} />
        <Input
          id="title"
          onChange={onChangeInput}
          errorMessage={errorMessage.title}
          defaultValue={props.isEdit ? data?.fetchBoard.title : ""}
        />
        <hr className={styles.hr} />
        <Textarea
          id="contents"
          onChange={onChangeInput}
          errorMessage={errorMessage.contents}
          defaultValue={props.isEdit ? data?.fetchBoard.contents : ""}
        />
        <div className={styles.address_box}>
          <label>주소</label>
          <div className={styles.address_search_box}>
            <input
              className={styles.addressNumber}
              type="text"
              placeholder="01234"
              defaultValue={
                props.isEdit
                  ? data?.fetchBoard.boardAddress.zipcode
                  : juso.zipcode
              }
            />
            <button onClick={showModal}>우편번호 검색</button>
          </div>
          <input
            type="text"
            defaultValue={
              props.isEdit
                ? data?.fetchBoard.boardAddress.address
                : juso.address
            }
            placeholder="주소를 입력해주세요."
          />
          <input
            type="text"
            onChange={onChangeAddress}
            placeholder="상세주소"
            defaultValue={
              props.isEdit
                ? data?.fetchBoard.boardAddress.addressDetail
                : juso.addressDetail
            }
          />
        </div>
        <hr className={styles.hr} />
        <div className={styles.youtube_box}>
          <label>유튜브 링크</label>
          <input
            type="text"
            placeholder="링크를 입력해 주세요."
            name="youtubeUrl"
            onChange={onChangeYoutubeUrl}
            defaultValue={
              props.isEdit ? data?.fetchBoard.youtubeUrl : youtubeUrl
            }
          />
        </div>
        <hr className={styles.hr} />
        <div className={styles.photo_box}>
          <label>사진첨부</label>
          <div className="flex gap-4">
            {[0, 1, 2].map((index) => (
              <div
                className="flex justify-center items-center w-40 h-40 rounded-lg gap-2 relative bg-[#f2f2f2]"
                key={index}
                onClick={() =>
                  imageUrl[index]
                    ? onClickDeleteImage(index)
                    : onClickImage(index)
                }
              >
                <input
                  type="file"
                  ref={(el) => (fileRef.current[index] = el)}
                  onChange={(event) => onChangeFile(event, index)}
                  style={{ display: "none" }}
                  accept="image/jpeg,image/png"
                />
                <Image
                  src={
                    imageUrl[index]
                      ? `https://storage.googleapis.com/${imageUrl[index]}`
                      : "/img/add.svg"
                  }
                  alt="img"
                  fill
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.board_new_button} onClick={onClickEditCancel}>
          취소
        </button>
        <button
          onClick={props.isEdit ? onClickEdit : onClickRegister}
          className={
            registerCheck === true
              ? styles.board_new_button
              : styles.board_new_button_register
          }
          disabled={registerCheck}
        >
          {props.isEdit ? "수정하기" : "등록하기"}
        </button>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          closable={false}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </div>
  );
}
