import { useQuestionAnswerList } from "@/components/product-detail/product-question-answer-list/hook";
import QuestionAnswerItem from "../product-question-answer-item";
import Icon from "@/components/icon-factory";

export default function QuestionAnswerList(props) {
  const { questionId } = props;
  const { data } = useQuestionAnswerList({ questionId });
  // console.log("답변리스트", data);
  return (
    <>
      {data?.map((questionAnswerData) => (
        <div
          key={questionAnswerData._id}
          className="grid grid-cols-[3rem_9fr] gap-2"
        >
          <div className="text-right">
            <Icon icon="return" className="w-6 h-6" />
          </div>
          <QuestionAnswerItem
            questionAnswerData={questionAnswerData}
            questionId={questionId}
          />
        </div>
      ))}
    </>
  );
}
