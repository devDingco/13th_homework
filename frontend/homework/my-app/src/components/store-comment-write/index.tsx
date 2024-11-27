"use client";
import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { useParams } from "next/navigation";
import CommentAnswer from "../store-comment-answer";
import {
  CreateTravelproductQuestionMutation,
  CreateTravelproductQuestionMutationVariables,
  FetchTravelproductQuestionsQuery,
  FetchTravelproductQuestionsQueryVariables,
  UpdateBoardInput,
} from "@/commons/graphql/graphql";
import InfiniteScroll from "react-infinite-scroll-component";

export interface ISchema {
  comment: string;
}

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
  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
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

const UPDATE_COMMENT = gql`
  mutation updateTravelproductQuestion(
    $input: UpdateTravelproductQuestionInput!
    $commentId: ID!
  ) {
    updateTravelproductQuestion(
      updateTravelproductQuestionInput: $input
      travelproductQuestionId: $commentId
    ) {
      _id
      contents
      updatedAt
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
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

export default function Comment() {
  const { data: loggedInUser } = useQuery(FETCH_USER_LOGGED_IN);
  const { register, handleSubmit, reset } = useForm<ISchema>(); // ISchema 타입을 적용
  const [hasMore, setHasMore] = useState(true);
  const params = useParams();
  const travelproductId = Array.isArray(params.boardId)
    ? params.boardId[0]
    : params.boardId; // string 타입으로 변환

  const { data, refetch, fetchMore } = useQuery<
    FetchTravelproductQuestionsQuery,
    FetchTravelproductQuestionsQueryVariables
  >(FETCH_COMMENTS, {
    variables: { travelproductId },
  });

  const [createComment] = useMutation<
    CreateTravelproductQuestionMutation,
    CreateTravelproductQuestionMutationVariables
  >(CREATE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const onSubmit = async (formData: ISchema) => {
    try {
      await createComment({
        variables: {
          input: { contents: formData.comment },
          travelproductId,
        },
        update(cache, { data }) {
          //등록후 받은 결과물이 data로 들어오고 cache는 원래있던거
          cache.modify({
            //modify - 캐시 수정할때
            fields: {
              fetchTravelproductQuestions: (prev) => {
                //prev-현재까지 있던 데이터들
                return [data?.createTravelproductQuestion, ...prev]; //새로등록한 데이터 + 원래있던데이터 10개
              },
            },
          });
        },
      });
      reset();
      setHasMore(true);
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const onClickEdit = (commentId: string, contents: string) => {
    setEditingCommentId(commentId);
    setUpdatedContent(contents);
  };

  const onSubmitUpdate = async () => {
    if (!editingCommentId) return;
    try {
      await updateComment({
        variables: {
          input: { contents: updatedContent },
          commentId: editingCommentId,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchTravelproductQuestions: (prev) => {
                return [data?.createTravelproductQuestion, ...prev];
              },
            },
          });
        },
      });
      setEditingCommentId(null);
      setUpdatedContent("");
      setHasMore(true);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const onClickDelete = async (commentId: string) => {
    try {
      await deleteComment({
        variables: {
          travelproductQuestionId: commentId,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchTravelproductQuestions(prev, { readField }) {
                // 삭제된 댓글의 ID를 가져옴
                const deletedId = data?.deleteTravelproductQuestion;

                // 기존 댓글 목록에서 삭제된 댓글 ID를 제외
                const filteredComments = prev.filter(
                  (el) => readField("_id", el) !== deletedId
                );

                return [...filteredComments]; // 삭제된 댓글을 제외한 나머지를 반환
              },
            },
          });
        },
      });
      setHasMore(true);
    } catch (error) {
      console.log("댓글 삭제 실패:", error);
    }
  };

  const onNext = () => {
    if (!data?.fetchTravelproductQuestions?.length) return;
    fetchMore({
      variables: {
        page: Math.ceil(data.fetchTravelproductQuestions.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchTravelproductQuestions?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchTravelproductQuestions: [
            ...(prev?.fetchTravelproductQuestions || []),
            ...(fetchMoreResult?.fetchTravelproductQuestions || []),
          ],
        };
      },
    });
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
      <InfiniteScroll
        next={onNext}
        hasMore={hasMore}
        loader={<div className={styles.loading}>댓글이 없습니다.</div>}
        dataLength={data?.fetchTravelproductQuestions.length ?? 0}
      >
        {data?.fetchTravelproductQuestions?.map((comment) => (
          <div key={comment._id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <span>{comment.user?.name}</span>
              <div>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
                {loggedInUser?.fetchUserLoggedIn?._id === comment.user?._id && (
                  <>
                    <button
                      onClick={() => onClickEdit(comment._id, comment.contents)}
                    >
                      수정
                    </button>
                    <button onClick={() => onClickDelete(comment._id)}>
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
            {editingCommentId === comment._id ? (
              <>
                <input
                  type="text"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  className={styles.commentInput}
                />
                <button
                  onClick={onSubmitUpdate}
                  className={styles.commentSubmit}
                >
                  수정 완료
                </button>
              </>
            ) : (
              <p>{comment.contents}</p>
            )}
            <CommentAnswer commentId={comment._id} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
