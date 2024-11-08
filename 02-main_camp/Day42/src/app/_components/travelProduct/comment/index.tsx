import React from "react";
import styles from "./styles.module.css";
import useComment from "@/commons/ui/comment/comment/hooks";
import CommentSubMenu from "@/commons/ui/comment/subMenu";
import ReplyWriting from "@/commons/ui/reply/writing";
import Reply from "@/commons/ui/reply/reply";
import Comment from "@/commons/ui/comment/comment";

export default function NewTravelProductComment() {
  const isManaged = true;
  const { isSubMenuOpened, setIsSubMenuOpened } = useComment();
  const onClickReply = () => {
    setIsSubMenuOpened((prev) => !prev);
  };

  const onClickCancel = () => {
    setIsSubMenuOpened((prev) => !prev);
  };

  return (
    <div className={styles.NewTravelProductComment__container}>
      <Comment nickname="최홍식" contents="환불해 주세요." date="2024.11.04" />
      {isManaged && isSubMenuOpened === false && (
        <CommentSubMenu label="답변하기" handleSubMenu={onClickReply} />
      )}
      <Reply nickname="판매자" contents="샘플 답변입니다." date="2024.12.04" />
      {isSubMenuOpened && <ReplyWriting handleCancel={onClickCancel} />}
    </div>
  );
}
