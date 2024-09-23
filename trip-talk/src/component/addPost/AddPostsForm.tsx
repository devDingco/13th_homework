import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';
import s from './AddPostsForm.module.css';

const AddPostsForm = () => {
  const [postData, setPostData] = useState<PostsType>({
    username: '',
    userpw: '',
    userTitle: '',
    usercontent: '',
    userAdress: null,
    userAdressDetail: null,
    userAdressNum: null,
    youtubeLink: null,
  });

  const [requiredMessage, setRequiredMessage] = useState<RequiredType>({
    username: null,
    userpw: null,
    userTitle: null,
    usercontent: null,
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

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

  const onAddPostsButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validMessage = '필수입력 사항입니다.';
    postData.username &&
      postData.userpw &&
      postData.userTitle &&
      postData.usercontent &&
      setRequiredMessage((prev) => {
        return {
          ...prev,
          username: postData.username ? null : validMessage,
          userpw: postData.userpw ? null : validMessage,
          userTitle: postData.userTitle ? null : validMessage,
          usercontent: postData.usercontent ? null : validMessage,
        };
      });
  };

  useEffect(() => {
    postData.username &&
    postData.userpw &&
    postData.userTitle &&
    postData.usercontent
      ? setSubmitButtonDisabled(false)
      : setSubmitButtonDisabled(true);
  }, [postData]);

  return (
    <form className={s.formS} onSubmit={(event) => onAddPostsButton(event)}>
      <div className={s.flexBox}>
        <Input
          type="text"
          placeholder="작성자 명을 입력해 주세요"
          label="작성자"
          id="username"
          required={requiredMessage}
          onChangeFnc={onPostFormChange}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          label="비밀번호"
          id="userpw"
          required={requiredMessage}
          onChangeFnc={onPostFormChange}
        />
      </div>
      <div className={s.lineBox}></div>
      <Input
        type="text"
        placeholder="제목을 입력해 주세요"
        label="제목"
        id="userTitle"
        required={requiredMessage}
        onChangeFnc={onPostFormChange}
      />
      <div className={s.lineBox}></div>
      <Textarea
        placeholder="내용을 입력해주세요."
        label="내용"
        id="usercontent"
        required={requiredMessage}
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
          onChangeFnc={onPostFormChange}
        />
        <Input
          type="text"
          placeholder="상세주소"
          id="userAdressDetail"
          onChangeFnc={onPostFormChange}
        />
      </div>
      <Input
        label="유튜브링크"
        type="text"
        placeholder="링크를 입력해 주세요."
        id="youtubeLink"
        onChangeFnc={onPostFormChange}
      />
      <div className={s.flexBox}>
        <Input
          label="사진 첨부"
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          onChangeFnc={onPostFormChange}
        />
        <Input
          type="file"
          placeholder="클릭해서 사진 업로드"
          id="photoUpload"
          onChangeFnc={onPostFormChange}
        />
        <Input
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
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default AddPostsForm;
