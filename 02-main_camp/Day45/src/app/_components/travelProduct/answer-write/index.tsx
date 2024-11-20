import React from "react";
import CommentWrite from "../../../../commons/ui/comment/write";
import useTravelProductAnswerWrite from "./hook";
import { FormProvider } from "react-hook-form";
import { ITravelProductAnswerSchema } from "@/app/_schema/travelProductAnswer";
import { FetchTravelproductQuestionAnswersQuery } from "@/commons/gql/graphql";

interface ITravelProductAnswerProps {
  isEdit?: boolean;
  travelproductQuestionId: string;
  travelproductQuestionAnswerId?: string;
  data?: FetchTravelproductQuestionAnswersQuery["fetchTravelproductQuestionAnswers"][0];
  handleComplete?: () => void;
  handleCancel?: () => void;
}

export default function TravelProductAnswerWrite({
  isEdit = false,
  travelproductQuestionId,
  travelproductQuestionAnswerId,
  data,
  handleComplete,
  handleCancel,
}: ITravelProductAnswerProps) {
  const { methods, onClickSubmit, onClickEdit } = useTravelProductAnswerWrite({
    isEdit,
    data,
    travelproductQuestionId,
    travelproductQuestionAnswerId,
    handleComplete,
  });

  const handleSubmit = isEdit ? onClickEdit : onClickSubmit;
  const buttonText = isEdit ? "수정 하기" : "답변 하기";

  return (
    <FormProvider {...methods}>
      <div>
        <CommentWrite<ITravelProductAnswerSchema>
          methods={methods}
          hiddenLabel={true}
          hiddenCancel={false}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          placeholder="답변할 내용을 입력해 주세요."
          buttonText={buttonText}
        />
      </div>
    </FormProvider>
  );
}
