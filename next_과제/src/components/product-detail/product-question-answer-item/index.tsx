"use client";

import Icon from "@/components/icon-factory";
import QuestionAnswerWrite from "../product-question-answer-write";
import { useQuestionAnswerItem } from "@/components/product-detail/product-question-answer-item/hook";
import { dateViewSet } from "@/utils/dateViewSet";
import { FetchTravelproductQuestionAnswersQuery } from "@/commons/graphql/graphql";
import Image from "next/image";

interface IquestionAnswerItemProps {
  questionAnswerData: FetchTravelproductQuestionAnswersQuery["fetchTravelproductQuestionAnswers"][0];
  questionId: string;
}

export default function QuestionAnswerItem(props: IquestionAnswerItemProps) {
  const { questionAnswerData, questionId } = props;

  const { isEdit, editModeHandler, deleteQuestionAnswer } =
    useQuestionAnswerItem({ questionId });

  return (
    <div className="flex flex-col gap-2">
      {isEdit ? (
        <QuestionAnswerWrite
          data={questionAnswerData}
          editModeHandler={editModeHandler}
          questionId={questionId}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <span className="rounded-full overflow-hidden bg-gray-600 w-6 h-6">
                  <Image
                    src={
                      questionAnswerData?.user?.picture
                        ? process.env.NEXT_PUBLIC_IMAGE_HOST_NAME +
                          questionAnswerData?.user?.picture
                        : "/images/profile.png"
                    }
                    alt={questionAnswerData?.user?.name}
                    width={24}
                    height={24}
                  />
                </span>
                <span className="text-gray-700 text-sm">
                  {questionAnswerData?.user?.name}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editModeHandler()}>
                <div className="blind">답변 수정 모드 설정 버튼</div>
                <Icon icon="edit" className="w-6 h-6" />
              </button>
              <button
                onClick={() => deleteQuestionAnswer(questionAnswerData?._id)}
              >
                <div className="blind">답변 삭제 버튼</div>
                <Icon icon="close" className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* 답변 내용 */}
          <p className="text-base">{questionAnswerData?.contents}</p>

          {/* 답변 날짜 */}
          <div className="text-gray-400 text-sm">
            {dateViewSet(questionAnswerData?.createdAt)}
          </div>
        </>
      )}
    </div>
  );
}
