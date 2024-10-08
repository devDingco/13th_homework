"use client";

import Image from "next/image";
// 아이콘 svg로 변경하기
import chat from "../../../../../public/icons/chat.png";
import stars from "../../../../../public/icons/star.png";
import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { postSubmitButton } from "../../button";
import { useParams } from "next/navigation";

const CREATE_COMMIT = gql`
  mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {
    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {
      _id
      writer
      contents
      createdAt
      updatedAt
    }
  }
`;

const CommentWriteComponent = () => {
  const param = useParams();
  const [createBoardComment] = useMutation(CREATE_COMMIT);

  const [isVaild, setIsVaild] = useState(false);
  const [buttonActiveStyle, setButtonActiveStyle] = useState(false);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");

  const [writerVaild, setwriterVaild] = useState("");
  const [passwordVaild, setPasswordVaild] = useState("");
  const [contentsVaild, setContentsVaild] = useState("");

  const onChangewriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value && password && contents) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setwriterVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (writer && event.target.value && contents) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setPasswordVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if (writer && password && event.target.value) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setContentsVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onClickSubmitComment = async () => {
    try {
      if (isVaild && writer && password && contents) {
        const result = await createBoardComment({
          variables: {
            boardId: param.boardId,
            createBoardCommentInput: {
              writer: writer,
              password: password,
              contents: contents,
              rating: 0,
            },
          },
        });

        console.log(result);
        alert("댓글 등록이 완료 되었습니다.");
      }
    } catch (error) {
      console.log(error);
      alert(`에러가 발생했습니다. 다시 시도하여 주세요. \n error: ${error}`);
    } finally {
    }
  };

  return (
    <div>
      <div>
        <Image src={chat} alt="댓글" width={0} height={0} />
        <p>댓글</p>
      </div>
      <div>
        {/* map 사용 */}
        <Image src={stars} alt="랭킨" width={0} height={0} />
      </div>
      <div>
        <div>
          <p>작성자</p>
          <input id="commentWriter" placeholder="작성자 명을 입력해 주세요" onChange={onChangewriter} />
          <p
            id="postPasswordVaild"
            style={{
              display: !writer ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {writerVaild}
          </p>
        </div>
        <div>
          <p>비밀번호</p>
          <input id="commentPassword" placeholder="비밀번호를 입력해 주세요" onChange={onChangePassword} />
          <p
            id="postPasswordVaild"
            style={{
              display: !password ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {passwordVaild}
          </p>
        </div>
      </div>
      <div>
        <textarea id="commentContent" onChange={onChangeComment}></textarea>
        <p>0/100</p>
        <p
          id="postPasswordVaild"
          style={{
            display: !contents ? "block" : "none",
            color: "var(--red, #F66A6A)",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "2.4rem",
          }}
        >
          {contentsVaild}
        </p>
      </div>
      {postSubmitButton({ onClick: onClickSubmitComment }, buttonActiveStyle)}
    </div>
  );
};

export default CommentWriteComponent;
