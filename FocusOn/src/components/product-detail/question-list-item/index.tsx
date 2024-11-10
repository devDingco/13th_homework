import Image from "next/image";
import styles from "./styles.module.css";
import { MessageCircleReply, Pencil, Variable, X } from "lucide-react";
import { useMutation } from "@apollo/client";
import {
  DeleteTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/graphql/graphql";
import { useState } from "react";
import ProductDetailQuestion from "../question-write";

export default function QuestionListItem({ question, travelproductId }) {
  const [isEdit, setIsEdit] = useState(false);
  const onClickEdit = () => {
    setIsEdit(true);
  };
  const closeEdit = () => {
    setIsEdit(false);
  };

  const [deleteTravelproductQuestion] = useMutation(
    DeleteTravelproductQuestionDocument,
    {
      refetchQueries: [
        {
          query: FetchTravelproductQuestionsDocument,
          variables: { travelproductId },
        },
      ],
    }
  );
  const onClickDelete = async (id) => {
    try {
      const result = await deleteTravelproductQuestion({
        variables: { travelproductQuestionId: id },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {!isEdit ? (
        <div className={styles.question_box}>
          <div className={styles.question_item}>
            <div className={styles.profile_header}>
              <div className={styles.profile}>
                <Image
                  src="/images/profile.png"
                  width={24}
                  height={24}
                  alt="프로필"
                />
                <div className={styles.profile_name}>{question.user.name}</div>
              </div>
              <div className={styles.action_button_container}>
                <Pencil width={20} height={20} onClick={onClickEdit} />
                <X
                  className={styles.delete_button}
                  width={20}
                  height={20}
                  onClick={() => onClickDelete(question._id)}
                />
              </div>
            </div>

            <div className={styles.contents}>{question.contents}</div>
            <div className={styles.date}>{question.createdAt}</div>
          </div>
          <div className={styles.answer_button}>
            <MessageCircleReply />
            <div>답변 하기</div>
          </div>
        </div>
      ) : (
        <ProductDetailQuestion
          isEdit={isEdit}
          closeEdit={closeEdit}
          question={question}
        />
      )}
    </div>
  );
}
