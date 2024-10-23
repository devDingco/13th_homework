'use client';

import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';
import s from './AddPostsForm.module.css';
import { useMutation, ApolloError } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from '@/app/_commons/graphql/graphql';
import useModalStore from '@/app/_store/useModalStore';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { CREATE_BOARD, UPLOAD_FILE } from '@/app/_api/board/Mutation';
import CustomImageInput from '../form/CustomImageInput';
import { PlusCircleOutlined } from '@ant-design/icons';

export default function PostsForm({
  type,
  contents,
  title,
  writer,
  youtubeUrl,
  boardAddress,
  images,
}: PostFormType) {
  const routes = useRouter();
  const params = useParams();

  // ^state
  const [postData, setPostData] = useState<PostsType>({
    username: writer || '',
    userpw: writer ? '임시비밀번호' : '',
    userTitle: title || '',
    usercontent: contents || '',
    userAddressNum: boardAddress?.zipcode || '',
    userAddress: boardAddress?.address || '',
    userAddressDetail: boardAddress?.addressDetail || '',
    youtubeLink: youtubeUrl || '',
  });

  const [requiredMessage, setRequiredMessage] = useState<RequiredType>({
    username: null,
    userpw: null,
    userTitle: null,
    usercontent: null,
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState(images || ['']);

  const imageRef = useRef<HTMLInputElement[]>([]);
  const addressInfo = useRef<any>();

  const { showModal, closeModal } = useModalStore();

  // ?fetch
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  // *functions
  const onPostFormChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setPostData((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const onAdressNumButtonClick = () => {
    addressInfo.current = null;
    showModal(
      'CONFIRM',
      '우편번호 모달',
      <DaumPostcodeEmbed
        onComplete={(result) => {
          addressInfo.current = result;
          closeModal();
        }}
        onClose={() => {
          closeModal();
        }}
      />,
    )
      .then(() => {
        if (addressInfo.current) {
          setPostData((prev) => ({
            ...prev,
            userAddressNum: addressInfo.current.zonecode,
            userAddress: addressInfo.current.address,
          }));
        }
      })
      .catch(() => {});
    addressInfo.current = '';
  };

  const onPostsButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const images = imageUrl.filter((prevImg) => !!prevImg);
    try {
      if (type === 'ADD') {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: postData.username,
              password: postData.userpw,
              title: postData.userTitle,
              contents: postData.usercontent,
              youtubeUrl: postData.youtubeLink,
              boardAddress: {
                zipcode: postData.userAddressNum,
                address: postData.userAddress,
                addressDetail: postData.userAddressDetail,
              },
              images,
            },
          },
        });

        showModal('CONFIRM', '추가 모달', '새로운 게시글을 추가하시겠습니까?')
          .then((result: any) => {
            result && routes.push(`/boards/${data?.createBoard._id}`);
          })
          .catch(() => {
            console.log('입력 취소됨');
          });
      } else if (type === 'EDIT') {
        showModal(
          'PROMPT',
          '수정 모달',
          '게시글을 수정하시려면 비밀번호를 입력해주세요',
        )
          .then(async (result: string | boolean) => {
            await updateBoard({
              variables: {
                updateBoardInput: {
                  title: postData.userTitle,
                  contents: postData.usercontent,
                  youtubeUrl: postData.youtubeLink,
                  boardAddress: {
                    zipcode: postData.userAddressNum,
                    address: postData.userAddress,
                    addressDetail: postData.userAddressDetail,
                  },
                  images,
                },
                password: result.toString(),
                boardId: params.postId.toString(),
              },
            });
            routes.push(`/boards/${params.postId}`);
          })
          .catch(() => {
            console.log('입력 취소됨');
          });
      }
    } catch (err: unknown) {
      if (err instanceof ApolloError) {
        console.log(err.graphQLErrors);
        alert(
          err.graphQLErrors[0]?.message || '알 수 없는 오류가 발생했습니다.',
        );
      } else {
        console.error(err);
      }
    }
  };

  const onCancelImage = (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation();
    setImageUrl((prev) => {
      const newImageUrls = [...prev];
      newImageUrls[index] = '';
      return newImageUrls;
    });
  };

  const onClickImage = (index: number) => {
    if (imageRef.current[index]) {
      imageRef.current[index].click();
    }
  };

  const onChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): Promise<void> => {
    const file = event.target.files?.[0];

    // 검증 로직
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      alert('파일 용량이 너무 큽니다.(제한: 5MB)');
      return;
    }

    if (
      !file.type.includes('jpeg') &&
      !file.type.includes('jpg') &&
      !file.type.includes('png')
    ) {
      alert('jpeg, jpg 또는 png 파일만 업로드 가능합니다!!!');
      return;
    }

    const result = await uploadFile({ variables: { file } });
    setImageUrl((prev) => {
      const newImageUrls = [...prev];
      newImageUrls[index] = result.data?.uploadFile.url || '';
      return newImageUrls;
    });
  };

  // !useEffect
  useEffect(() => {
    const validMessage = '필수입력 사항입니다.';
    setRequiredMessage((prev) => {
      return {
        ...prev,
        username: postData.username ? null : validMessage,
        userpw: postData.userpw ? null : validMessage,
        userTitle: postData.userTitle ? null : validMessage,
        usercontent: postData.usercontent ? null : validMessage,
      };
    });

    postData.username &&
    postData.userpw &&
    postData.userTitle &&
    postData.usercontent
      ? setSubmitButtonDisabled(false)
      : setSubmitButtonDisabled(true);
  }, [postData]);

  return (
    <form className={s.formS} onSubmit={(event) => onPostsButtonClick(event)}>
      <div className={s.flexBox}>
        <Input
          value={postData.username}
          type="text"
          placeholder="작성자 명을 입력해 주세요"
          label="작성자"
          id="username"
          required={requiredMessage}
          disabled={type === 'EDIT' ? true : false}
          onChangeFnc={onPostFormChange}
        />
        <Input
          value={postData.userpw}
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          label="비밀번호"
          id="userpw"
          disabled={type === 'EDIT' ? true : false}
          required={requiredMessage}
          onChangeFnc={onPostFormChange}
        />
      </div>
      <div className={s.lineBox}></div>
      <Input
        value={postData.userTitle}
        type="text"
        placeholder="제목을 입력해 주세요"
        label="제목"
        id="userTitle"
        required={requiredMessage}
        onChangeFnc={onPostFormChange}
      />
      <div className={s.lineBox}></div>
      <Textarea
        value={postData.usercontent}
        placeholder="내용을 입력해주세요."
        label="내용"
        id="usercontent"
        required={requiredMessage}
        onChangeFnc={onPostFormChange}
      />
      <div className={s.columnBox}>
        <div className={s.flexBox}>
          <Input
            value={postData.userAddressNum}
            type="text"
            maxLength={5}
            placeholder="01234"
            label="주소"
            id="userAddressNum"
            onChangeFnc={onPostFormChange}
            size="small"
          />
          <Button
            type="button"
            style="default"
            onClickFnc={onAdressNumButtonClick}>
            우편번호 검색
          </Button>
        </div>
        <Input
          value={postData.userAddress}
          type="text"
          placeholder="주소를 입력해 주세요."
          id="userAddress"
          onChangeFnc={onPostFormChange}
        />
        <Input
          value={postData.userAddressDetail}
          type="text"
          placeholder="상세주소"
          id="userAddressDetail"
          onChangeFnc={onPostFormChange}
        />
      </div>
      <Input
        value={postData.youtubeLink}
        label="유튜브링크"
        type="text"
        placeholder="링크를 입력해 주세요."
        id="youtubeLink"
        onChangeFnc={onPostFormChange}
      />
      <div className={s.flexBox}>
        {imageUrl.map((_, index) => (
          <Fragment key={index}>
            <CustomImageInput
              index={index}
              onClickFnc={onClickImage}
              onCancelImage={onCancelImage}
              onChangeFnc={onChangeImage}
              imageRef={imageRef}
              imageUrl={imageUrl}
            />
          </Fragment>
        ))}
        <button
          type="button"
          className=""
          onClick={() => setImageUrl((prev) => [...prev, ''])}>
          <PlusCircleOutlined className="text-[30px]" />
        </button>
      </div>
      <div className={`${s.flexBox} justify-end`}>
        <Button type="button" style="default">
          취소
        </Button>
        <Button type="submit" style="primary" disabled={submitButtonDisabled}>
          {type === 'ADD' ? '등록하기' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}
