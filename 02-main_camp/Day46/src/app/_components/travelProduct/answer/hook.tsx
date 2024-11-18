import {
  DeleteTravelproductQuestionAnswerDocument,
  FetchTravelproductQuestionAnswersDocument,
} from "@/commons/gql/graphql";
import { useMutation } from "@apollo/client";
import { useState } from "react";

interface IUseTravelProductAnswerProps {
  travelproductQuestionId: string;
  travelproductQuestionAnswerId: string;
}

export default function useTravelProductAnswer({
  travelproductQuestionId,
  travelproductQuestionAnswerId,
}: IUseTravelProductAnswerProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteTravelproductQuestionAnswer] = useMutation(
    DeleteTravelproductQuestionAnswerDocument
  );

  const disableEdit = () => {
    setIsEdit(false);
  };

  const enableEdit = () => {
    setIsEdit(true);
  };

  const onClickEditIcon = () => {
    enableEdit();
  };

  const handleCancel = () => {
    disableEdit();
  };

  const onClickDeleteIcon = async () => {
    try {
      await deleteTravelproductQuestionAnswer({
        variables: {
          travelproductQuestionAnswerId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionAnswersDocument,
            variables: {
              travelproductQuestionId,
            },
          },
        ],
      });
    } catch (error) {}
  };

  return {
    isEdit,
    onClickEditIcon,
    onClickDeleteIcon,
    handleCancel,
    disableEdit,
  };
}
