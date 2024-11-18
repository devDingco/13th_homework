import React from "react";
import styles from "./styles.module.css";
import { FetchTravelproductQuestionsQuery } from "@/commons/gql/graphql";
import TravelProductQuestion from "../question";
import Divider from "../../commons/divider";

interface ITravelProductQuestionListProps {
  travelproductId: string;
  data: FetchTravelproductQuestionsQuery | undefined;
}

export default function TravelProductQuestionList({
  travelproductId,
  data,
}: ITravelProductQuestionListProps) {
  return (
    <div className={styles.question__list__container}>
      {data?.fetchTravelproductQuestions.map((question) => (
        <div key={question._id} className={styles.question__wrapper}>
          <TravelProductQuestion
            data={question}
            travelproductId={travelproductId}
          />
          <Divider />
        </div>
      ))}
    </div>
  );
}
