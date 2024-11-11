import {
  CreateTravelproductQuestionDocument,
  UpdateTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useLoginStore } from "@/commons/stores/login-store";

import { IuseQuestionWriteProps, Iuseform } from "./types";

export const useQuestionWrite = (props: IuseQuestionWriteProps) => {
  const { editModeHandler } = props;
  const { isLogged } = useLoginStore();

  const methods = useForm<Iuseform>({
    mode: "onChange",
  });

  const { productId }: { productId: string } = useParams();

  const [createPrdQuestion] = useMutation(CreateTravelproductQuestionDocument);
  const [updatePrdQuestion] = useMutation(UpdateTravelproductQuestionDocument);

  // ! 질문 등록하기
  const createQuestion = async () => {
    const { questionContents } = methods.getValues();
    console.log("질문 내용", questionContents);
    // 로그인한 상태인지 확인
    if (!isLogged) {
      alert("로그인이 필요합니다.");
    }
    try {
      await createPrdQuestion({
        variables: {
          createTravelproductQuestionInput: {
            contents: questionContents,
          },
          travelproductId: productId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionsDocument,
            variables: { travelproductId: productId },
          },
        ],
      });
      alert("질문이 등록되었습니다.");
      methods.setValue("questionContents", ""); // 질문 입력창 초기화
    } catch (error) {
      console.log(error);
    }
  };

  // ! 질문 수정하기
  const updateQuestion = async (questionId: string) => {
    const { questionContents } = methods.getValues();
    try {
      await updatePrdQuestion({
        variables: {
          updateTravelproductQuestionInput: {
            contents: questionContents,
          },
          travelproductQuestionId: questionId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionsDocument,
            variables: { travelproductId: productId },
          },
        ],
      });
      alert("질문이 수정되었습니다.");
      modalControl({ type: "productQuestionEdit" }); // 질문 수정 완료 모달
      if (editModeHandler) {
        editModeHandler(); // 수정 모드 종료
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createQuestion,
    updateQuestion,
    methods,
  };
};
