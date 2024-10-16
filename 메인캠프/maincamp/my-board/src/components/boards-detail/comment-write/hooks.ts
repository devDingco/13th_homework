import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from '@/commons/graphql/graphql';
import { ApolloError, useMutation } from '@apollo/client';
import { Modal } from 'antd';
import { useParams } from 'next/navigation';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { ICommentWrite } from './types';

export function useCommentWrite({ isEdit, commentId, el }: ICommentWrite) {
  const params = useParams();
  const [isActive, setIsActive] = useState(false);
  const [commentWriter, setCommentWriter] = useState('');
  const [commentPw, setCommentPw] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [createComment] = useMutation(CreateBoardCommentDocument);
  const [updateComment] = useMutation(UpdateBoardCommentDocument);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentWriter(value);
    checkAllField(value, commentPw, comments);
  };
  const onChangeCommentPw = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentPw(value);
    checkAllField(commentWriter, value, comments);
  };
  const onChangeCommentContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComments(value);
    checkAllField(commentWriter, commentPw, value);
  };

  //버튼 활성화 함수
  const checkAllField = (
    commentWriter: string,
    commentPw: string,
    comments: string
  ) => {
    if (isEdit) {
      if (commentPw && comments) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      if (commentWriter && commentPw && comments) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };
  //댓글 등록함수
  const registerComment = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createComment({
        variables: {
          boardId: String(params.boardId),
          createBoardCommentInput: {
            writer: commentWriter,
            password: commentPw,
            contents: comments,
            rating: rating,
          },
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              boardId: String(params.boardId),
            },
          },
        ],
      });
      console.log('등록된 댓글', result);
      if (commentWriter && commentPw) {
        Modal.success({
          title: '성공',
          content: '댓글이 등록되었습니다.',
          onOk: () => {
            window.location.reload();
          },
        });
      }
    } catch (error) {
      console.log('댓글 등록 실패', error);
    }
  };
  //댓글 수정함수
  const updateCommentFunc = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updateComment({
        variables: {
          password: commentPw,
          boardCommentId: String(commentId),
          updateBoardCommentInput: {
            contents: comments || el?.contents,
            rating: rating || el?.rating,
          },
        },
        refetchQueries: [{ query: FetchBoardCommentsDocument }],
      });
      console.log('수정된 댓글', result);
      Modal.success({
        title: '성공',
        content: '댓글이 성공적으로 수정되었습니다.',
        onOk: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      let errorMessage = '댓글 수정에 실패하였습니다.';

      // error가 ApolloError인지 확인하는 타입 보호
      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          // GraphQL 에러 메시지가 있는 경우
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          // 일반 오류 메시지가 있는 경우
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        // 일반 JavaScript Error인 경우
        errorMessage = error.message;
      }
      Modal.error({
        title: '실패',
        content: errorMessage,
        onOk() {},
      });
      console.log('댓글 수정 실패', error);
    }
  };
  return {
    setRating,
    registerComment,
    onChangeWriter,
    onChangeCommentPw,
    onChangeCommentContents,
    isActive,
    updateCommentFunc,
  };
}
