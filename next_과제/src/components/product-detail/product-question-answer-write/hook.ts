"use client";

import {
  CreateTravelproductQuestionAnswerDocument,
  UpdateTravelproductQuestionAnswerDocument,
  FetchTravelproductQuestionAnswersDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { IuseQuestionAnswerWriteProps, Iuseform } from "./types";

export const useQuestionAnswerWrite = (props: IuseQuestionAnswerWriteProps) => {
  const { data, editModeHandler, questionId } = props;
  console.log("questionId", questionId);
  const {
    getValues,
    setValue,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Iuseform>({
    mode: "onChange",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부
  const [modalType, setModalType] = useState(""); // 모달 타입

  const modalControl = ({ type }: { type: string }) => {
    setIsModalOpen((isOpen) => !isOpen);
    setModalType(type);
  };

  const [createPrdQuestionAnswer] = useMutation(
    CreateTravelproductQuestionAnswerDocument
  );
  const [updatePrdQuestionAnswer] = useMutation(
    UpdateTravelproductQuestionAnswerDocument
  );

  // ! 답변 등록하기
  const createQuestionAnswer = async (questionId: string) => {
    const { questionAnswerContents } = getValues();

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
      setValue("questionAnswerContents", ""); // 질문 입력창 초기화
    } catch (error) {
      console.log(error);
    }
  };

  // ! 답변 수정하기
  const updateQuestionAnswer = async (questionAnswerId: string) => {
    const { questionAnswerContents } = getValues();
    console.log(questionAnswerContents, questionAnswerId, questionId);

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
    isDirty,
    isValid,
    errors,
    control,
    data,
    isModalOpen,
    setIsModalOpen,
    modalType,
  };
};
