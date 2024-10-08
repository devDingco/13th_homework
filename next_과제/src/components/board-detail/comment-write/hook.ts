import { useState } from "react";
// import {
//   CREATE_BOARD_COMMENT,
//   UPDATE_BOARD_COMMENT,
// } from "@/components/board-detail/comment-write/queries";
// import { FETCH_BOARD_COMMENTS } from "@/components/board-detail/comment-list/queries";

import {
  CreateBoardCommentDocument,
  UpdateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  IcommentForm,
  IuseCommentWriteProps,
} from "@/components/board-detail/comment-write/types";

export const useCommentWrite = (props: IuseCommentWriteProps) => {
  const { setMode, mode, commentIndex, data } = props;
  const {
    register,
    getValues,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<IcommentForm>({
    mode: "onChange",
  });

  const params = useParams();

  const [textCount, setTextCount] = useState(0);

  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  // 댓글 수정 모드 취소
  const editModeCancel = () => {
    if (mode && Array.isArray(mode) && commentIndex !== undefined && setMode) {
      const idx = commentIndex;
      const newMode = [...mode];
      newMode[idx] = newMode[idx] === "view" ? "edit" : "view";
      setMode(newMode);
    }
  };

  // !댓글 등록
  const commentNew = async () => {
    const { commentWriter, commentPassword, commentContents } = getValues();
    const newCommentData = {
      createBoardCommentInput: {
        writer: "",
        password: "",
        contents: "",
        rating: 30,
      },
      boardId: String(params.boardId),
    };
    if (commentWriter)
      newCommentData.createBoardCommentInput.writer = commentWriter;
    if (commentPassword)
      newCommentData.createBoardCommentInput.password = commentPassword;
    if (commentContents)
      newCommentData.createBoardCommentInput.contents = commentContents;

    const result = await createBoardComment({
      variables: newCommentData,
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: { page: 1, boardId: String(params.boardId) },
        },
      ],
    });
    console.log(result);
    alert("댓글이 등록되었습니다.");
    // 입력창 초기화
    setValue("commentWriter", "");
    setValue("commentPassword", "");
    setValue("commentContents", "");
  };

  // !댓글 수정 최종 저장
  const commentEdit = async () => {
    console.log(getValues(), data);

    try {
      const { commentPassword, commentContents } = getValues();

      const editCommentData = {
        updateBoardCommentInput: { contents: "" },
        password: commentPassword,
        boardCommentId: String(data?._id),
      };

      if (commentContents)
        editCommentData.updateBoardCommentInput.contents = commentContents;
      if (commentPassword === "") return alert("비밀번호를 입력해 주세요.");

      const result = await updateBoardComment({
        variables: editCommentData,
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { page: 1, boardId: String(params.boardId) },
          },
        ],
      });
      console.log(result);
      alert("댓글이 수정되었습니다.");
      editModeCancel();
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return {
    register,
    textCount,
    setTextCount,
    commentNew,
    commentEdit,
    isDirty,
    isValid,
  };
};
