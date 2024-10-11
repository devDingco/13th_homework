import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
// import { CREATE_BOARD, UPDATE_BOARD } from './queries';
import {
  CreateBoardDocument,
  FetchBoardQuery,
  UpdateBoardDocument,
  UpdateBoardMutationVariables,
} from '@/commons/graphql/graphql';
import { Modal } from 'antd';
import { Address } from 'react-daum-postcode';

const validateFeild = (
  field: string,
  setErrorMessage: (message: string) => void,
  message: string
) => {
  if (field.trim() === '') {
    setErrorMessage(message);
    return false;
  } else {
    setErrorMessage('');
    return true;
  }
};

export default function useBoardWrite(data: FetchBoardQuery) {
  // console.log('🚀 ~ useBoardWrite ~ data:', data);
  // 사용자 입력값을 위한 state
  const [name, setName] = useState(data?.fetchBoard.writer || '');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState(data?.fetchBoard.title || '');
  const [content, setContent] = useState(data?.fetchBoard.contents || '');

  const [youtubeUrl, setYoutubeUrl] = useState(
    data?.fetchBoard.youtubeUrl || ''
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    !name || !password || !title || !content
  );
  // let isButtonDisabled = !name || !password || !title || !content;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zipcode, setZipCode] = useState(
    data?.fetchBoard.boardAddress?.zipcode || ''
  );
  const [address, setAddress] = useState(
    data?.fetchBoard.boardAddress?.address || ''
  );
  const [detailedAddress, setDetailedAddress] = useState(
    data?.fetchBoard.boardAddress?.addressDetail || ''
  );

  // 필수 입력값 검증을 위한 state
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const router = useRouter();
  const params = useParams();

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setIsButtonDisabled(
      !event.currentTarget.value || !password || !title || !content
    );
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
    setIsButtonDisabled(
      !name || !event.currentTarget.value || !title || !content
    );
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsButtonDisabled(
      !name || !password || !event.currentTarget.value || !content
    );
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
    setIsButtonDisabled(
      !name || !password || !title || !event.currentTarget.value
    );
  };
  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.currentTarget.value);
  };
  const onChangeDetailedAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(event.currentTarget.value);
  };

  const onClickContent = () => {
    if (password) {
      setIsButtonDisabled(false);
      return;
    }
    const inputPassword = prompt('작성했을 때의 비밀번호를 입력해 주세요.');
    if (inputPassword) {
      setPassword(inputPassword); // 비동기.. password.. 값이 바로 다음 라인에 반영이 안된 것 같은데..
      setIsButtonDisabled(false);
      console.log('isButtonDisabled >>> ', isButtonDisabled);
    } else {
      // alert('비밀번호를 반드시 입력해 주십쇼.');
      Modal.error({
        content: `비밀번호를 반드시 입력해 주십쇼.`,
      });
    }
  };
  const onClickSubmit = async () => {
    const validName = validateFeild(name, setNameError, '필수입력 사항입니다.');
    const validPassword = validateFeild(
      password,
      setPasswordError,
      '필수입력 사항입니다.'
    );
    const validTittle = validateFeild(
      title,
      setTitleError,
      '필수입력 사항입니다.'
    );
    const valiContent = validateFeild(
      content,
      setContentError,
      '필수입력 사항입니다.'
    );

    const hasError =
      !validName || !validPassword || !validTittle || !valiContent;

    if (!hasError) {
      const { data } = await createBoard({
        variables: {
          createBoardInput: {
            writer: name,
            password: password,
            title: title,
            contents: content,
            youtubeUrl: youtubeUrl,
            boardAddress: {
              zipcode: zipcode,
              address: address,
              addressDetail: detailedAddress,
            },
            images: ['', ''],
          },
        },
      });
      console.log('data', data);
      Modal.success({
        content: `게시글이 등록 되었습니다!`,
      });
      router.push(`/boards/${data?.createBoard._id}`);
    }
  };
  const onClickUpdate = async () => {
    console.log('onClickUpdate called', password);
    const myVariables: UpdateBoardMutationVariables = {
      boardId: String(params.boardId),
      password: password,
      updateBoardInput: {},
    };
    if (title) myVariables.updateBoardInput.title = title;
    if (content) myVariables.updateBoardInput.contents = content;
    if (youtubeUrl) myVariables.updateBoardInput.youtubeUrl = youtubeUrl;

    // 1. 게시글 수정
    try {
      const result = await updateBoard({
        variables: myVariables,
      });
      console.log('🚀 ~ onClickUpdate ~ result:', result);
      if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
    } catch (error) {
      // alert('비밀번호가 틀렸습니다.');
      Modal.error({
        content: '비밀번호가 틀렸습니다.',
      });
    }
    const result = await updateBoard({
      variables: myVariables,
    });
    console.log('🚀 ~ onClickUpdate ~ result:', result);
    // alert('수정이 완료되었습니다.');
    Modal.success({
      content: '수정이 완료되었습니다.',
    });

    // 2. 상세페이지 이동
    router.push(`/boards/${data?.fetchBoard._id}`);
  };

  const onToggleZipcodeModal = () => {
    setIsModalOpen((_isModalOpen) => !_isModalOpen);
  };
  const onZipcodeModalComplete = (data: Address) => {
    console.log('🚀 ~ onZipcodeModalComplete ~ data:', data);
    setZipCode(data.zonecode);
    setAddress(data.address);
    onToggleZipcodeModal();
  };

  return {
    name,
    password,
    title,
    content,
    youtubeUrl,
    zipcode,
    address,
    detailedAddress,
    isButtonDisabled,
    isModalOpen,
    nameError,
    passwordError,
    titleError,
    contentError,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onChangeYoutubeUrl,
    onChangeDetailedAddress,
    onClickContent,
    onClickSubmit,
    onClickUpdate,
    onToggleZipcodeModal,
    onZipcodeModalComplete,
  };
}
