import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql";
import { errorModal } from "@/utils/modal";
import { ApolloError, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ICommentWriteProps } from "./types";

export const useCommentWrite = (props: ICommentWriteProps) => {
  // commentInfo state
  const [commentInfo, setCommentInfo] = useState({
    writer: props.comment?.writer ?? "",
    password: "",
    contents: props.comment?.contents ?? "",
  });

  // rating state
  const [rating, setRating] = useState(props.comment?.rating ?? 0);

  const params = useParams();
  // boardId
  const boardId = params.boardId as string;

  const [createBoardComment] = useMutation(CreateBoardCommentDocument, {
    refetchQueries: [
      {
        query: FetchBoardCommentsDocument,
        variables: { boardId },
      },
    ],
  });

  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument, {
    refetchQueries: [
      {
        query: FetchBoardCommentsDocument,
        variables: { boardId },
      },
    ],
  });

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // input state에 넣기
    const newInputs = {
      ...commentInfo,
      [event.target.name]: event.target.value,
    };
    setCommentInfo(newInputs);
  };

  // 필수 입력사항 모두 입력했는지
  const allInputFilled =
    commentInfo.writer.trim() !== "" && commentInfo.password.trim() !== "";

  const commentFilled = commentInfo.contents.trim() !== "";

  const commentSubmit = async () => {
    try {
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: commentInfo.writer,
            password: commentInfo.password,
            contents: commentInfo.contents,
            rating: rating,
          },
          boardId,
        },
      });
      console.log(result);
      alert("댓글 등록 완료😊");
    } catch (error) {
      console.error(error);
    }
  };

  // 댓글 수정 뮤테이션
  const commentEdit = async () => {
    try {
      const EditResult = await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: commentInfo.contents,
            rating: rating,
          },
          password: commentInfo.password,
          boardCommentId: props.editId,
        },
      });
      console.log(EditResult);
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error(error?.graphQLErrors[0].message);
        errorModal(error?.graphQLErrors[0].message);
      } else {
        console.error(error);
        errorModal("에러가 발생하였습니다.");
      }
    }
  };

  const onClickSubmit = () => {
    // 댓글 등록
    commentSubmit();
    // 인풋, 별점 초기화
    setCommentInfo({ writer: "", password: "", contents: "" });
    setRating(0);
  };

  const onClickEdit = () => {
    // 수정하기 graphql
    commentEdit();
    // 수정하는 화면 닫고 수정된 댓글 보여주기
    props.closeEdit();
  };

  return {
    onChangeInput,
    onClickSubmit,
    setRating,
    onClickEdit,
    commentInfo,
    rating,
    allInputFilled,
    commentFilled,
  };
};
