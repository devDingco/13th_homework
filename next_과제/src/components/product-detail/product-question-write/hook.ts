"use client";

import {
  CreateTravelproductQuestionDocument,
  UpdateTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useState } from "react";

import { IuseQuestionWriteProps, Iuseform } from "./types";

export const useQuestionWrite = (props: IuseQuestionWriteProps) => {
  const { data, editModeHandler } = props;

  const {
    getValues,
    setValue,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Iuseform>({
    mode: "onChange",
  });

  const { productId }: { productId: string } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부
  const [modalType, setModalType] = useState(""); // 모달 타입

  const modalControl = ({ type }: { type: string }) => {
    setIsModalOpen((isOpen) => !isOpen);
    setModalType(type);
  };

  const [createPrdQuestion] = useMutation(CreateTravelproductQuestionDocument);
  const [updatePrdQuestion] = useMutation(UpdateTravelproductQuestionDocument);

  // ! 질문 등록하기
  const createQuestion = async () => {
    const { questionContents } = getValues();
    console.log("질문 내용", questionContents);
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
      setValue("questionContents", ""); // 질문 입력창 초기화
    } catch (error) {
      console.log(error);
    }
  };

  // ! 질문 수정하기
  const updateQuestion = async (questionId: string) => {
    const { questionContents } = getValues();
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
