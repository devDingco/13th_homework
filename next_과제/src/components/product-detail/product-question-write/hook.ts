import {
  CreateTravelproductQuestionDocument,
  UpdateTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useLoginCheck } from "@/commons/hooks/useLoginCheck";
import { useModalStore } from "@/commons/stores/modal-store";

import { IuseQuestionWriteProps, Iuseform } from "./types";

export const useQuestionWrite = (props: IuseQuestionWriteProps) => {
  const { editModeHandler } = props;
  const { setIsModal } = useModalStore();
  const { isLogin } = useLoginCheck();

  const methods = useForm<Iuseform>({
    mode: "onChange",
  });

  const { productId }: { productId: string } = useParams();

  const [createPrdQuestion] = useMutation(CreateTravelproductQuestionDocument);
  const [updatePrdQuestion] = useMutation(UpdateTravelproductQuestionDocument);

  // ! 질문 등록하기
  const createQuestion = async () => {
    const { questionContents } = methods.getValues();

    if (!isLogin) {
      return setIsModal({ name: "login_check_stay" }); // 로그인 확인 모달 띄우기
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

      setIsModal({ name: "success", contents: "질문이 등록되었습니다." }); // 질문 등록 완료 모달
      methods.reset(); // 질문 입력창 초기화
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

      setIsModal({ name: "success", contents: "질문이 수정되었습니다." }); // 질문 수정 완료 모달

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
