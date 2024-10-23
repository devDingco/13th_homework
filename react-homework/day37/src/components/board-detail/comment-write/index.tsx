"use client";

import FieldWrapper from "@/components/commons/fieldWrapper";
import InputField from "@/components/commons/input";
import styles from "./styles.module.css";
import Button from "@/components/commons/button";
import Image from "next/image";
import { useCommentWrite } from "./hook";
import { Rate } from "antd";
import { ICommentWriteProps } from "./types";

const CommentWrite = (props: ICommentWriteProps) => {
  const {
    onChangeInput,
    onClickSubmit,
    setRating,
    onClickEdit,
    commentInfo,
    rating,
    allInputFilled,
    commentFilled,
  } = useCommentWrite(props);

  return (
    <div className={styles.comment_write_body}>
      <div className={styles.comment_write}>
        {!props.isEdit && (
          <div className={styles.comment_title}>
            <Image src="/images/chat.png" alt="chat" width={24} height={24} />
            댓글
          </div>
        )}
        <div className={styles.comment_group}>
          <div className={styles.star_btn_box}>
            <Rate onChange={setRating} value={rating} />
          </div>
          <div className={styles.comment_input_group}>
            <div className={styles.writer_info_group}>
              <div className={styles.writer_input_group}>
                <FieldWrapper label="작성자" isRequired={true}>
                  <InputField
                    onChange={onChangeInput}
                    name="writer"
                    placeholder="작성자 명을 입력해 주세요."
                    value={commentInfo.writer}
                    isDisabled={props.isEdit}
                  />
                </FieldWrapper>
                <FieldWrapper label="비밀번호" isRequired={true}>
                  <InputField
                    onChange={onChangeInput}
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    value={commentInfo.password}
                  />
                </FieldWrapper>
              </div>
            </div>

            <textarea
              onChange={onChangeInput}
              name="contents"
              className={styles.comment_input}
              placeholder="댓글을 입력해 주세요."
              value={commentInfo.contents}
            />
          </div>
          <div className={styles.btn_box}>
            {props.isEdit && (
              <Button variant="white" onClick={props.closeEdit}>
                취소
              </Button>
            )}
            <Button
              disabled={props.isEdit ? !commentFilled : !allInputFilled}
              variant={
                props.isEdit
                  ? commentFilled
                    ? "active"
                    : "disabled"
                  : allInputFilled
                  ? "active"
                  : "disabled"
              }
              onClick={props.isEdit ? onClickEdit : onClickSubmit}
            >
              {props.isEdit ? "수정 하기" : "댓글 등록"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentWrite;
