import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  DeleteTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/graphql/graphql";
import { useUserInfo } from "@/commons/stores/user-info-store";
import { useModalStore } from "@/commons/stores/modal-store";

export const useQuestionItem = () => {
  const { productId }: { productId: string } = useParams();
  const { setIsModal } = useModalStore();

  const [deletePrdQuestion] = useMutation(DeleteTravelproductQuestionDocument);

  const [isEdit, setIsEdit] = useState(false);

  const { userInfo } = useUserInfo();
  const userId = userInfo?.id;

  // ! 질문 수정 모드
  const editModeHandler = () => {
    setIsEdit(!isEdit);
  };

  // ! 질문 삭제
  const deleteProductQuestion = (questionId: string) => {
    setIsModal({
      name: "delete_check",
      confirm: async () => {
        try {
          const result = await deletePrdQuestion({
            variables: {
              travelproductQuestionId: questionId,
            },
            refetchQueries: [
              {
                query: FetchTravelproductQuestionsDocument,
                variables: { travelproductId: productId },
              },
            ],
          });
          console.log(result);
          setIsModal({ name: "success", contents: "질문이 삭제되었습니다." });
        } catch (error) {
          if (error instanceof Error) {
            alert(`${error.message}`);
          } else {
            alert("An unknown error occurred");
          }
        }
      },
    });
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
    userId,
  };
};
