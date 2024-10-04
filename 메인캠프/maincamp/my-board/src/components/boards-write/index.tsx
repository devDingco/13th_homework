// 등록하기, 수정하기 컴포넌트
'use client';

import { gql, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../../app/boards/new/styles.module.css';

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const EDIT_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
      createdAt
      updatedAt
    }
  }
`;

export default function BoardWrite(props) {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [isActive, setIsActive] = useState(false);

  const [myBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(EDIT_BOARD);

  const openUploadImg = (
    id: 'fileInput1' | 'fileInput2' | 'fileInput3'
  ): void => {
    const element = document.getElementById(id);
    if (element) {
      element.click();
    }
  };
  const checkAllField = (
    user: string,
    password: string,
    title: string,
    content: string
  ) => {
    if (props.isEdit) {
      // 수정모드
      if (title || content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      //등록모드
      if (user && password && title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };

  //작성자 핸들러 함수
  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser(value); //상태 비동기 업데이트

    if (value) {
      const errorMsg = document.getElementsByClassName(
        'errorMsg'
      )[0] as HTMLElement | null;
      if (errorMsg) {
        errorMsg.style.display = 'none';
      }
    }

    // 값 없으면 등록함수 비활성화
    checkAllField(value, password, title, content); //이전상태의 user로 확인, 상태 업데이트 후에 항상 호출될 수 있게
  };

  //비밀번호 핸들러 함수

  const handleChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      const errorMsg = document.getElementsByClassName(
        'errorMsg'
      )[1] as HTMLElement | null;
      if (errorMsg) {
        errorMsg.style.display = 'none';
      }
    }

    checkAllField(user, value, title, content);
  };

  //제목 핸들러 함수
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (value) {
      const errorMsg = document.getElementsByClassName(
        'errorMsg'
      )[2] as HTMLElement | null;
      if (errorMsg) {
        errorMsg.style.display = 'none';
      }
    }

    checkAllField(user, password, value, content);
  };

  //내용 핸들러 함수
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    if (value) {
      const errorMsg = document.getElementsByClassName(
        'errorMsg'
      )[3] as HTMLElement | null;
      if (errorMsg) {
        errorMsg.style.display = 'none';
      }
    }

    checkAllField(user, password, title, value);
  };

  //등록하기 함수
  const registerFunc = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await myBoard({
        variables: {
          createBoardInput: {
            writer: user,
            title: title,
            password: password,
            contents: content,
          },
        },
      });
      console.log('등록된 게시글 : ', result);
      console.log(result.data.createBoard._id);

      if (user && password && content && title) {
        alert('게시글 등록이 완료되었습니다!');

        setIsActive(false);

        router.push(`/boards/${result.data.createBoard._id}`);

        return;
      } else {
        alert('필수 입력 사항을 확인해주세요.');
        window.scrollTo({ top: 0 });
      }
    } catch (error) {
      console.log(error);
      alert('에러가 발생했습니다. 다시 시도해 주세요.');
    }
    const errors: any[] = [];

    if (!user) errors.push('user');
    if (!password) errors.push('password');
    if (!title) errors.push('title');
    if (!content) errors.push('content');

    //에러있을경우
    if (errors.length > 0) {
      setError('필수 입력 사항입니다.');
    }

    document.querySelectorAll('.errorMsg').forEach((el) => {
      // el이 HTMLElement 타입인지 확인한 후, style 속성에 안전하게 접근해서 스타일 적용
      if (el instanceof HTMLElement) {
        if (errors.includes(el.getAttribute('data-field'))) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      }
    });
  };

  //수정하기 함수
  const updateFunc = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const defaultVariables = {
      boardId: params.boardId,

      updateBoardInput: {
        title: title || props.data?.fetchBoard.title,
        contents: content || props.data?.fetchBoard.contents,
      },
    };
    // console.log('params.boardId', params.boardId);
    console.log(defaultVariables);

    // 스프레드연산자 : 안에있는 요소만 가져올 수 있음
    try {
      const promptPw = prompt(
        '게시글을 등록할 때 입력하셨던 비밀번호를 입력해주세요.'
      );

      const result = await updateBoard({
        variables: {
          ...defaultVariables, //기존 데이터가 포함된 변수를 스프레드 연산자로 전달
          password: promptPw,
        },
      });
      console.log('수정', result);

      alert('수정이 완료되었습니다.');
      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      // 나중에 에러문구를 ApolloError 빼고
      alert(error);
      console.log(error);
    }
  };
  return (
    <form
      className="container"
      id="contentContainer"
      onSubmit={props.isEdit ? updateFunc : registerFunc}
    >
      <p className="font-semibold text-xl">
        {props.isEdit ? '게시글 수정' : '게시글 등록'}
      </p>

      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            작성자<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={handleChangeUser}
              defaultValue={props.isEdit ? props.data?.fetchBoard.writer : ''}
              disabled={props.isEdit ? true : false}
            />
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="user"
            >
              {error}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            비밀번호<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleChangePw}
              // 나중엔 못고치게
              defaultValue={props.isEdit ? '******' : ''}
              disabled={props.isEdit ? true : false}
            />
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="password"
            >
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            제목<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={handleChangeTitle}
              defaultValue={props.data?.fetchBoard.title}
            />
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="title"
            >
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            내용<span className="text-red-500"> *</span>
          </p>
          <div>
            <textarea
              className={styles.textareaCSS}
              placeholder="내용을 입력해주세요."
              //이렇게 해야 숫자로 전달함
              rows={8}
              onChange={handleChangeContent}
              defaultValue={props.data?.fetchBoard.contents}
            ></textarea>
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="content"
            >
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">주소</p>
          <div className="flex gap-2">
            <input
              className={`w-1/5 ${styles.inputCSS} `}
              type="text"
              placeholder="01234"
            />
            <button className="flex h-12 items-center gap-2 py-3 px-4 border border-solid border-black rounded">
              우편번호 검색
            </button>
          </div>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="주소를 입력해주세요."
            />
          </div>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="상세주소"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">유튜브 링크</p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="url"
              placeholder="링크를 입력해주세요."
            />
          </div>
        </div>
      </div>
      {/* 추후 추가하기 버튼을 누르면 새 div이 생성되게 */}

      <div className="flex gap-10 w-full items-center">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">사진 첨부</p>
          <div className="flex gap-3 cursor-pointer">
            <div
              className="flex w-40 h-40 flex-col justify-center items-center gap-2 rounded-md bg-gray-50"
              onClick={() => openUploadImg('fileInput1')}
            >
              <p className={styles.pCSS}>
                <img src="/images/add.svg" alt="추가버튼" />
              </p>
              <span className="prose-r_16_24">클릭해서 사진 업로드</span>
              <input type="file" id="fileInput1" style={{ display: 'none' }} />
            </div>
            <div
              className="flex w-40 h-40 flex-col justify-center items-center gap-2 rounded-md bg-gray-50"
              onClick={() => openUploadImg('fileInput2')}
            >
              <p className={styles.pCSS}>
                <img src="/images/add.svg" alt="추가버튼" />
              </p>
              <span className="prose-r_16_24">클릭해서 사진 업로드</span>
              <input type="file" id="fileInput2" style={{ display: 'none' }} />
            </div>
            <div
              className="flex w-40 h-40 flex-col justify-center items-center gap-2 rounded-md bg-gray-50"
              onClick={() => openUploadImg('fileInput3')}
            >
              <p className={styles.pCSS}>
                <img src="/images/add.svg" alt="추가버튼" />
              </p>
              <span className="prose-r_16_24">클릭해서 사진 업로드</span>
              <input type="file" id="fileInput3" style={{ display: 'none' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end items-center self-stretch">
        <button
          type="button"
          onClick={() => router.push(`/boards/${params.boardId}`)}
          className="flex h-12 px-4 py-3 items-center gap-2 rounded-md border border-black bg-white text-black"
        >
          취소
        </button>
        <button
          className="flex h-12 px-4 py-3 items-center gap-2 rounded-md border border-black bg-gray-500 text-black"
          disabled={!isActive}
          style={{
            background: isActive ? '#2974e5' : 'gray',
            color: isActive ? 'white' : 'black',
          }}
        >
          {props.isEdit ? '수정하기' : '등록하기'}
        </button>
      </div>
    </form>
  );
}
