"use client";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  CREATE_BOARD,
  UPDATE_BOARD,
} from "../../../commons/graphql/backend-api";
import styles from "./styles.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../ImageUploader/ImageUploader";
import { IBoardsWrite } from "../../../types/components.type";

export default function BoardsWrite(props: IBoardsWrite) {
  const params = useParams();
  const router = useRouter();
  const [writer, setWriter] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const formAction = props.isEdit ? "수정" : "등록";
  const disabledInput = props.isEdit ? true : false;
  const disabledButton = props.isEdit ? !(title && contents) : !(writer && password && title && contents);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "writer":
        setWriter(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "title":
        setTitle(event.target.value);
        break;
      case "youtubeUrl":
        setYoutubeUrl(event.target.value);
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const handleSubmitRegistration = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
          },
        },
      });
      const boardId = result.data.createBoard._id;
      router.push(`/boards/${boardId}`);
    } catch (error) {
      console.error(error);
      alert("An error has occurred. Please try again.");
    }
  };

  const handleSubmitEdit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const myVariables = {
        updateBoardInput: {
          title: title,
          contents: contents,
          youtubeUrl: youtubeUrl,
          // boardAddress: {
          //   zipcode: string,
          //   address: string,
          //   addressDetail: string;
          // };
          // likeCount: number;
          // dislikeCount: number;
          // images: string;
        },
        boardId: params.boardId,
        password: password,
      };
      // if (writer) myVariables.updateBoardInput.writer = writer;
      if (title) myVariables.updateBoardInput.title = title;
      if (contents) myVariables.updateBoardInput.contents = contents;
      // if (password) myVariables.password = password;

      const result = await updateBoard({
        variables: myVariables,
      });
      console.log(result.data);
      alert("수정 완료");
      router.push(`/boards/${result.data?.updateBoard._id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("An error occurred while editing. Please try again.");
    }
  };

  const onSubmit = props.isEdit ? handleSubmitEdit : handleSubmitRegistration;

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form_title}>게시물 {formAction}</div>
        <div className={styles.author_info_wrapper}>
          <div>
            <Input
              isLabel={true}
              id="writer"
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              isRequired={true}
              children="작성자"
              onChange={handleInputChange}
              defaultValue={props.data?.fetchBoard.writer}
              disabled={disabledInput}
            />
            {!writer && (
              <div className={styles.required_field}>필수입력 사항 입니다.</div>
            )}
          </div>
          <div>
            <Input
              isLabel={true}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              isRequired={true}
              children="비밀번호"
              onChange={handleInputChange}
              disabled={disabledInput}
            />
            {!password && (
              <div className={styles.required_field}>필수입력 사항 입니다.</div>
            )}
          </div>
        </div>
        <div className={styles.title_wrapper}>
          <Input
            isLabel={true}
            id="title"
            type="text"
            placeholder="제목을 입력해 주세요."
            isRequired={true}
            children="제목"
            onChange={handleInputChange}
            defaultValue={props.data?.fetchBoard.title}
          />
          {!title && (
            <div className={styles.required_field}>필수입력 사항 입니다.</div>
          )}
        </div>
        <div className={styles.content_wrapper}>
          <div>
            <p>내용</p>
            <b>*</b>
          </div>
          <textarea
            id="content"
            placeholder="내용을 입력해 주세요."
            onChange={handleContentChange}
            defaultValue={props.data?.fetchBoard.contents}
          />
          {!contents && (
            <div className={styles.required_field}>필수입력 사항 입니다.</div>
          )}
        </div>
        <div className={styles.address_wrapper}>
          <div>
            <div>
              <Input
                isLabel={true}
                type="number"
                placeholder="01234"
                isRequired={false}
                children="주소"
                defaultValue={props.data?.fetchBoard.zipcode}
              />
            </div>
            <Button color="white">우편번호 검색</Button>
          </div>
          <Input
            isLabel={false}
            type="text"
            placeholder="주소를 입력해 주세요."
            isRequired={false}
            defaultValue={props.data?.fetchBoard.address}
          />
          <Input
            isLabel={false}
            type="text"
            placeholder="상세주소"
            isRequired={false}
            defaultValue={props.data?.fetchBoard.addressDetail}
          />
        </div>
        <div className={styles.link_wrapper}>
          <Input
            isLabel={true}
            type="url"
            placeholder="링크를 입력해 주세요."
            isRequired={false}
            children="유튜브 링크"
            defaultValue={props.data?.fetchBoard.youtubeUrl}
          />
        </div>
        <div className={styles.photo_wrapper}>
          <p>사진 첨부</p>
          <div>
            <ImageUploader />
            <ImageUploader />
            <ImageUploader />
          </div>
        </div>
        <div className={styles.button_wrapper}>
          <Button color="white">취소</Button>
          <Button
            type="submit"
            disabled={disabledButton}
            color={disabledButton ? "gray" : "blue"}
          >
            {formAction}하기
          </Button>
        </div>
      </form>
    </>
  );
}
