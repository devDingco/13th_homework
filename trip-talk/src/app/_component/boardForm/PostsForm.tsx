'use client';

import React, {
  ChangeEvent,
  FormEvent,
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

export default function PostsForm({
  type,
  contents,
  title,
  writer,
  youtubeUrl,
  boardAddress,
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
  const [imageUrl, setImageUrl] = useState('');

  const imageRef = useRef<HTMLInputElement>(null);
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
          console.log('왜 다시 안됨?');
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
  const onClickImage = () => {
    imageRef.current?.click();
  };

  const onChangeImage = async (event: any) => {
    const file = event.target.files?.[0];
    console.log(event.target.files);

    const result = await uploadFile({ variables: { file } });
    console.log('file', result.data?.uploadFile.url);
    setImageUrl(result.data?.uploadFile.url);
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
        {/* <Input
          // value={postData.}
          label="사진 첨부"
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          onChangeFnc={onPostFormChange}
        />
        <Input
          // value={postData.}
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          onChangeFnc={onPostFormChange}
        />
        <Input
          // value={postData.}
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          onChangeFnc={onPostFormChange}
        /> */}
        <div
          className="w-[100px] h-[100px] bg-gray/100"
          onClick={onClickImage}></div>
        <input
          type="file"
          className="hidden"
          onChange={onChangeImage}
          ref={imageRef}
        />

        <img src={`https://storage.googleapis.com/${imageUrl}`} alt="dd" />
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
