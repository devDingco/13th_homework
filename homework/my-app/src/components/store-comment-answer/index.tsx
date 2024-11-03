"use client";
import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./style.module.css";

const FETCH_REPLIES = gql`
  query fetchTravelproductQuestionAnswers(
    $page: Int!
    $travelproductQuestionId: ID!
  ) {
    fetchTravelproductQuestionAnswers(
      page: $page
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      user {
        _id
        name
        email
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

const CREATE_REPLY = gql`
  mutation createTravelproductQuestionAnswer(
    $input: CreateTravelproductQuestionAnswerInput!
    $travelproductQuestionId: ID!
  ) {
    createTravelproductQuestionAnswer(
      createTravelproductQuestionAnswerInput: $input
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
    }
  }
`;

export default function CommentAnswer({ commentId }) {
  const [replyText, setReplyText] = useState("");
  const [openReplyBox, setOpenReplyBox] = useState(false);

  const { data: repliesData, refetch } = useQuery(FETCH_REPLIES, {
    variables: { page: 1, travelproductQuestionId: commentId },
    skip: !commentId,
  });

  const [createReply] = useMutation(CREATE_REPLY);

  const onReplySubmit = async () => {
    try {
      await createReply({
        variables: {
          input: { contents: replyText },
          travelproductQuestionId: commentId,
        },
      });
      setReplyText("");
      setOpenReplyBox(false);
      refetch();
    } catch (error) {
      console.error("대댓글 등록 실패:", error);
    }
  };

  return (
    <div className={styles.commentSection}>
      <button onClick={() => setOpenReplyBox(!openReplyBox)}>답변하기</button>

      {openReplyBox && (
        <div className={styles.replyInputWrapper}>
          <input
            type="text"
            className={styles.replyInput}
            placeholder="답변을 입력해 주세요."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className={styles.commentSubmit} onClick={onReplySubmit}>
            답변 남기기
          </button>
        </div>
      )}

      {/* 대댓글 목록 */}
      <div className={styles.replies}>
        {repliesData?.fetchTravelproductQuestionAnswers?.map((answer) => (
          <div key={answer._id} className={styles.reply}>
            <div className={styles.replyHeader}>
              <span>{answer.user?.name}</span>
              <span>{new Date(answer.createdAt).toLocaleString()}</span>
            </div>
            <p>{answer.contents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
