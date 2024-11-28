"use client";
import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./style.module.css";
import {} from "@/commons/graphql";
import {
  CreateTravelproductQuestionAnswerMutation,
  CreateTravelproductQuestionAnswerMutationVariables,
  DeleteTravelproductQuestionAnswerMutation,
  DeleteTravelproductQuestionAnswerMutationVariables,
  FetchTravelproductQuestionAnswersQuery,
  FetchTravelproductQuestionAnswersQueryVariables,
  UpdateTravelproductQuestionAnswerMutation,
  UpdateTravelproductQuestionAnswerMutationVariables,
} from "@/commons/graphql/graphql";

// GraphQL Queries and Mutations
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

const UPDATE_REPLY = gql`
  mutation updateTravelproductQuestionAnswer(
    $input: UpdateTravelproductQuestionAnswerInput!
    $travelproductQuestionAnswerId: ID!
  ) {
    updateTravelproductQuestionAnswer(
      updateTravelproductQuestionAnswerInput: $input
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    ) {
      _id
    }
  }
`;

const DELETE_REPLY = gql`
  mutation deleteTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
  ) {
    deleteTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    )
  }
`;

// 로그인한 사용자 정보 가져오기 쿼리
const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
    }
  }
`;

interface CommentAnswerProps {
  commentId: string;
}

export default function CommentAnswer({ commentId }: CommentAnswerProps) {
  const { data: loggedInUser } = useQuery(FETCH_USER_LOGGED_IN);
  const [replyText, setReplyText] = useState("");
  const [openReplyBox, setOpenReplyBox] = useState(false);

  const { data: repliesData, refetch } = useQuery<
    FetchTravelproductQuestionAnswersQuery,
    FetchTravelproductQuestionAnswersQueryVariables
  >(FETCH_REPLIES, {
    variables: { page: 1, travelproductQuestionId: commentId },
    skip: !commentId,
  });

  const [createReply] = useMutation<
    CreateTravelproductQuestionAnswerMutation,
    CreateTravelproductQuestionAnswerMutationVariables
  >(CREATE_REPLY);

  const [updateReply] = useMutation<
    UpdateTravelproductQuestionAnswerMutation,
    UpdateTravelproductQuestionAnswerMutationVariables
  >(UPDATE_REPLY);

  const [deleteReply] = useMutation<
    DeleteTravelproductQuestionAnswerMutation,
    DeleteTravelproductQuestionAnswerMutationVariables
  >(DELETE_REPLY);

  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

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

  const onEditClick = (replyId: string, contents: string) => {
    setEditingReplyId(replyId);
    setEditingContent(contents);
  };

  const onEditSubmit = async () => {
    if (!editingReplyId) return;
    try {
      await updateReply({
        variables: {
          input: { contents: editingContent },
          travelproductQuestionAnswerId: editingReplyId,
        },
      });
      setEditingReplyId(null);
      setEditingContent("");
      refetch();
    } catch (error) {
      console.error("대댓글 수정 실패:", error);
    }
  };

  const onClickDelete = async (answerId: string) => {
    try {
      await deleteReply({
        variables: {
          travelproductQuestionAnswerId: answerId,
        },
      });
      refetch();
    } catch (error) {
      console.log("대댓글 삭제 실패:", error);
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

      <div className={styles.replies}>
        {repliesData?.fetchTravelproductQuestionAnswers?.map((answer) => (
          <div key={answer._id} className={styles.reply}>
            <div className={styles.replyHeader}>
              <span>{answer.user?.name}</span>
              <div>
                <span>{new Date(answer.createdAt).toLocaleString()}</span>
                {loggedInUser?.fetchUserLoggedIn?._id === answer.user?._id && (
                  <>
                    <button
                      onClick={() => onEditClick(answer._id, answer.contents)}
                    >
                      수정
                    </button>
                    <button onClick={() => onClickDelete(answer._id)}>
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
            {editingReplyId === answer._id ? (
              <div className={styles.replyEditWrapper}>
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className={styles.replyInput}
                />
                <button onClick={onEditSubmit} className={styles.commentSubmit}>
                  수정 완료
                </button>
              </div>
            ) : (
              <p>{answer.contents}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
