// 수정, 등록 컴포넌트

"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import useBoardsWrite from "./hooks";

export default function BoardsWriteUI(props) {
  const {
    data,
    password,
    contents,
    writer,
    title,
    errorCMeg,
    errorPMeg,
    errorTMeg,
    errorWMeg,
    isActive,
    postCode,
    roadAddress,
    detailAddress,
    youtubeUrl,
    handleChangWriterMeg,
    handleChangTitleMeg,
    handleChangPwMeg,
    handleChangContentsMeg,
    handlerOnclickAdd,
    handlerOnclickEdit,
    isModalOpen,
    isAddressModalOpen,
    handleOk,
    handleCancel,
    isModalContent,
    onClickAddressModal,
    handleComplete,
    onChangDetailAddress,
    onChangYoutubeUrl,
    createResultData,
  } = useBoardsWrite(props);

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
              <input
                disabled={props.isEdit}
                className={styles.css_inputStyleBox}
                type="text"
                placeholder="작성자 명을 입력해 주세요"
                onChange={handleChangWriterMeg}
                value={writer} // 얘를 연결 하지 않는다면 input은 지워지지 않고, 오직 state변수만 초기화된다
              />
              <div className={styles.css_errorColor}>{errorWMeg}</div>
            </div>
            <div className={styles.css_inputBox}>
              <div>
                <span className={styles.css_span}>비밀번호</span>
              </div>
              <input
                disabled={props.isEdit}
                className={styles.css_inputStyleBox}
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                onChange={handleChangPwMeg}
                value={props.isEdit ? "******" : password} // state연결
              />
              <div className={styles.css_errorColor}>{errorPMeg}</div>
            </div>
          </section>
          <hr className={styles.css_hr} />
          {/* 제목 */}
          <section className={styles.css_containerTitle}>
            <div>
              <span className={styles.css_span}>제목</span>
            </div>
            <input
              className={styles.css_inputStyleBox}
              type="text"
              placeholder="제목을 입력해 주세요"
              onChange={handleChangTitleMeg}
              value={title}
            />
            <div className={styles.css_errorColor}>{errorTMeg}</div>
          </section>
          <hr className={styles.css_hr} />
          {/* 내용 */}
          <section className={styles.css_writeBox}>
            <div>
              <span className={styles.css_span}>내용</span>
            </div>
            <textarea
              type="text"
              placeholder="내용을 입력해 주세요"
              onChange={handleChangContentsMeg}
              value={contents}
            ></textarea>
            <div className={styles.css_errorColor}>{errorCMeg}</div>
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
                readOnly
                value={postCode}
              />
              <button
                className={styles.css_addressBtn}
                onClick={onClickAddressModal}
              >
                우편번호검색
              </button>
              {isAddressModalOpen && (
                <Modal
                  title="주소모달"
                  open={isAddressModalOpen}
                  onOk={() => handleOk()}
                  onCancel={handleCancel}
                >
                  <DaumPostcodeEmbed onComplete={handleComplete} />
                </Modal>
              )}
            </div>
            <input
              className={styles.css_inputStyleBox}
              type="text"
              placeholder="주소를 입력해 주세요"
              readOnly
              value={roadAddress}
            />
            <input
              className={styles.css_inputStyleBox}
              type="text"
              placeholder="상세주소"
              onChange={onChangDetailAddress}
              value={detailAddress}
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
              onChange={onChangYoutubeUrl}
              value={youtubeUrl}
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
              onClick={props.isEdit ? handlerOnclickEdit : handlerOnclickAdd}
              style={{
                backgroundColor: isActive === true ? "yellow" : "gray",
              }}
            >
              {props.isEdit ? "수정" : "등록"}하기
            </button>
            {isModalOpen && (
              <Modal
                title="Boards Modal"
                open={isModalOpen}
                onOk={() => {
                  handleOk(createResultData);
                }}
                onCancel={handleCancel}
              >
                <p>{isModalContent}</p>
              </Modal>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
