//기능
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from '@/commons/graphql/graphql';
import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IBoardWrite } from './types';

export function useBoardWrite(props: IBoardWrite) {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [isActive, setIsActive] = useState(false);

  const [myBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

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
      console.log(result.data?.createBoard._id);

      if (user && password && content && title) {
        alert('게시글 등록이 완료되었습니다!');

        setIsActive(false);

        router.push(`/boards/${result.data?.createBoard._id}`);

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

    // 스프레드연산자 : 안에있는 요소만 가져올 수 있음, //기존 데이터가 포함된 변수를 스프레드 연산자로 전달
    try {
      const promptPw = prompt(
        '게시글을 등록할 때 입력하셨던 비밀번호를 입력해주세요.'
      );

      const result = await updateBoard({
        variables: {
          boardId: String(params.boardId),
          updateBoardInput: {
            title: title || props.data?.fetchBoard?.title,
            contents: content || props.data?.fetchBoard?.contents,
          },
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
  return {
    handleChangeUser,
    handleChangePw,
    handleChangeTitle,
    handleChangeContent,
    openUploadImg,
    updateFunc,
    registerFunc,
    isActive,
    error,
  };
}
