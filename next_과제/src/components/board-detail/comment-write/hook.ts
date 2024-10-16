import {
  MutationCreateBoardCommentArgs,
  MutationUpdateBoardCommentArgs,
} from "@/commons/graphql/graphql";
import { useState } from "react";
import {
  CreateBoardCommentDocument,
  UpdateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IuseCommentWriteProps } from "@/components/board-detail/comment-write/types";
import { IformList } from "@/components/board-write/types";

export const useCommentWrite = (props: IuseCommentWriteProps) => {
  const { data, editModeHandler } = props;
  const {
    getValues,
    setValue,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<IformList>({
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

  // !댓글 등록
  const commentNew = async () => {
    try {
      const { commentWriter, commentPassword, commentContents, commentRating } =
        getValues();

      const newCommentData: MutationCreateBoardCommentArgs = {
        createBoardCommentInput: {
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
      if (commentRating)
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
      // console.log(commentPassword, commentContents, commentRating);

      const editCommentData: MutationUpdateBoardCommentArgs = {
        updateBoardCommentInput: {},
        password: commentPassword,
        boardCommentId: String(data?._id),
      };

      if (commentContents)
        editCommentData.updateBoardCommentInput.contents = commentContents;
      if (commentRating)
        editCommentData.updateBoardCommentInput.rating = commentRating;
      if (commentPassword === "")
        return modalControl({
          type: "commentEditPasswordRequired",
        }); // 비밀번호 입력 안내 모달

      await updateBoardComment({
        variables: editCommentData,
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { page: 1, boardId: String(params.boardId) },
          },
        ],
      });

      modalControl({ type: "commentEditSubmit" }); // 수정 완료 모달
      if (editModeHandler) {
        editModeHandler(); // 수정 모드 종료
      }
    } catch (error) {
      if (error instanceof Error) {
        modalControl({ type: "commentEditPasswordError" }); // 비밀번호 오류 모달
      } else {
        modalControl({ type: "commentEditErrorUnknown" }); // 예상치 못한 오류 모달
      }
    }
  };

  return {
    textCount,
    setTextCount,
    commentNew,
    commentEdit,
    isDirty,
    isValid,
    errors,
    control,
    setValue,
    isModalOpen,
    setIsModalOpen,
    modalType,
    data,
  };
};
