"use client";

import FieldWrapper from "@/components/fieldWrapper";
import InputField from "@/components/input";
import styles from "./styles.module.css";
import Button from "@/components/button";
import Image from "next/image";
import StarButton from "./star";
import { useCommentWrite } from "./hook";

const CommentWrite = () => {
  const { onChangeInput, inputs, allInputFilled, onClickSubmit } =
    useCommentWrite();

  return (
    <div className={styles.comment_write}>
      <div className={styles.comment_title}>
        <Image src="/images/chat.png" alt="chat" width={24} height={24} />
        댓글
      </div>
      <div className={styles.star_btn_box}>
        <StarButton />
        <StarButton />
        <StarButton />
        <StarButton />
        <StarButton />
      </div>
      <div className={styles.comment_group}>
        <div className={styles.comment_input_group}>
          <div className={styles.writer_input_group}>
            <FieldWrapper label="작성자" isRequired={true}>
              <InputField
                onChange={onChangeInput}
                name="writer"
                placeholder="작성자 명을 입력해 주세요."
                value={inputs.writer}
              />
            </FieldWrapper>
            <FieldWrapper label="비밀번호" isRequired={true}>
              <InputField
                onChange={onChangeInput}
                name="password"
                placeholder="비밀번호를 입력해 주세요."
                value={inputs.password}
              />
            </FieldWrapper>
          </div>
          <textarea
            onChange={onChangeInput}
            name="contents"
            className={styles.comment_input}
            placeholder="댓글을 입력해 주세요."
            value={inputs.contents}
          />
        </div>
        <div className={styles.btn_box}>
          <Button
            variant={!allInputFilled ? "disabled" : "blue_active"}
            disabled={!allInputFilled}
            onClick={onClickSubmit}
          >
            댓글 등록
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CommentWrite;
