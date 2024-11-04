// import { FETCH_TRAVEL_PRODUCT_QUESTION_ANSWERS } from "@/components/product-detail/product-question-answer-list/queries";

import { FetchTravelproductQuestionAnswersDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

export const useQuestionAnswerList = (props) => {
  const { questionId } = props;
  const { data: questionAnswersData } = useQuery(
    FetchTravelproductQuestionAnswersDocument,
    {
      variables: { travelproductQuestionId: questionId },
    }
  );

  const data = questionAnswersData?.fetchTravelproductQuestionAnswers;

  // console.log("질문아이디", questionId, data);

  return { data };
};
