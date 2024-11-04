"use client";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { useParams } from "next/navigation";
import CommentAnswer from "../store-comment-answer";

const CREATE_COMMENT = gql`
  mutation createTravelproductQuestion(
    $input: CreateTravelproductQuestionInput!
    $travelproductId: ID!
  ) {
    createTravelproductQuestion(
      createTravelproductQuestionInput: $input
      travelproductId: $travelproductId
    ) {
      _id
    }
  }
`;

const FETCH_COMMENTS = gql`
  query fetchTravelproductQuestions($page: Int!, $travelproductId: ID!) {
    fetchTravelproductQuestions(
      page: $page
      travelproductId: $travelproductId
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

export default function Comment() {
  const { register, handleSubmit, reset } = useForm();
  const params = useParams();
  const travelproductId = params.boardId;

  const { data, refetch } = useQuery(FETCH_COMMENTS, {
    variables: { page: 1, travelproductId },
  });

  const [createComment] = useMutation(CREATE_COMMENT);

  const onSubmit = async (formData) => {
    try {
      await createComment({
        variables: {
          input: { contents: formData.comment },
          travelproductId,
        },
      });
      reset();
      refetch();
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2 className={styles.sectionTitle}>Comment</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.commentInputWrapper}
      >
        <input
          type="text"
          {...register("comment", { required: "댓글을 입력해 주세요." })}
          className={styles.commentInput}
          placeholder="문의사항을 입력해 주세요."
        />
        <button type="submit" className={styles.commentSubmit}>
          댓글
        </button>
      </form>

      {data?.fetchTravelproductQuestions?.map((comment) => (
        <div key={comment._id} className={styles.comment}>
          <div className={styles.commentHeader}>
            <span>{comment.user?.name}</span>
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <p>{comment.contents}</p>

          <CommentAnswer commentId={comment._id} />
        </div>
      ))}
    </div>
  );
}
