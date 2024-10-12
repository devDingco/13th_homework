import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from '@/commons/graphql/graphql';
import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export function useCommentWrite() {
  const params = useParams();
  const [isActive, setIsActive] = useState(false);
  const [commentWriter, setCommentWriter] = useState('');
  const [commentPw, setCommentPw] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [createComment] = useMutation(CreateBoardCommentDocument);

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
    if (commentWriter && commentPw && comments) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  //댓글 등록함수
  const registerComment = async () => {
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
        alert('댓글이 등록되었습니다.');

        setCommentPw('');
        setCommentWriter('');
        setComments('');
        setRating(0);
        setIsActive(false);
      }
    } catch (error) {
      console.log('댓글 등록 실패', error);
    }
  };
  return {
    rating,
    setRating,
    registerComment,
    onChangeWriter,
    onChangeCommentPw,
    onChangeCommentContents,
    isActive,
  };
}
