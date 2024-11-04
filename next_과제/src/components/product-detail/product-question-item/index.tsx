"use client";

import Icon from "@/components/icon-factory";
import QuestionAnswerWrite from "../product-question-answer-write";
import { useQuestionItem } from "@/components/product-detail/product-question-item/hook";
import { dateViewSet } from "@/utils/dateViewSet";
import { FetchTravelproductQuestionsQuery } from "@/commons/graphql/graphql";
import Image from "next/image";
import QuestionAnswerList from "../product-question-answer-list";
import QuestionWrite from "../product-question-write";

interface IquestionItemProps {
  questionData: FetchTravelproductQuestionsQuery["fetchTravelproductQuestions"][0];
  reply: boolean;
}

export default function QuestionItem(props: IquestionItemProps) {
  const { questionData, reply } = props;

  const {
    isEdit,
    editModeHandler,
    deleteProductQuestion,
    questionAnswerModeHandler,
    isAnswer,
  } = useQuestionItem();

  return (
    <div className="flex flex-col gap-2 py-10 border-t first:border-0">
      <div className="flex flex-col gap-3">
        {isEdit ? (
          <QuestionWrite
            data={questionData}
            questionId={questionData._id}
            editModeHandler={editModeHandler}
            isEdit={isEdit}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <span className="rounded-full overflow-hidden bg-gray-600 w-6 h-6">
                  <Image
                    src={
                      questionData?.user?.picture
                        ? process.env.NEXT_PUBLIC_IMAGE_HOST_NAME +
                          questionData?.user?.picture
                        : "/images/profile.png"
                    }
                    alt={questionData?.user?.name}
                    width={24}
                    height={24}
                  />
                </span>
                {/* !! 나중에 유저명으로 바꾸기 */}
                <span className="text-gray-700 text-sm">
                  {questionData?.user?.name}
                </span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => editModeHandler()}>
                  <div className="blind">질문수정</div>
                  <Icon icon="edit" className="w-6 h-6" />
                </button>
                <button onClick={() => deleteProductQuestion(questionData._id)}>
                  <div className="blind">질문삭제</div>
                  <Icon icon="close" className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 댓글 내용 */}
            <p className="text-base">{questionData.contents}</p>

            {/* 댓글 날짜 */}
            <div className="text-gray-400 text-sm">
              {dateViewSet(questionData.createdAt)}
            </div>
          </div>
        )}
        {/* 답변하기 버튼 노출 여부 */}
        {reply && (
          <>
            <div className="flex gap-2 items-center">
              <span className="w-6 h-6">
                <Icon icon="reply" />
              </span>
              <button onClick={() => questionAnswerModeHandler()}>
                답변하기
              </button>
            </div>

            <QuestionAnswerList questionId={questionData._id} />
            {isAnswer && <QuestionAnswerWrite questionId={questionData._id} />}
          </>
        )}
      </div>
    </div>
  );
}
