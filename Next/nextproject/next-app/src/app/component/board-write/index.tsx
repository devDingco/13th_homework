import Image from "next/image";
import Input from "../commons/Input";
import styles from "./style.module.css";
import { IBoardWriteProps } from "./types";
import { UseBoardWrite } from "./hook";
import React from "react";
import { Button, Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function BoardWrite(props: IBoardWriteProps) {
  const {
    onChangeInput,
    onClickUpdate,
    onClickGoToList,
    onClickGoToDetail,
    onClickSignup,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    onClickImage,
    onChangeFile,
    onToggleModal,
    handleCpmplete,
    isButtonDisabled,
    nameblank,
    titleblank,
    contentblank,
    passwordblank,
    addressnum,
    address,
    addressDetail,
    isModalOpen,
    data,
    youtubeUrl,
    inputs,
    fileRef,
    imgUrl,
    onClickDelete,
  } = UseBoardWrite(props);

  return (
    <div className={styles.css_layout}>
      <div className={styles.css_header}>
        {props.isEdit ? "게시물 수정" : "게시물 등록"}
      </div>
      <div className={styles.css_input}>
        {/* 작성란 헤더 */}
        <div className={styles.css_inputtop}>
          {/* 작성자 */}
          <div className={styles.css_writer}>
            <label htmlFor="title_id" className={styles.css_nametag}>
              작성자
            </label>
            <Input
              type="text"
              id="name_id"
              placeholder="작성자 명을 입력해 주세요."
              name="name"
              defaultValue={
                props.isEdit ? data?.fetchBoard.writer : inputs.name_id
              } // defaultValue: input tag에서 처음 보여줄 값, input 박스에 값을 입력하면 값이 수정이 됨.
              onChange={onChangeInput}
              disabled={props.isEdit ? true : false}
              className={
                props.isEdit ? styles.disabled_input : styles.css_nameinput
              }
            />
            <div className={styles.css_blankerror}>{nameblank}</div>
          </div>
          {/* 비밀번호 */}
          <div className={styles.css_password}>
            <label htmlFor="title_id" className={styles.css_pwdtag}>
              비밀번호
            </label>
            <Input
              type="password"
              id="password_id"
              placeholder="비밀번호를 입력해 주세요."
              name="pwd"
              defaultValue={props.isEdit ? "******" : inputs.password_id}
              onChange={onChangeInput}
              disabled={props.isEdit ? true : false}
              className={
                props.isEdit ? styles.disabled_input : styles.css_pwdinput
              }
            />
            <div className={styles.css_blankerror}>{passwordblank}</div>
          </div>
        </div>
        <div className={styles.css_line}></div>

        {/* 제목 */}
        <div className={styles.css_titletop}>
          <div className={styles.css_title}>
            제목
            <Input
              defaultValue={
                props.isEdit ? data?.fetchBoard?.title : inputs.title_id
              }
              type="text"
              id="title_id"
              name="title"
              className={styles.css_titleinput}
              placeholder="제목을 입력해 주세요."
              onChange={onChangeInput}
            />
            <div className={styles.css_blankerror}>{titleblank}</div>
          </div>
        </div>
        <div className={styles.css_line}></div>

        {/* 내용 */}
        <div className={styles.css_contenttop}>
          <div className={styles.css_content}>
            내용
            <Input
              defaultValue={
                props.isEdit ? data?.fetchBoard?.contents : inputs.contents_id
              }
              type="text"
              id="contents_id"
              name="content"
              className={styles.css_contentinput}
              placeholder="내용을 입력해 주세요."
              onChange={onChangeInput}
            />
            <div className={styles.css_blankerror}>{contentblank}</div>
          </div>
        </div>

        {/* 주소 */}
        <div className={styles.css_address}>
          <label htmlFor="addressnum_id" className={styles.css_addressnumtag}>
            주소
          </label>
          <div className={styles.css_addressnum}>
            <input
              type="text"
              placeholder="01234"
              className={styles.css_addressnuminput}
              readOnly
              value={addressnum}
              defaultValue={
                props.isEdit ? data?.fetchBoard.boardAddress.zipcode : ""
              } //input tag에서 계속 보여줄 값, input 박스에 값을 입력하면 값이 입력되지 않고 지정해준 value만 계속해서 보여줌
            />

            <Button onClick={onToggleModal} className={styles.css_search}>
              우편번호 검색
            </Button>
            {isModalOpen && (
              <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
                <DaumPostcodeEmbed onComplete={handleCpmplete} />
              </Modal>
            )}
          </div>
          <input
            type="text"
            placeholder="주소를 입력해 주세요."
            className={styles.css_addressinput}
            readOnly
            value={address}
            defaultValue={
              props.isEdit ? data?.fetchBoard.boardAddress.address : ""
            }
          />
          <input
            type="text"
            placeholder="상세주소를 입력해 주세요."
            className={styles.css_addressinput}
            onChange={onChangeAddressDetail}
            defaultValue={
              props.isEdit
                ? data?.fetchBoard?.boardAddress.addressDetail
                : addressDetail
            }
          />
        </div>

        <div className={styles.css_line}></div>

        {/* 링크 */}
        <div className={styles.css_link}>
          <label htmlFor="link_id" className={styles.css_linktag}>
            링크
          </label>
          <input
            type="text"
            placeholder="링크 입력"
            className={styles.css_linkinput}
            onChange={onChangeYoutubeUrl}
            value={youtubeUrl}
            defaultValue={
              props.isEdit ? data?.fetchBoard?.youtubeUrl : youtubeUrl
            }
          />
        </div>
        <div className={styles.css_line}></div>

        {/* 사진 첨부 */}
        <div className={styles.css_picturepart}>
          <div>사진 첨부</div>
          <div className={styles.css_picture}>
            <div
              onClick={onClickImage}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "skyblue",
              }}
            >
              {/* {!isDelete && ( */}
              <input
                type="file"
                onChange={onChangeFile}
                style={{ display: "none" }}
                ref={fileRef}
                accept="iamge/jpeg, image/png"
              />
              {/* )} */}
              <div className={styles.css_imagebox}>
                {imgUrl && (
                  <Image
                    src={`https://storage.googleapis.com/${imgUrl}`}
                    alt="addimage"
                    width={0}
                    height={0}
                    className={styles.css_image}
                    sizes="100vw"
                  />
                )}
              </div>
            </div>
            <div className={styles.css_box}>
              <Image
                src="/assets/Close.png"
                alt="delete"
                width={0}
                height={0}
                className={styles.css_delete}
                onClick={onClickDelete}
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className={styles.css_button}>
          <button
            className={styles.css_cancelbutton}
            onClick={props.isEdit ? onClickGoToDetail : onClickGoToList}
          >
            취소
          </button>
          <Button
            onClick={props.isEdit ? onClickUpdate : onClickSignup}
            className={
              !props.isEdit && isButtonDisabled
                ? `${styles.css_submitbutton} ${styles.disabled}`
                : styles.css_submitbutton
            }
            // className={styles.css_submitbutton}
            disabled={!props.isEdit && isButtonDisabled}
          >
            {props.isEdit ? "수정" : "등록"}하기
          </Button>
        </div>
      </div>
    </div>
  );
}
