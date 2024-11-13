"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { MessageCircleReply } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import QuestionListItem from "../question-list-item";
import { FetchTravelproductQuestionsDocument } from "@/commons/graphql/graphql";

export default function ProductDetailQuestionList() {
  const params = useParams();
  const travelproductId = params.productId as string;
  const { data } = useQuery(FetchTravelproductQuestionsDocument, {
    variables: { travelproductId },
  });
  const questionItems = data?.fetchTravelproductQuestions || [];
  return (
    <div className={styles.container}>
      {/* 댓글 */}
      {questionItems.length > 0 ? (
        <div>
          {questionItems.map((question) => (
            <QuestionListItem
              key={question._id}
              question={question}
              travelproductId={travelproductId}
            />
          ))}
        </div>
      ) : (
        <div className={styles.no_question}>등록된 문의사항이 없습니다.</div>
      )}
    </div>
  );
}
