'use client';

import styles from './styles.module.css'
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

const BoardsNew = () => {
  // 입력값 저장하는 상태 설정하기
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 입력값에 문제가 있을 경우 보여줄 에러메세지 저장하는 상태 설정하기
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  //입력값이 하나라도 없는경우 등록하기 버튼 비활성화 확인 상태
  const isButtonDisabled = !name || !password || !title || !content;

  // 변경값 확인하여 상태에 저장하기
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // 등록하기 버튼 눌렀을때 실행되는 함수
  const onClickSignup = () => {
    // 1. 작성자 이름 검증
    const isNameValid = name.trim() !== "";
    setNameError(isNameValid ? "" : "필수입력 사항입니다.");

    // 2. 비밀번호 검증
    const isPasswordValid = password.length > 0;
    setPasswordError(isPasswordValid ? "" : "필수입력 사항입니다.");

    // 3. 제목 검증
    const isTitleValid = title.trim() !== "";
    setTitleError(isTitleValid ? "" : "필수입력 사항입니다.");

    // 4. 내용 검증
    const isContentValid = content.trim() !== "";
    setContentError(isContentValid ? "" : "필수입력 사항입니다.");

    // 5. 모든 필드가 유효한 경우에만 성공 알림
    if (isNameValid && isPasswordValid && isTitleValid && isContentValid) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  return (
  <div className={styles.layout}>
    <div className={styles.enroll_subject}>
      <div className={styles.enroll_subject_text}>게시물 등록</div>
    </div>
    <div className={styles.enroll_row_container}>
      <div className={styles.enroll_row_section}>
        <div className={styles.enroll_row_flex}>
          <div className={styles.flex_half}>
            <div className={styles.enroll_form_title}>
              <div>작성자</div>
              <div className={styles.enroll_required_indicator}> *</div>
            </div>
            <input
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              className={styles.enroll_input}
              onChange={onChangeName}
            />
            <div className={styles.error_msg}>{nameError}</div>
          </div>
          <div className={styles.flex_half}>
            <div className={styles.enroll_form_title}>
              <div>비밀번호</div>
              <div className={styles.enroll_required_indicator}> *</div>
            </div>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              className={styles.enroll_input}
              onChange={onChangePassword}
            />
            <div className={styles.error_msg}>{passwordError}</div>
          </div>
        </div>
      </div>

      <div className={styles.enroll_border}></div>

      <div className={styles.enroll_row_section}>
        <div className={styles.enroll_form_title}>
          <div>제목</div>
          <div className={styles.enroll_required_indicator}> *</div>
        </div>
        <input
          type="text"
          className={styles.enroll_input}
          placeholder="제목을 입력해 주세요."
          onChange={onChangeTitle}
        />
        <div className={styles.error_msg}>{titleError}</div>
      </div>

      <div className={styles.enroll_border}></div>

      <div className={styles.enroll_row_section}>
        <div className={styles.enroll_form_title}>
          <div>내용</div>
          <div className={styles.enroll_required_indicator}> *</div>
        </div>
        <textarea
          placeholder="내용을 입력해 주세요."
          className={`${styles.enroll_input} ${styles.enroll_textarea}`}
          onChange={onChangeContent}
        ></textarea>
        <div className={styles.error_msg}>{contentError}</div>
      </div>

      <div className={styles.enroll_row_section}>
        <div className={styles.enroll_form_title}>
          <div>주소</div>
        </div>
        <div className={styles.enroll_address_firstrow}>
          <input
            type="number"
            className={styles.zipcode_input}
            placeholder="12345"
          />
          <button className={styles.zipcode_search_button}>우편번호 검색</button>
        </div>

        <input
          placeholder="주소를 입력해주세요."
          className={styles.enroll_input}
          type="text"
        />
        <input
          placeholder="상세주소"
          className={styles.enroll_input}
          type="text"
        />
      </div>

      <div className={styles.enroll_border}></div>

      <div className={styles.enroll_row_section}>
        <div className={styles.enroll_form_title}>
          <div>유튜브 링크</div>
        </div>
        <input
          className={styles.enroll_input}
          placeholder="링크를 입력해 주세요."
        />
      </div>

      <div className={styles.enroll_border}></div>

      <div className={styles.enroll_row_section}>
        <div>사진 첨부</div>
        <div className={styles.picture_enroll_row}>
          <Image src="/add_image.png" alt="이미지추가" width={0} height={0} />
          <Image src="/add_image.png" alt="이미지추가" width={0} height={0} />
          <Image src="/add_image.png" alt="이미지추가" width={0} height={0} />
        </div>
      </div>
    </div>

    <div className={styles.enroll_button_container}>
      <button className={styles.enroll_cancel_button}>취소</button>
      <button
        className={
          isButtonDisabled
            ? `${styles.enroll_submit_button} disabled`
            : `${styles.enroll_submit_button}`
        }
        onClick={onClickSignup}
        disabled={isButtonDisabled}
      >
        등록하기
      </button>
    </div>
  </div>
);
};

export default BoardsNew;
