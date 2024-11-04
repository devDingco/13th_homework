import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  DeleteTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/graphql/graphql";

export const useQuestionItem = () => {
  const { productId }: { productId: string } = useParams();

  const [deletePrdQuestion] = useMutation(DeleteTravelproductQuestionDocument);

  const [isEdit, setIsEdit] = useState(false);

  // ! 질문 수정 모드
  const editModeHandler = () => {
    setIsEdit(!isEdit);
  };

  // ! 질문 삭제
  const deleteProductQuestion = async (questionId: string) => {
    const confirmDelete = confirm("정말 질문을 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      const result = await deletePrdQuestion({
        variables: {
          travelproductQuestionId: String(questionId),
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionsDocument,
            variables: { travelproductId: productId },
          },
        ],
      });
      console.log(result);
      alert("질문이 삭제되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const [isAnswer, setIsAnswer] = useState(false);
  const questionAnswerModeHandler = () => {
    setIsAnswer(!isAnswer);
  };

  return {
    isEdit,
    deleteProductQuestion,
    editModeHandler,
    questionAnswerModeHandler,
    isAnswer,
  };
};
