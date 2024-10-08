'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';
import s from './AddPostsForm.module.css';
import { useMutation, gql, ApolloError } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from '@/app/_commons/graphql/graphql';

export default function PostsForm({
  type,
  contents,
  title,
  writer,
}: PostFormType) {
  const routes = useRouter();
  const params = useParams();

  const [postData, setPostData] = useState<PostsType>({
    username: writer || '',
    userpw: writer ? '임시비밀번호' : '',
    userTitle: title || '',
    usercontent: contents || '',
    userAdressNum: '',
    userAdress: '',
    userAdressDetail: '',
    youtubeLink: '',
  });

  const [requiredMessage, setRequiredMessage] = useState<RequiredType>({
    username: null,
    userpw: null,
    userTitle: null,
    usercontent: null,
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

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

  const onAdressNumButtonClick = () => {};

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
            },
          },
        });
        routes.push(`/boards/${data?.createBoard._id}`);
      } else if (type === 'EDIT') {
        const newPw = prompt('비밀번호를 입력하세요');
        const { data } = await updateBoard({
          variables: {
            updateBoardInput: {
              title: postData.userTitle,
              contents: postData.usercontent,
            },
            password: newPw,
            boardId: params.postId.toString(),
          },
        });
        routes.push(`/boards/${params.postId}`);
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
            value={postData.userAdressNum}
            type="text"
            maxLength={5}
            placeholder="01234"
            label="주소"
            id="userAdressNum"
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
          value={postData.userAdress}
          type="text"
          placeholder="주소를 입력해 주세요."
          id="userAdress"
          onChangeFnc={onPostFormChange}
        />
        <Input
          value={postData.userAdressDetail}
          type="text"
          placeholder="상세주소"
          id="userAdressDetail"
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
        <Input
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
        />
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
