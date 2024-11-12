import CommentWrite from "@/commons/ui/comment/write";
import React from "react";
import useTravelProductQuestionWrite from "./hook";
import { ITravelProductQuestionSchema } from "@/app/_schema/travelProductQuestionSchema";
import { FetchTravelproductQuestionsQuery } from "@/commons/gql/graphql";

interface ITravelProductQuestionWrite {
  isEdit?: boolean;
  travelproductId: string;
  travelproductQuestionId?: string;
  data?: FetchTravelproductQuestionsQuery["fetchTravelproductQuestions"][0];
  handleComplete?: () => void;
  handleCancel?: () => void;
}

export default function TravelProductQuestionWrite({
  isEdit = false,
  travelproductId,
  travelproductQuestionId,
  data,
  handleComplete,
  handleCancel,
}: ITravelProductQuestionWrite) {
  const { methods, onClickSubmit, onClickEdit } = useTravelProductQuestionWrite(
    {
      isEdit,
      travelproductId,
      travelproductQuestionId,
      data,
      handleComplete,
    }
  );

  const label = isEdit ? "문의 수정하기" : "문의하기";
  const handleSubmit = isEdit ? onClickEdit : onClickSubmit;
  const buttonText = isEdit ? "수정 하기" : "문의 하기";
  const isHiddenCancel = isEdit ? false : true;

  return (
    <CommentWrite<ITravelProductQuestionSchema>
      methods={methods}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      label={label}
      placeholder="문의사항을 입력해 주세요."
      buttonText={buttonText}
      hiddenCancel={isHiddenCancel}
    ></CommentWrite>
  );
}
