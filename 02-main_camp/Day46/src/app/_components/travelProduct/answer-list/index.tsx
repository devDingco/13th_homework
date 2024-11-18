import React from "react";
import styles from "./styles.module.css";
import TravelProductAnswer from "@/app/_components/travelProduct/answer";
import { FetchTravelproductQuestionAnswersDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";

interface ITravelProductAnswerListProps {
  questionId: string;
}

export default function TravelProductAnswerList({
  questionId,
}: ITravelProductAnswerListProps) {
  const { data } = useQuery(FetchTravelproductQuestionAnswersDocument, {
    variables: {
      travelproductQuestionId: questionId,
    },
  });

  return (
    <div className={styles.answerList__container}>
      {data?.fetchTravelproductQuestionAnswers.map((answer) => (
        <TravelProductAnswer
          key={answer._id}
          travelproductQuestionId={questionId}
          travelproductQuestionAnswerId={answer._id}
          data={answer}
        />
      ))}
    </div>
  );
}
