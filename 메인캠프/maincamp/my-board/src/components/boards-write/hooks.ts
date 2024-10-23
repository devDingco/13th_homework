//기능
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from '@/commons/graphql/graphql';
import { ApolloError, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { IBoardWrite } from './types';
import { Modal } from 'antd';
import { Address } from 'react-daum-postcode';

export function useBoardWrite(props: IBoardWrite) {
  const router = useRouter();
  const params = useParams();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // 제목, 내용, 작성자 상태를 하나의 객체로 통합
  const [formState, setFormState] = useState({
    user: '',
    title: '',
    content: '',
  });
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string>('');

  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState(''); //주소상태관리
  const [zonecode, setZonecode] = useState(''); //우편번호 관리
  const [detailAddress, setDetailAddress] = useState(''); //상세주소
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const [myBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // 수정 모드일 때 기존 이미지를 설정
  useEffect(() => {
    if (props.isEdit && props.data?.fetchBoard?.images) {
      setImageUrls([...props.data.fetchBoard.images]); // 기존 이미지 설정
    }
  }, [props.isEdit, props.data]);

  const handleImageUrlsUpdate = (newImageUrls: string[]) => {
    setImageUrls(newImageUrls); // 자식 컴포넌트에서 받은 이미지 URL을 업데이트
  };
  // ref 없을떄
  // const openUploadImg = (
  //   id: 'fileInput1' | 'fileInput2' | 'fileInput3'
  // ): void => {
  //   const element = document.getElementById(id);ㅂ
  //   if (element) {
  //     element.click();
  //   }
  // };
  const checkAllField = () => {
    const { user, title, content } = formState;
    if (props.isEdit) {
      if (title || content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      if (user && password && title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };
  // 하나의 함수로 통합된 상태 업데이트
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    checkAllField();
  };

  const handleChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    checkAllField();
  };

  //등록하기 함수
  const registerFunc = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { user, title, content } = formState;

    try {
      const result = await myBoard({
        variables: {
          createBoardInput: {
            writer: user,
            title: title,
            password: password,
            contents: content,
            images: imageUrls,
            boardAddress: {
              zipcode: zonecode,
              address: address,
              addressDetail: detailAddress,
            },
            youtubeUrl: youtubeUrl,
          },
        },
      });
      console.log('등록된 게시글 : ', result);
      console.log(result.data?.createBoard._id);

      if (user && password && content && title) {
        Modal.success({
          title: '성공',
          content: '게시글 등록이 완료되었습니다.',
          onOk() {},
        });

        setIsActive(false);

        router.push(`/boards/${result.data?.createBoard._id}`);
      } else {
        Modal.warning({
          title: '경고',
          content: '필수 입력 사항을 확인해주세요.',
          onOk() {},
        });
        window.scrollTo({ top: 0 });
      }
    } catch (error) {
      let errorMessage = '게시글 등록에 실패하였습니다.';

      // error가 ApolloError인지 확인하는 타입 보호
      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          // GraphQL 에러 메시지가 있는 경우
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          // 일반 오류 메시지가 있는 경우
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        // 일반 JavaScript Error인 경우
        errorMessage = error.message;
      }
      Modal.error({
        title: '실패',
        content: errorMessage,
        onOk() {},
      });
      console.log('게시글 등록 실패', error);
    }
    // const errors: any[] = [];

    // if (!user) errors.push('user');
    // if (!password) errors.push('password');
    // if (!title) errors.push('title');
    // if (!content) errors.push('content');

    // //에러있을경우
    // if (errors.length > 0) {
    //   setError('필수 입력 사항입니다.');
    // }

    // document.querySelectorAll('.errorMsg').forEach((el) => {
    //   // el이 HTMLElement 타입인지 확인한 후, style 속성에 안전하게 접근해서 스타일 적용
    //   if (el instanceof HTMLElement) {
    //     if (errors.includes(el.getAttribute('data-field'))) {
    //       el.style.display = 'block';
    //     } else {
    //       el.style.display = 'none';
    //     }
    //   }
    // });
  };

  //수정하기 함수
  const updateFunc = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = formState;

    // 스프레드연산자 : 안에있는 요소만 가져올 수 있음, //기존 데이터가 포함된 변수를 스프레드 연산자로 전달
    try {
      const promptPw = prompt(
        '게시글을 등록할 때 입력하셨던 비밀번호를 입력해주세요.'
      );

      const result = await updateBoard({
        variables: {
          boardId: String(params?.boardId),
          updateBoardInput: {
            title: title || props.data?.fetchBoard?.title,
            contents: content || props.data?.fetchBoard?.contents,
            images: imageUrls,
            boardAddress: {
              zipcode: zonecode || props.data?.fetchBoard.boardAddress?.zipcode,
              address: address || props.data?.fetchBoard.boardAddress?.address,
              addressDetail:
                detailAddress ||
                props.data?.fetchBoard.boardAddress?.addressDetail,
            },
            youtubeUrl: youtubeUrl,
          },
          password: promptPw,
        },
      });
      console.log('수정', result);

      Modal.success({
        title: '성공',
        content: '게시물 수정이 완료되었습니다.',
        onOk() {},
      });
      router.push(`/boards/${params?.boardId}`);
    } catch (error) {
      let errorMessage = '게시글 수정에 실패하였습니다.';

      // error가 ApolloError인지 확인하는 타입 보호
      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          // GraphQL 에러 메시지가 있는 경우
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          // 일반 오류 메시지가 있는 경우
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        // 일반 JavaScript Error인 경우
        errorMessage = error.message;
      }
      Modal.error({
        title: '실패',
        content: errorMessage,
        onOk() {},
      });
      console.log('게시글 수정 실패', error);
    }
  };

  // 우편번호 모달 열기
  const onToggleModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen((prev) => !prev);
  };

  // 우편번호 선택하고 종료하면 모달 닫기
  const addressComplete = (data: Address) => {
    console.log(data);
    setAddress(data.address);
    setZonecode(data.zonecode);
    setIsModalOpen((prev) => !prev);
  };

  const onChangeZipcode = (e: ChangeEvent<HTMLInputElement>) => {
    setZonecode(e.target.value);
  };
  const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  //상세주소 입력하면 값 올라가는거
  const onChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDetailAddress(value);
  };

  //youtube
  const onChangeYoutubeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };

  return {
    handleChange,
    handleChangePw,
    updateFunc,
    registerFunc,
    isActive,
    error,
    isModalOpen,
    onToggleModal,
    addressComplete,
    address,
    detailAddress,
    zonecode,
    onChangeAddress,
    onChangeZipcode,
    onChangeDetailAddress,
    onChangeYoutubeUrl,
    handleImageUrlsUpdate,
    imageUrls,
  };
}
