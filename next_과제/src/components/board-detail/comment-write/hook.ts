import { useState } from "react";
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
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<IcommentForm>({
    mode: "onChange",
  });

  const params = useParams();

  const [textCount, setTextCount] = useState(0); // 댓글 글자 수
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부
  const [modalType, setModalType] = useState(""); // 모달 타입

  const modalControl = ({ type }: { type: string }) => {
    setIsModalOpen((isOpen) => !isOpen);
    setModalType(type);
  };

  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  // !댓글 수정 모드 취소
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
    try {
      const { commentWriter, commentPassword, commentContents, commentRating } =
        getValues();

      const newCommentData = {
        createBoardCommentInput: {
          writer: "",
          password: "",
          contents: "",
          rating: 0,
        },
        boardId: String(params.boardId),
      };
      if (commentWriter)
        newCommentData.createBoardCommentInput.writer = commentWriter;
      if (commentPassword)
        newCommentData.createBoardCommentInput.password = commentPassword;
      if (commentContents)
        newCommentData.createBoardCommentInput.contents = commentContents;
      if (commentRating > 0)
        newCommentData.createBoardCommentInput.rating = commentRating;

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

      // 댓글 등록 완료 모달
      modalControl({ type: "commentNewSubmit" });

      // 입력창 초기화
      setValue("commentWriter", "");
      setValue("commentPassword", "");
      setValue("commentContents", "");
      setValue("commentRating", 0);
    } catch (error) {
      if (error instanceof Error) {
        modalControl({ type: "commentNewErrorUnknown" }); // 예상치 못한 오류 모달
      }
    }
  };

  // !댓글 수정 최종 저장
  const commentEdit = async () => {
    try {
      const { commentPassword, commentContents, commentRating } = getValues();

      const editCommentData = {
        updateBoardCommentInput: { contents: "", rating: 0 },
        password: commentPassword,
        boardCommentId: String(data?._id),
      };

      if (commentContents)
        editCommentData.updateBoardCommentInput.contents = commentContents;
      if (commentRating > 0)
        editCommentData.updateBoardCommentInput.rating = commentRating;
      if (commentPassword === "")
        return modalControl({
          type: "commentEditPasswordRequired",
        }); // 비밀번호 입력 안내 모달

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

      modalControl({ type: "commentEditSubmit" }); // 수정 완료 모달
      editModeCancel(); // 수정 모드 취소
    } catch (error) {
      if (error instanceof Error) {
        modalControl({ type: "commentEditPasswordError" }); // 비밀번호 오류 모달
      } else {
        modalControl({ type: "commentEditErrorUnknown" }); // 예상치 못한 오류 모달
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
    errors,
    editModeCancel,
    control,
    setValue,
    isModalOpen,
    setIsModalOpen,
    modalType,
  };
};
