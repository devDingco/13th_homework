// 수정, 등록 컴포넌트

"use client";

import Image from "next/image";
import useBoardsWrite from "./hooks";
import styles from "./styles.module.css";
import InputField from "../input";

export default function BoardsWriteUI(props) {
  const {
    data,
    inputs,
    errorMeg,
    isActive,
    onChangeInputs,
    onClickSubmitBtn,
    OnclickEditBtn,
  } = useBoardsWrite();

  return (
    <div className={styles.css_wrapContainer}>
      <div className={styles.css_wrap}>
        <header className={styles.css_headerDiv}>
          <p>게시글 {props.isEdit ? "수정" : "등록"}</p>
        </header>
        <div className={styles.css_mainDiv}>
          {/* 작성자 비밀번호 */}
          <section className={styles.css_containerWp}>
            <div className={styles.css_inputBox}>
              <div>
                <span className={styles.css_span}>작성자</span>
              </div>
              <InputField
                name="writer"
                disabled={props.isEdit}
                className={styles.css_inputStyleBox}
                type="text"
                placeholder="작성자를 입력해"
                onChange={onChangeInputs}
                defaultValue={data?.fetchBoard?.writer}
              />
              <div className={styles.css_errorColor}>{errorMeg.writer}</div>
            </div>
            <div className={styles.css_inputBox}>
              <div>
                <span className={styles.css_span}>비밀번호</span>
              </div>
              <InputField
                name="password"
                disabled={props.isEdit}
                className={styles.css_inputStyleBox}
                type="text"
                placeholder="비밀번호를 입력해"
                onChange={onChangeInputs}
                defaultValue={props.isEdit ? "******" : inputs.password}
              />
              <div className={styles.css_errorColor}>{errorMeg.password}</div>
            </div>
          </section>
          <hr className={styles.css_hr} />
          {/* 제목 */}
          <section className={styles.css_containerTitle}>
            <div>
              <span className={styles.css_span}>제목</span>
            </div>
            <InputField
              name="title"
              className={styles.css_inputStyleBox}
              type="text"
              placeholder="제목을 입력해 주세요"
              onChange={onChangeInputs}
              defaultValue={data?.fetchBoard?.title}
            />
            <div className={styles.css_errorColor}>{errorMeg.title}</div>
          </section>
          <hr className={styles.css_hr} />
          {/* 내용 */}
          <section className={styles.css_writeBox}>
            <div>
              <span className={styles.css_span}>내용</span>
            </div>
            <textarea
              name="contents"
              type="text"
              placeholder="내용을 입력해 주세요"
              onChange={onChangeInputs}
              defaultValue={data?.fetchBoard?.contents}
            ></textarea>
            <div className={styles.css_errorColor}>{errorMeg.contents}</div>
          </section>
          {/* 주소 */}
          <section className={styles.css_address}>
            <div>
              <span>주소</span>
            </div>
            <div>
              <input
                type="text"
                className={styles.css_addressNum}
                placeholder="01234"
              />
              <button className={styles.css_addressBtn}>우편번호검색</button>
            </div>
            <input
              className={styles.css_inputStyleBox}
              type="text"
              placeholder="주소를 입력해 주세요"
            />
            <input
              className={styles.css_inputStyleBox}
              type="text"
              placeholder="상세주소"
            />
          </section>
          <hr className={styles.css_hr} />
          {/* 유튜브링크 */}
          <section className={styles.css_containerTitle}>
            <div>
              <span>유튜브 링크</span>
            </div>
            <input
              className={styles.css_inputStyleBox}
              type="text"
              placeholder="링크를 입력해 주세요."
            />
          </section>
          <hr className={styles.css_hr} />
          {/* 사진첨부 */}
          <section className={styles.css_address}>
            <div className={styles.css_plusPotoTitle}>
              <span>사진 첨부</span>
            </div>
            <div className={styles.css_addPotoBox}>
              <div className={styles.css_poto}>
                <Image
                  src="/img/VectorPlus.png"
                  alt="plusButton"
                  width={24}
                  height={24}
                  sizes="100vw"
                />
                <p>클릭해서 사진 업로드</p>
              </div>
              <div className={styles.css_poto}>
                <Image
                  src="/img/VectorPlus.png"
                  alt="plusButton"
                  width={24}
                  height={24}
                  sizes="100vw"
                />
                <p>클릭해서 사진 업로드</p>
              </div>
              <div className={styles.css_poto}>
                <Image
                  src="/img/VectorPlus.png"
                  alt="plusButton"
                  width={24}
                  height={24}
                  sizes="100vw"
                />
                <p>클릭해서 사진 업로드</p>
              </div>
            </div>
          </section>
          <section className={styles.css_buttonBox}>
            <button className={styles.noBtn}>취소</button>
            <button
              className={styles.addBtn}
              onClick={props.isEdit ? OnclickEditBtn : onClickSubmitBtn}
              style={{
                backgroundColor: isActive === true ? "yellow" : "gray",
              }}
            >
              {props.isEdit ? "수정" : "등록"}하기
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
