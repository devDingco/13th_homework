import React from "react";
import styles from "./styles.module.css";
import CommentSubMenu from "@/commons/ui/comment/subMenu";
import TravelProductAnswerWrite from "@/app/_components/travelProduct/answer-write";
import Comment from "@/commons/ui/comment/comment";
import { FetchTravelproductQuestionsQuery } from "@/commons/gql/graphql";
import { convertDateTime } from "@/commons/fomatter/date";
import TravelProductAnswerList from "../answer-list";
import useQuestion from "./hook";
import TravelProductQuestionWrite from "../question-write";

interface ITravelProductQuestionProps {
  travelproductId: string;
  data: FetchTravelproductQuestionsQuery["fetchTravelproductQuestions"][0];
}

export default function TravelProductQuestion({
  travelproductId,
  data,
}: ITravelProductQuestionProps) {
  const isManaged = true;

  const {
    isEdit,
    isSubMenuOpened,
    onClickAnswer,
    onClickCancel,
    onClickDelete,
    onClickEditIcon,
    disableEdit,
    closeSubMenu,
  } = useQuestion({
    travelproductId,
    travelproductQuestionId: data._id,
  });

  return (
    <div className={styles.NewTravelProductComment__container}>
      {isEdit ? (
        <TravelProductQuestionWrite
          isEdit={true}
          travelproductId={travelproductId}
          travelproductQuestionId={data._id}
          data={data}
          handleCancel={disableEdit}
          handleComplete={disableEdit}
        />
      ) : (
        <Comment
          nickname={data.user.name}
          contents={data.contents}
          date={convertDateTime(data.createdAt)}
          handleClickDeleteIcon={onClickDelete}
          handleClickEditIcon={onClickEditIcon}
        />
      )}

      {isManaged && isSubMenuOpened === false && (
        <CommentSubMenu label="답변하기" handleSubMenu={onClickAnswer} />
      )}
      <TravelProductAnswerList questionId={data._id} />
      {isSubMenuOpened && (
        <TravelProductAnswerWrite
          travelproductQuestionId={data._id}
          handleComplete={closeSubMenu}
          handleCancel={onClickCancel}
        />
      )}
    </div>
  );
}
