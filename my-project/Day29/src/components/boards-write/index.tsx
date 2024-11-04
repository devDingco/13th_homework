"use client";

import styles from "./styles.module.css";
import Input from "@/components/writeform/Input";
import Textarea from "@/components/writeform/Textarea";
import useBoardNew from "./hook";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function BoardNew(props) {
  const {
    data,
    juso,
    registerCheck,
    errorMessage,
    isModalOpen,
    onChangeInput,
    onClickRegister,
    onClickEdit,
    onClickEditCancel,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    onChangeAddress,
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
              defaultValue={juso.zipcode}
            />
            <button onClick={showModal}>우편번호 검색</button>
          </div>
          <input
            type="text"
            defaultValue={juso.address}
            placeholder="주소를 입력해주세요."
          />
          <input
            type="text"
            onChange={onChangeAddress}
            placeholder="상세주소"
          />
        </div>
        <hr className={styles.hr} />
        <div className={styles.youtube_box}>
          <label>유튜브 링크</label>
          <input type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <hr className={styles.hr} />
        <div className={styles.photo_box}>
          <label>사진첨부</label>
          <div className={styles.add_photo}></div>
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
          등록하기
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
