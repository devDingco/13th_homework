"use client";

import Image from "next/image";
import { useBoardsWrite } from "./hook";
import Link from "next/link";
import { useState } from "react";
import { IBoardsWriteProps } from "./types";
import { Button, Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function BoardsWrite(props: IBoardsWriteProps) {
  const {
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onCLickUpdate,
    onClickSignup,
    onChangeYoutubeUrl,

    // 아래부터 주소
    isOpen,
    onToggleModal,
    handleComplete,
    zipcode,
    address,
    addressDetail,
    setAddressDetail,
    setAddress,
    setZipcode,
    data,
    password,

    // showModal,
    // isOpen,
    // handleOk,
    // handleCancel,
  } = useBoardsWrite(props);

  // 그냥 esLint에러 보기싫어서 만든 줄
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isActive, setIsActive] = useState(false);
  // console.log(
  //   setNameError,
  //   setPasswordError,
  //   setTitleError,
  //   setContentError,
  //   setIsActive
  // );

  return (
    <>
      <main className={props.styles.게시물등록섹션}>
        {/* <Link href="/boards/detail">상세 페이지 이동</Link> */}
        <section className={props.styles.게시물등록}>
          <h1>게시물 {props.isEdit ? "수정" : "등록"}</h1>
        </section>

        <form>
          <fieldset className={props.styles.이름과비번입력하는곳}>
            <legend>사용자 정보</legend>

            <div className={props.styles.반쪽인풋섹션}>
              <label className={props.styles.인풋이름}>
                작성자 <span className={props.styles.빨간별}>*</span>
              </label>
              <input
                className={`${props.styles.반쪽인풋} ${
                  props.isEdit ? props.styles.disabled : ""
                }`}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                onChange={onChangeName}
                disabled={props.isEdit}
                defaultValue={props.data?.fetchBoard.writer}
              />

              <span id="작성자경고" className={props.styles.경고글}>
                {nameError}
              </span>
            </div>

            <div className={props.styles.반쪽인풋섹션}>
              <label className={props.styles.인풋이름}>
                비밀번호 <span className={props.styles.빨간별}>*</span>
              </label>
              <input
                className={`${props.styles.반쪽인풋} ${
                  props.isEdit ? props.styles.disabled : ""
                }`}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={onChangePassword}
                disabled={props.isEdit ? true : false}
                defaultValue={props.isEdit ? "******" : password}
              />
              <span id="비밀번호경고" className={props.styles.경고글}>
                {passwordError}
              </span>
            </div>
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.제목입력하는곳}>
            <legend>게시물 제목</legend>
            <label className={props.styles.인풋이름}>
              제목 <span className={props.styles.빨간별}>*</span>
            </label>
            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={onChangeTitle}
              defaultValue={props.data?.fetchBoard.title}
            />
            <span id="제목경고" className={props.styles.경고글}>
              {titleError}
            </span>
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.내용입력하는곳}>
            <legend>게시물 내용</legend>
            <label className={props.styles.인풋이름}>
              내용 <span className={props.styles.빨간별}>*</span>
            </label>
            <textarea
              className={props.styles.많이큰인풋}
              placeholder="내용을 입력해 주세요."
              onChange={onChangeContent}
              defaultValue={props.data?.fetchBoard.contents}
            />

            <span id="내용경고" className={props.styles.경고글}>
              {contentError}
            </span>
          </fieldset>

          <hr className={props.styles.실선} />

          {isOpen && (
            <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </Modal>
          )}
          <fieldset className={props.styles.주소입력하는곳}>
            <legend>주소 정보</legend>
            <label className={props.styles.인풋이름}>주소</label>
            <div className={props.styles.우편번호입력하는곳}>
              <input
                className={props.styles.우편번호인풋}
                type="text"
                placeholder="01234"
                defaultValue={
                  props.isEdit ? data?.fetchBoard.boardAddress.zipcode : ""
                }
                value={zipcode}
                onChange={(event) => setZipcode(event.target.value)}
                // 시작할때 빈값인가?
                // 수정할때 값이 오는가?
                // 수정시 인풋에 적용되는가?
                // 수정되고 튤팁에 적용되는가?
              />
              <button onClick={onToggleModal} className={props.styles.우편버튼}>
                우편번호 검색
              </button>
            </div>

            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="주소를 입력해 주세요."
              defaultValue={
                props.isEdit ? data?.fetchBoard.boardAddress.address : ""
              }
              value={address}
              onChange={(event) => setAddress(event.target.value)}

              // value={address}
            />
            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="상세주소"
              defaultValue={
                data ? data?.fetchBoard.boardAddress.addressDetail : ""
              }
              value={addressDetail}
              onChange={(event) => setAddressDetail(event.target.value)} // 입력값을 상태에 저장
            />
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.링크입력하는곳}>
            <legend>유튜브 링크</legend>
            <label className={props.styles.인풋이름}>유튜브 링크</label>
            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="링크를 입력해 주세요."
              onChange={onChangeYoutubeUrl}
              defaultValue={data?.fetchBoard.youtubeUrl}
            />
            {/* <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={onChangeTitle}
              defaultValue={props.data?.fetchBoard.title}
            /> */}
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.사진첨부하는곳}>
            <legend>사진 첨부</legend>
            <div className={props.styles.업로드박스그룹}>
              <div className={props.styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={props.styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className={props.styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={props.styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className={props.styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={props.styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
            </div>
          </fieldset>

          <div className={props.styles.버튼있는곳}>
            <button className={props.styles.취소버튼}>
              <Link href="/boards">취소</Link>
            </button>
            <button
              className={`${props.styles.등록하기버튼} ${
                isActive ? props.styles.active : ""
              }`}
              onClick={props.isEdit ? onCLickUpdate : onClickSignup}
            >
              {props.isEdit ? "수정" : "등록"}하기
            </button>
            {/* <Button type="primary" onClick={showModal}>
              Open Modal
            </Button>
            <Modal
              title="비밀번호를 입력해주세요."
              open={isOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              비밀번호 입력:
              <input type="password" />
            </Modal> */}
          </div>
        </form>
      </main>
    </>
  );
}
