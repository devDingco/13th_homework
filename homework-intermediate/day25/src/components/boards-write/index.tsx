'use client';
import React, { ChangeEvent, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

const IMAGE_SRC = {
  addImage: {
    src: require('@assets/add_image.png'),
    alt: '사진추가이미지',
  },
};

const CREATE_BOARD = gql`
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

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function BoardWrite(props) {
  // 사용자 입력값을 위한 state
  const [name, setName] = useState(props.data?.fetchBoard.writer || '');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState(props.data?.fetchBoard.title || '');
  const [content, setContent] = useState(props.data?.fetchBoard.contents || '');
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    !name || !password || !title || !content
  );
  // let isButtonDisabled = !name || !password || !title || !content;

  // 필수 입력값 검증을 위한 state
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const router = useRouter();
  const params = useParams();

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsButtonDisabled(!event.target.value || !password || !title || !content);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsButtonDisabled(!name || !event.target.value || !title || !content);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsButtonDisabled(!name || !password || !event.target.value || !content);
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setIsButtonDisabled(!name || !password || !title || !event.target.value);
  };
  const onClickContent = () => {
    if (password) {
      console.log('이것이 name >>> ', name);
      console.log('이것이 password >>> ', password);
      console.log('이것이 title >>> ', title);
      console.log('이것이 content >>> ', content);
      setIsButtonDisabled(false);
      console.log('isButtonDisabled >>> ', isButtonDisabled);
      return;
    }

    const inputPassword = prompt('작성했을 때의 비밀번호를 입력해 주세요.');
    console.log('inputPassword >>> ', inputPassword);

    if (inputPassword) {
      setPassword(inputPassword); // 비동기.. password.. 값이 바로 다음 라인에 반영이 안된 것 같은데..
      setIsButtonDisabled(false);
      console.log('isButtonDisabled >>> ', isButtonDisabled);
    } else alert('비밀번호를 반드시 입력해 주십쇼.');
  };
  const onClickSubmit = async () => {
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
  const onClickUpdate = async () => {
    console.log('onClickUpdate called', password);

    const myVariables = {
      boardId: params.boardId,
      password: password,
      updateBoardInput: {},
    };
    if (title) myVariables.updateBoardInput.title = title;
    if (content) myVariables.updateBoardInput.contents = content;

    // 1. 게시글 수정
    try {
      const result = await updateBoard({
        variables: myVariables,
      });
      console.log('🚀 ~ onClickUpdate ~ result:', result);
      if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
    } catch (error) {
      alert('비밀번호가 틀렸습니다.');
    }
    const result = await updateBoard({
      variables: myVariables,
    });
    console.log('🚀 ~ onClickUpdate ~ result:', result);
    alert('수정이 완료되었습니다.');
    // 2. 상세페이지 이동
    router.push(`/boards/${props.data?.fetchBoard._id}`);
  };

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
            defaultValue={props.data?.fetchBoard.writer}
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
            onClick={props.isEdit ? onClickContent : null}
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
