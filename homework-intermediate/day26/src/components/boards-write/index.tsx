'use client';
import styles from './styles.module.css';
import Image from 'next/image';
import useBoardWrite from './hook';
import { IBoardWriteProps } from './types';

const IMAGE_SRC = {
  addImage: {
    src: require('@assets/add_image.png'),
    alt: '사진추가이미지',
  },
};

export default function BoardWrite(props: IBoardWriteProps) {
  const {
    name,
    password,
    title,
    content,
    isButtonDisabled,
    nameError,
    passwordError,
    titleError,
    contentError,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickContent,
    onClickSubmit,
    onClickUpdate,
  } = useBoardWrite(props.data!);

  return (
    <div className={styles.layout}>
      <div className={styles['enroll-subject']}>
        <div className={styles['enroll-subject-text']}>게시물 등록</div>
      </div>
      <div className={styles['enroll-row-container']}>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-row-flex']}>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>작성자 </div>
                <div className={styles['enroll-required-indicator']}> *</div>
              </div>
              <input
                type="text"
                value={name}
                placeholder={'작성자 명을 입력해 주세요.'}
                className={
                  props.isEdit
                    ? styles['enroll-input-disabled']
                    : styles['enroll-input']
                }
                onChange={onChangeName}
                disabled={props.isEdit ? true : false}
              />
              <div className={styles['error-msg']}>{nameError}</div>
            </div>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>비밀번호</div>
                <div className={styles['enroll-required-indicator']}> *</div>
              </div>
              <input
                type="password"
                value={password}
                placeholder={'비밀번호를 입력해 주세요.'}
                className={
                  props.isEdit
                    ? styles['enroll-input-disabled']
                    : styles['enroll-input']
                }
                onChange={onChangePassword}
                disabled={props.isEdit ? true : false}
              />
              <div className={styles['error-msg']}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>제목</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <input
            type="text"
            className={styles['enroll-input']}
            value={title}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles['error-msg']}>{titleError}</div>
        </div>
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>내용</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <textarea
            value={content}
            placeholder="내용을 입력해 주세요."
            className={`${styles['enroll-input']} ${styles['enroll-textarea']}`}
            onChange={onChangeContent}
            onClick={props.isEdit ? onClickContent : undefined}
            defaultValue={props.data?.fetchBoard.contents}
          ></textarea>
          <div className={styles['error-msg']}>{contentError}</div>
        </div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>주소</div>
          </div>
          <div className={styles['enroll-address-firstrow']}>
            <input
              type="number"
              className={styles['zipcode-input']}
              placeholder="12345"
            />
            <button className={styles['zipcode-search-button']}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles['enroll-input']}
            type="text"
          />
          <input
            placeholder="상세주소"
            className={styles['enroll-input']}
            type="text"
          />
        </div>
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles['enroll-input']}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div>사진 첨부</div>
          <div className={styles['picture-enroll-row']}>
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles['enroll-button-container']}>
        <button className={styles['enroll-cancel-button']}>취소</button>
        <button
          className={
            isButtonDisabled
              ? `${styles['enroll-submit-button']} ${styles['disabled']}`
              : styles['enroll-submit-button']
          }
          onClick={props.isEdit ? onClickUpdate : onClickSubmit}
        >
          {props.isEdit ? '수정' : '등록'}하기
        </button>
      </div>
    </div>
  );
}

// playground 전송해보기
/*
mutation {
  createBoard(createBoardInput: {
    writer: "John Doe",
    password: "securepassword",
    title: "My First Board",
    contents: "This is the content of my first board.",
    youtubeUrl: "https://youtube.com/example",
    boardAddress: {
      zipcode: "12345",
      address: "Seoul, Gangnam-gu",
      addressDetail: "Test Detailed Address"
    },
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }) {
    _id
    writer
    title
    contents
    youtubeUrl
    likeCount
    images
    boardAddress {
      zipcode
      address
      addressDetail
    }
    createdAt
    updatedAt
    deletedAt
  }
}
  */
