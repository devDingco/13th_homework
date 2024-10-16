import { Rate } from "antd";
import Image from "next/image";
import styles from "./styles.module.css";
import { useState } from "react";
import useBoardsCommentEdit from "./hook";

export default function CommentItem({ el }) {
  const {
    onChangeName,
    onChangePassword,
    onChangeContent,
    onCLickComment,
    onChangeRating,
    name,
    password,
    content,
    rating,
    desc,
  } = useBoardsCommentEdit({ el });

  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    console.log("수정클릭함");
    setIsEdit(true);
  };

  const onClickCancel = () => {
    console.log("수정취소하기");
    setIsEdit(false);
  };

  //   isEdit의 참과 거짓으로 수정하기를 보여줄지 아닐지 정함.
  return !isEdit ? (
    <div>
      <div className={styles.commentListSection}>
        <hr />
        <div className={styles.commentListTop}>
          <Image
            src="/images/profile.png"
            alt="프로필아이콘"
            width={10}
            height={10}
            sizes="100vw"
            className={styles.profileIcon}
          />
          <div className={styles.commentName}>{el.writer}</div>
          <div className={styles.starSection}>
            <Rate value={el.rating} disabled />
          </div>
          <div className={styles.editAndClose}>
            <Image
              onClick={onClickEdit}
              src="/images/edit.png"
              alt="수정아이콘"
              width={10}
              height={10}
              sizes="100vw"
              className={styles.editIcon}
            />
            <Image
              src="/images/close.png"
              alt="삭제아이콘"
              width={10}
              height={10}
              sizes="100vw"
              className={styles.closeIcon}
            />
          </div>
        </div>
        <div className={styles.commentListMiddle}>{el.contents}</div>
        <div className={styles.commentListBottom}>
          {new Date(el.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  ) : (
    // ------------------ 이 곳을 분기점으로 나뉨 ------------------------
    <main>
      <hr />
      <div className={styles.starSection}>
        <Rate tooltips={desc} onChange={onChangeRating} value={rating} />
      </div>
      <div className={styles.commentSection}>
        <div className={styles.authorPasswordLabel}>
          <div className={styles.commentSectionWriter}>
            <div className={styles.labelRequired}>
              <span>작성자</span>
              <div>*</div>
            </div>
            <input
              className={styles.inputRequired}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeName}
              value={name}
            />
          </div>
          <div className={styles.commentSectionWriter}>
            <div className={styles.labelRequired}>
              <span>비밀번호</span>
              <div>*</div>
            </div>
            <input
              className={styles.inputRequired}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
              value={password}
            />
          </div>
        </div>
        <div className={styles.commentContents}>
          <textarea
            className={styles.textareaContents}
            placeholder="댓글을 입력해 주세요."
            onChange={onChangeContent}
            value={content}
          />
          <div>{content ? content.length : 0} / 100</div>
        </div>
        <div className={styles.btnSection}>
          <button className={styles.commentCancel} onClick={onClickCancel}>
            취소
          </button>
          <button className={styles.commentSubmit} onClick={onCLickComment}>
            수정 하기
          </button>
        </div>
      </div>
    </main>
  );
}
