"use client";

import {
  MutationCreateBoardCommentArgs,
  MutationUpdateBoardCommentArgs,
} from "@/commons/graphql/graphql";
import {
  CreateBoardCommentDocument,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IuseCommentWriteProps } from "@/components/board-detail/comment-write/types";
import { IformList } from "@/components/board-write/types";
import { useModalStore } from "@/commons/stores/modal-store";

export const useCommentWrite = (props: IuseCommentWriteProps) => {
  const { setIsModal } = useModalStore();

  const { data, editModeHandler } = props;
  const methods = useForm<IformList>({
    mode: "onChange",
  });

  const { boardId }: { boardId: string } = useParams();

  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  // ! 댓글 등록
  const commentNew = async () => {
    try {
      const { commentWriter, commentPassword, commentContents, commentRating } =
        methods.getValues();

      const newCommentData: MutationCreateBoardCommentArgs = {
        createBoardCommentInput: {
          contents: "",
          rating: 0,
        },
        boardId: boardId,
      };
      if (commentWriter)
        newCommentData.createBoardCommentInput.writer = commentWriter;
      if (commentPassword)
        newCommentData.createBoardCommentInput.password = commentPassword;
      if (commentContents)
        newCommentData.createBoardCommentInput.contents = commentContents;
      if (commentRating)
        newCommentData.createBoardCommentInput.rating = commentRating;

      await createBoardComment({
        variables: newCommentData,
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchBoardComments: (prev) => {
                // 기존 댓글 리스트에 신규 댓글 데이터 추가
                return [data?.createBoardComment, ...prev];
              },
            },
          });
        },
      });

      setIsModal({ name: "success", contents: "댓글 등록이 완료되었습니다." }); // 댓글 등록 완료 모달

      // 입력창 초기화
      methods.setValue("commentWriter", "");
      methods.setValue("commentPassword", "");
      methods.setValue("commentContents", "");
      methods.setValue("commentRating", 0);
    } catch (error) {
      if (error instanceof Error) {
        setIsModal({ name: "error" }); // 예상치 못한 오류 모달
      }
    }
  };

  // !댓글 수정
  const commentEdit = async () => {
    try {
      const { commentPassword, commentContents, commentRating } =
        methods.getValues();

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
        return setIsModal({
          name: "required",
          contents: "비밀번호를 입력해 주세요.",
        }); // 비밀번호 미입력시 안내 모달

      await updateBoardComment({
        variables: editCommentData,
        // refetchQueries: [
        //   {
        //     query: FetchBoardCommentsDocument,
        //     variables: { boardId: boardId },
        //   },
        // ],
      });

      setIsModal({ name: "success", contents: "댓글 수정이 완료되었습니다." }); // 댓글 수정 완료 모달

      if (editModeHandler) {
        editModeHandler(); // 수정 모드 종료
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsModal({
          name: "error",
          contents: "비밀번호가 일치하지 않습니다.",
        }); // 비밀번호 불일치 안내 모달
      } else {
        setIsModal({ name: "error" }); // 예상치 못한 오류 모달
      }
    }
  };

  return {
    commentNew,
    commentEdit,
    methods,
    data,
  };
};
