import React, { ChangeEvent, useState } from 'react';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';
import s from './AddPostsForm.module.css';

const AddPostsForm = () => {
  const [postData, setPostData] = useState({});

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
  console.log(postData);

  return (
    <form className={s.formS}>
      <div className={s.flexBox}>
        <Input
          type="text"
          placeholder="작성자 명을 입력해 주세요"
          label="작성자"
          id="username"
          required={true}
          onChangeFnc={onPostFormChange}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          label="비밀번호"
          id="userpw"
          required={true}
          onChangeFnc={onPostFormChange}
        />
      </div>
      <div className={s.lineBox}></div>
      <Input
        type="text"
        placeholder="제목을 입력해 주세요"
        label="제목"
        id="userTitle"
        required={true}
        onChangeFnc={onPostFormChange}
      />
      <div className={s.lineBox}></div>
      <Textarea
        placeholder="내용을 입력해주세요."
        label="내용"
        id="usercontent"
        required={true}
        onChangeFnc={onPostFormChange}
      />
      <div className={s.columnBox}>
        <div className={s.flexBox}>
          <Input
            type="text"
            maxLength={5}
            placeholder="01234"
            label="주소"
            id="userAdressNum"
            required={false}
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
          type="text"
          placeholder="주소를 입력해 주세요."
          id="userAdress"
          required={false}
          onChangeFnc={onPostFormChange}
        />
        <Input
          type="text"
          placeholder="상세주소"
          id="userAdressDetail"
          required={false}
          onChangeFnc={onPostFormChange}
        />
      </div>
      <Input
        label="유튜브링크"
        type="text"
        placeholder="링크를 입력해 주세요."
        id="youtubeLink"
        required={false}
        onChangeFnc={onPostFormChange}
      />
      <div className={s.flexBox}>
        <Input
          label="사진 첨부"
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          required={false}
          onChangeFnc={onPostFormChange}
        />
        <Input
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          required={false}
          onChangeFnc={onPostFormChange}
        />
        <Input
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          required={false}
          onChangeFnc={onPostFormChange}
        />
      </div>
      <div className={`${s.flexBox} justify-end`}>
        <Button type="button" style="default">
          취소
        </Button>
        <Button type="submit" style="primary">
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default AddPostsForm;
