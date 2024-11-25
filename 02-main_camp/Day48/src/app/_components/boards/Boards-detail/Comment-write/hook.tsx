import CONSTANTS_ALERT_MESSAGE from "@/commons/constants/alert";
import {
  CreateBoardCommentDocument,
  CreateBoardCommentInput,
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
  UpdateBoardCommentDocument,
} from "@/commons/gql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";

import { ChangeEvent, MouseEvent, useState } from "react";
import { useBoardWrite } from "../../Boards-write/hook";

interface ICommentWriteProps {
  comments: FetchBoardCommentsQuery["fetchBoardComments"][0] | undefined;
  toggleEditMode: () => void;
  toggleHasMoreScroll: () => void;
}

const useCommentWrite = ({
  comments,
  toggleEditMode,
  toggleHasMoreScroll,
}: ICommentWriteProps) => {
  const params = useParams();
  const { showSuccessModal, showErrorModal } = useBoardWrite();
  const [commentInput, setCommentInput] = useState<CreateBoardCommentInput>({
    writer: comments?.writer ?? "",
    password: "",
    contents: comments?.contents ?? "",
    rating: comments?.rating ?? 0,
  });

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);

  const onChangeCommentInput = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const inputName = event.target.name;
    updateCommentInput(inputName, value);
  };

  const updateCommentInput = (inputName: string, value: string) => {
    setCommentInput((prev) => {
      return {
        ...prev,
        [inputName]: value,
      };
    });
  };

  const onChangeRating = (value: number) => {
    setCommentInput((prev) => {
      return {
        ...prev,
        rating: value,
      };
    });
  };

  const resetInputValue = () => {
    setCommentInput({
      writer: "",
      password: "",
      contents: "",
      rating: 0,
    });
  };

  const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      const _ = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: commentInput.writer,
            password: commentInput.password,
            contents: commentInput.contents,
            rating: commentInput.rating,
          },
          boardId: String(params.boardId),
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              page: 1,
              boardId: String(params.boardId),
            },
          },
        ],
      });
      showSuccessModal(CONSTANTS_ALERT_MESSAGE.CREATE_COMMENTS_SUCCEED, () => {
        resetInputValue();
      });
      // 댓글 생성 후 다시 스크롤 할 수 있도록 "hasMoreScroll" 상태 변경 필요.
      toggleHasMoreScroll();
    } catch (error) {
      showErrorModal(
        "댓글 작성 오류",
        `${CONSTANTS_ALERT_MESSAGE.CREATE_COMMENTS_FAILED} (${error})`
      );
    }
  };

  const onClickUpdate = async () => {
    const _ = await updateBoardComment({
      variables: {
        updateBoardCommentInput: {
          contents: commentInput.contents,
          rating: commentInput.rating,
        },
        boardCommentId: comments?._id ?? "",
        password: commentInput.password,
      },
    });
    // 댓글 업데이트 후 컴포넌트를 변경하기 위해서 "isEdit" 상태를 변경해야함.
    toggleEditMode();
  };

  return {
    commentInput,
    onChangeCommentInput,
    onChangeRating,
    onClickSubmit,
    onClickUpdate,
  };
};

export default useCommentWrite;
