import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/gql/graphql";

export function useCommentWrite() {
  const params = useParams();
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [validation, setValidation] = useState({
    writer: "",
    password: "",
    contents: "",
    rating: 0,
  });

  const initialValidationState = {
    writer: "",
    password: "",
    contents: "",
    rating: 0,
  };

  const validateForm = () => {
    const isValid = validation.writer !== "" && validation.password !== "";
    setIsActive(isValid);
    return isValid;
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const commentValidation = {
      ...validation,
      [event.target.name]: event.target.value,
    };

    setValidation(commentValidation);
    validateForm();
  };

  const onClickSubmit = async () => {
    try {
      if (validation.writer && validation.password) {
        await createBoardComment({
          variables: {
            createBoardCommentInput: {
              ...validation,
            },
            boardId: String(params.boardId),
          },
          refetchQueries: [
            {
              query: FetchBoardCommentsDocument,
              variables: {
                boardId: params.boardId,
              },
            },
          ],
        });
        setValidation(initialValidationState);
      }
    } catch (error) {
      console.error("에러가 발생하였습니다. 다시 시도해주세요.", error);
    }
  };

  return {
    onChange,
    onClickSubmit,
    isActive,
    validation,
  };
}
