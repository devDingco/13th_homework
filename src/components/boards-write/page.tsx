'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

import { BoardData } from 'app/boards/edit/[boardId]/page';

const IMAGE_SRC = {
  addImage: {
    src: require('@assets/add_image.png'),
    alt: '사진추가이미지',
  },
};

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
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
`;

export default function BoardsCommonPage({
  mode,
  id = ''
}: {
  mode: string,
  id?: string
  }) {
  const editData = (mode === "edit") ? useQuery(FETCH_BOARD, {
    variables: { boardId: id },
  })?.data?.fetchBoard : null;

  if (mode === "edit") { console.dir(editData) }
  const modeTextMap = new Map();
  modeTextMap.set("edit", "수정하기");
  modeTextMap.set("new", "등록하기");

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  const isButtonDisabled = !name || !password || !title || !content;

  const [createBoard] = useMutation(나의그래프큐엘셋팅);

  const router = useRouter();

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

  const onClickSignup = async () => {
    let hasError = false;

    if (name.trim() === '') {
      setNameError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (password.length === 0) {
      setPasswordError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (title.trim() === '') {
      setTitleError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (content.trim() === '') {
      setContentError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setContentError('');
    }

    if (!hasError) {
      const { data } = await createBoard({
        variables: {
          createBoardInput: {
            writer: name,
            password: password,
            title: title,
            contents: content,
            youtubeUrl: '',
            boardAddress: {
              zipcode: '',
              address: '',
              addressDetail: '',
            },
            images: ['', ''],
          },
        },
      });

      console.log('data', data);
      alert('게시글이 등록되었습니다!');
      router.push(`/boards/${data.createBoard._id}`);
    }
  };

  const [updateBoard] = useMutation(gql`
    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {
      updateBoard(updateBoardInput : $updateBoardInput, password: $password, boardId: $boardId) {
        _id
        writer
        title
        contents
        youtubeUrl
        likeCount
        dislikeCount
        images
        user {
          _id
          email
          name
          picture
        }
        createdAt
        updatedAt
        deletedAt
      }
    }
  `);
  const onClickEdit = async () => {
    const { data } = await updateBoard({
      variables: {
        updateBoardInput: {
          title: title,
          contents: content,
        },
        boardId: id,
        password: password
      }
    });
  };

  if (mode === 'edit') {
    useEffect(() => {
      if (editData) {
        setTitle(editData.title);
        setContent(editData.contents);
      }
    }, [editData]);
  }
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
                <div>작성자</div>
                <div className={styles['enroll-required-indicator']}> *</div>
              </div>
              <input
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className={styles['enroll-input']}
                onChange={onChangeName}
                disabled={mode === 'edit'}
                value={name}
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
                placeholder="비밀번호를 입력해 주세요."
                className={styles['enroll-input']}
                onChange={onChangePassword}
                value={password}
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
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
            value={title}
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
            placeholder="내용을 입력해 주세요."
            className={`${styles['enroll-input']} ${styles['enroll-textarea']}`}
            onChange={onChangeContent}
            value={content}
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
          onClick={(mode==="new") ? onClickSignup : onClickEdit}
          disabled={isButtonDisabled}
        >
          {modeTextMap.get(mode)}
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
