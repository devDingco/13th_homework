'use client'
import { useBoardsWrite } from './hook'
import styles from './style.module.css'
import Image from 'next/image'
import { IBoardWriteprops } from './type'



const BoardsWrite = (props:IBoardWriteprops) => {
  const {authorOnChange, passwordOnChange, titleOnChange, contentOnChange, signupButtonHandler, isAllFilled} = useBoardsWrite(props)

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          {props.isEdit ? "게시글 수정" : "게시글 등록"}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.box}>
            <div className={styles.labelContainer}>
              <label>
                작성자 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input
                className={styles.input1}
                type="text"
                onChange={authorOnChange}
                disabled={props.isEdit}
                defaultValue={props.data?.fetchBoard.writer ?? ""}
              />
              <div id="authorRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
            <div className={styles.labelContainer}>
              <label>
                비밀번호 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input
              className={styles.input1}
                type="password"
                onChange={passwordOnChange}
                disabled={props.isEdit}
              />
              <div id="passwordRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>
  
          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>
                제목 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input className={styles.input2} type="text" onChange={titleOnChange} />
              <div id="titleRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>
  
          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>
                내용 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <textarea onChange={contentOnChange} />
              <div id="contentRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>
  
          <div className={styles.columnBox}>
            <label>주소</label>
            <div className={styles.zipAndButtonContainer}>
              <input className={styles.zipNum} type="text" />{" "}
              <button className={styles.searchZipNum}>우편번호 검색</button>
            </div>
            <input className={styles.input2} type="text" />
            <input className={styles.input2} type="text" />
          </div>
  
          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>유튜브 링크</label>
              <input className={styles.input2} type="text" />
            </div>
          </div>
  
          <div className={styles.boxEnd}>
            <div className={styles.labelContainer2}>
              <label>사진 첨부</label>
              <div className={styles.photoBoxContainer}>
                <div className={styles.flexbox2}>
                  <div className={styles.photoBox}>
                    <Image
                      src="/image/add.png"
                      className={styles.addImageIcon}
                      alt="사진추가"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <div className={styles.photoBoxText}>
                      클릭해서 사진 업로드
                    </div>
                  </div>
                </div>
                {/* 다른 사진 업로드 칸들 */}
              </div>
            </div>
          </div>
  
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>취소</button>
            <button
              className={isAllFilled ? styles.submitButton_active : styles.submitButton}
              type="submit"
              onClick={signupButtonHandler}
            >
              {props.isEdit ? "수정하기" : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}


export default BoardsWrite