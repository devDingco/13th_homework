import { CreateCommentDocument, FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useCommentsWrite() {
  // 별점
  const [value, setValue] = useState(0);

  // 댓글작성
  // graphql
  const [createComment] = useMutation(CreateCommentDocument);

  const params = useParams();
  const id = params.boardId;

  // useState
  const [writer, setWriter] = useState("");
  const [pw, setPw] = useState("");
  const [content, setContent] = useState("");
  // actie state
  const disabledBtn = !writer.trim() || !pw.trim() || !content.trim();
  // onChange
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  const onChangePw = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // 댓글등록
  const onClickSignup = async () => {
    try {
      const { data } = await createComment({
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: pw,
            contents: content,
            rating: Number(value),
          },
          boardId: String(id),
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId: String(id), page: 1 },
          },
        ],
      });
      console.log("commentWrite:", data);
      alert("댓글 등록이 완료되었습니다.");
      setContent("");
      setWriter("");
      setPw("");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onClickSignup,
    onChangeContent,
    onChangePw,
    onChangeWriter,
    disabledBtn,
    value,
    setValue,
    writer,
    content,
    pw,
  };
}
