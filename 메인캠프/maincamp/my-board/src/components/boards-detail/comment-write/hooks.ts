import { CreateBoardCommentDocument } from '@/commons/graphql/graphql';
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
  const [selectedStar, setSelectedStar] = useState(-1);
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

  // 별점 기능 적용할때 타입오류 수정 예정
  const handleStarClick = (index) => {
    if (selectedStar === index) {
      setSelectedStar(-1);
    } else {
      setSelectedStar(index);
    }
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
    const result = await createComment({
      variables: {
        boardId: String(params?.boardId),
        createBoardCommentInput: {
          writer: commentWriter,
          password: commentPw,
          contents: comments,
          // 일단 지금은 3으로 기본값
          rating: 3,
        },
      },
    });
    console.log('등록된 댓글', result);
    if (commentWriter && commentPw) {
      alert('댓글이 등록되었습니다.');

      setCommentPw('');
      setCommentWriter('');
      setComments('');
      setSelectedStar(-1);
      setIsActive(false);
    }
  };
  return {
    selectedStar,
    handleStarClick,
    registerComment,
    onChangeWriter,
    onChangeCommentPw,
    onChangeCommentContents,
    isActive,
  };
}
