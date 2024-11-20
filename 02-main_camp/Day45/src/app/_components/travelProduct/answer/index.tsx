import React from "react";
import styles from "./styles.module.css";
import Comment from "../../../../commons/ui/comment/comment";
import { ReturnIcon } from "../../../../commons/ui/icon";
import useTravelProductAnswer from "./hook";
import TravelProductAnswerWrite from "@/app/_components/travelProduct/answer-write";
import { FetchTravelproductQuestionAnswersQuery } from "@/commons/gql/graphql";
import { convertDateTime } from "@/commons/fomatter/date";

interface IReplyProps {
  travelproductQuestionId: string;
  travelproductQuestionAnswerId: string;
  data: FetchTravelproductQuestionAnswersQuery["fetchTravelproductQuestionAnswers"][0];
}

export default function TravelProductAnswer({
  travelproductQuestionId,
  travelproductQuestionAnswerId,
  data,
}: IReplyProps) {
  const {
    isEdit,
    onClickEditIcon,
    onClickDeleteIcon,
    handleCancel,
    disableEdit,
  } = useTravelProductAnswer({
    travelproductQuestionId,
    travelproductQuestionAnswerId,
  });

  return (
    <>
      {isEdit ? (
        <TravelProductAnswerWrite
          isEdit={true}
          travelproductQuestionId={travelproductQuestionId}
          travelproductQuestionAnswerId={travelproductQuestionAnswerId}
          data={data}
          handleCancel={handleCancel}
          handleComplete={disableEdit}
        />
      ) : (
        <div className={styles.answer__container}>
          <ReturnIcon />
          <Comment
            handleClickEditIcon={onClickEditIcon}
            handleClickDeleteIcon={onClickDeleteIcon}
            nickname={data.user.name}
            contents={data.contents}
            date={convertDateTime(data.createdAt)}
          />
        </div>
      )}
    </>
  );
}
