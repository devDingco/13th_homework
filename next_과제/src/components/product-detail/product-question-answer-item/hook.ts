import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  FetchTravelproductQuestionAnswersDocument,
  DeleteTravelproductQuestionAnswerDocument,
} from "@/commons/graphql/graphql";
// import { DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER } from "@/components/product-detail/product-question-answer-item/queries";
// import { DELETE_TRAVEL_PRODUCT_QUESTION } from "@/components/product-detail/product-question-item/queries";

export const useQuestionAnswerItem = ({
  questionId,
}: {
  questionId: string;
}) => {
  const [deletePrdQuestionAnswer] = useMutation(
    DeleteTravelproductQuestionAnswerDocument
  );

  const [isEdit, setIsEdit] = useState(false);

  // ! 답변 수정 모드
  const editModeHandler = () => {
    setIsEdit(!isEdit);
  };

  // ! 답변 삭제
  const deleteQuestionAnswer = async (questionAnswerId: string) => {
    const confirmDelete = confirm("정말 답변을 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      const result = await deletePrdQuestionAnswer({
        variables: {
          travelproductQuestionAnswerId: questionAnswerId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionAnswersDocument,
            variables: { travelproductQuestionId: questionId },
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

  return {
    isEdit,
    editModeHandler,
    deleteQuestionAnswer,
  };
};
