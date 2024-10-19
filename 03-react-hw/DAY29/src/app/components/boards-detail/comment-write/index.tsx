import Image from "next/image";
import styles from "./styles.module.css";
import FormField from "../../FormField";
import Input from "../../input";
import Textarea from "../../textarea";
import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "next/navigation";

const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export default function CommentWrite() {
  //댓글 등록후 초기화
  const INITIAL_COMMENT_DATA = {
    writer: "",
    password: "",
    rating: 0,
    contents: "",
  };

  //input에 따라 상태 변화
  const [commentData, setCommentData] = useState(INITIAL_COMMENT_DATA);

  //그래프큐엘 내용들 보내기
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

  const params = useParams();
  const boardId = params.boardId;

  // typing value will udate 'commentData.writer or ...' to my typing
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // contents일때만 길이 체크
    if (name === "contents") {
      if (value.length <= 100) {
        setCommentData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      // 100자 넘으면 입력안되게?
    } else {
      // 다른 필드라면 그래도 업데이트
      setCommentData((prev) => ({
        ...prev, //copies all existing properties from the current state
        [name]: value, // updates only specific (writer,, or ~) property with the new value
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); //폼 제출 기본 동작 방지

    try {
      // 댓글 등록
      const commentResult = await createBoardComment({
        variables: {
          createBoardCommentInput: commentData,
          boardId,
        },
      });
      console.log("게시글 댓글 등록 성공: ", commentResult);
      alert("댓글 등록 성공 🍀");
      //성공후 댓글 초기화
      setCommentData(INITIAL_COMMENT_DATA);
    } catch (error) {
      console.error("게시글 댓글 등록 실패: ", error);
    }
  };
  return (
    <form className={styles.commentBox} onSubmit={handleSubmit}>
      <div className={styles.댓글상자}>
        <Image src="/images/icons/chat.svg" width={24} height={24} alt="chat" />
        <span>댓글</span>
      </div>
      <div>별이 있음</div>
      <div className={styles.commentBox_commentInputs}>
        {/* 작성자, 비밀번호 상자 */}
        <div className={styles.commentBox_commentInputs_writerpwBox}>
          <FormField label="작성자" required>
            <Input
              name="writer"
              placeholder="작성자 명을 입력해 주세요"
              onChange={onChange}
              value={commentData.writer}
            />
          </FormField>
          <FormField label="비밀번호" required>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={onChange}
              value={commentData.password}
            />
          </FormField>
        </div>
        {/* 댓글 입력 창 */}
        <Textarea
          name="contents"
          placeholder="댓글을 입력해주세요"
          className={styles.commentBox_comment}
          onChange={onChange}
          value={commentData.contents}
        />
        <span>{`${commentData.contents.length}/100`}</span>
        <div className={styles.commentBox_button_justifyEnd}>
          <button className={styles.commentBox_button} type="submit">
            댓글등록
          </button>
        </div>
      </div>
    </form>
  );
}

/*  댓글 0/100 하는 방법
1. 일단 총길이가 100을 넘지 못함
 ---- commentData.contents.length <= 100
 1.1 현재 글자수 측정하는 법
 ---- 상태를 바로 확인할 수 있어야하므로 useState를 사용하기
 ---- const [commentLength, setCommentLength] = useState(0) 처음에는 길이 0
 ---- setCommentLength(commentLenght.length)
2. span 태그에 값이 변하는 거 연동하기
----- <span>{`${commentLength}/100`}</span>
*/
