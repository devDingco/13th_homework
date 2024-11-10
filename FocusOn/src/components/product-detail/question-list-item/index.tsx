import Image from "next/image";
import styles from "./styles.module.css";
import { MessageCircleReply, Pencil, X } from "lucide-react";

export default function QuestionListItem({ question }) {
  return (
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
            <Pencil width={20} height={20} />
            <X width={20} height={20} />
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
  );
}
