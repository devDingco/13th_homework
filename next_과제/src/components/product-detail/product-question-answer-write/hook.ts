"use client";

import {
  CreateTravelproductQuestionAnswerDocument,
  UpdateTravelproductQuestionAnswerDocument,
  FetchTravelproductQuestionAnswersDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { IuseQuestionAnswerWriteProps, Iuseform } from "./types";

export const useQuestionAnswerWrite = (props: IuseQuestionAnswerWriteProps) => {
  const { editModeHandler, questionId } = props;

  const methods = useForm<Iuseform>({
    mode: "onChange",
  });

  const [createPrdQuestionAnswer] = useMutation(
    CreateTravelproductQuestionAnswerDocument
  );
  const [updatePrdQuestionAnswer] = useMutation(
    UpdateTravelproductQuestionAnswerDocument
  );

  // ! 답변 등록하기
  const createQuestionAnswer = async (questionId: string) => {
    const { questionAnswerContents } = methods.getValues();

    try {
      await createPrdQuestionAnswer({
        variables: {
          createTravelproductQuestionAnswerInput: {
            contents: questionAnswerContents,
          },
          travelproductQuestionId: questionId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionAnswersDocument,
            variables: { travelproductQuestionId: questionId },
          },
        ],
      });
      alert("답변이 등록되었습니다.");
      methods.reset(); // input 초기화
    } catch (error) {
      console.log(error);
    }
  };

  // ! 답변 수정하기
  const updateQuestionAnswer = async (questionAnswerId: string) => {
    const { questionAnswerContents } = methods.getValues();
    // console.log(questionAnswerContents, questionAnswerId, questionId);

    try {
      await updatePrdQuestionAnswer({
        variables: {
          updateTravelproductQuestionAnswerInput: {
            contents: questionAnswerContents,
          },
          travelproductQuestionAnswerId: questionAnswerId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionAnswersDocument,
            variables: { travelproductQuestionId: questionId },
          },
        ],
      });
      alert("답변이 수정되었습니다.");
      if (editModeHandler) {
        editModeHandler(); // 수정 모드 종료
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createQuestionAnswer,
    updateQuestionAnswer,
    methods,
  };
};
