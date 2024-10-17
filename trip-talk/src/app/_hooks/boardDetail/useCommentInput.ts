import { FETCH_BOARD_COMMENT } from '@/app/_api/board/Query';
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from '@/app/_commons/graphql/graphql';
import { gql, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $boardCommentId: ID!
    $password: String
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      boardCommentId: $boardCommentId
      password: $password
    ) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;

export default function useCommentInput({
  writer,
  content,
  rating,
  commentId,
  type,
  onEditComment,
}: ICommentInput) {
  const resetCommentData = {
    commentContent: content || '',
    commentUser: writer || '',
    commentPw: '',
    commentRate: rating || 0,
  };
  const [commentData, setCommentData] = useState({ ...resetCommentData });
  const [requiredMessage, setRequiredMessage] = useState<RequiredType>({
    commentContent: null,
    commentUser: null,
    commentPw: null,
  });

  const { postId } = useParams();

  const onCommentFormChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentData((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const [createComment] = useMutation(CreateBoardCommentDocument);
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

  const onPostsButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (type === 'EDIT') {
        const { data } = await updateBoardComment({
          variables: {
            updateBoardCommentInput: {
              contents: commentData.commentContent,
              rating: commentData.commentRate,
            },
            boardCommentId: commentId,
            password: commentData.commentPw,
          },
          refetchQueries: [FETCH_BOARD_COMMENT],
        });
        onEditComment && onEditComment();
      } else {
        const { data } = await createComment({
          variables: {
            createBoardCommentInput: {
              writer: commentData.commentUser,
              password: commentData.commentPw,
              contents: commentData.commentContent,
              rating: commentData.commentRate,
            },
            boardId: postId.toString(),
          },
          refetchQueries: [FETCH_BOARD_COMMENT],
        });
        setCommentData({ ...resetCommentData });
      }
    } catch (err) {
      console.log(err);
    }
    console.log('실행 가능?');
  };
  // console.log('여기 hooks임', hasMore);
  useEffect(() => {
    const validMessage = '필수입력 사항입니다.';
    setRequiredMessage((prev) => {
      return {
        ...prev,
        username: commentData.commentUser ? null : validMessage,
        userpw: commentData.commentPw ? null : validMessage,
        userTitle: commentData.commentContent ? null : validMessage,
      };
    });
  }, [commentData]);

  return {
    commentData,
    requiredMessage,
    setCommentData,
    onCommentFormChange,
    onPostsButtonClick,
  };
}
