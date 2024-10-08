import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from '@/commons/graphql/graphql';
import { ChangeEvent, useState } from 'react';

export default function useCommentWrite() {
  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3);

  const params = useParams();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });
  const [createComment] = useMutation(CreateBoardCommentDocument);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };
  const onClickSubmit = async () => {
    if (!writer || !password) {
      alert('작성자와 비밀번호를 올바르게 입력해 주십쇼');
      return;
    }
    const { data } = await createComment({
      variables: {
        createBoardCommentInput: {
          writer: writer,
          password: password,
          contents: content,
          rating: rating,
        },
        boardId: String(params.boardId),
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
    alert('댓글이 등록되었습니다!');
    setWriter('');
    setPassword('');
    setContent('');
  };

  return {
    writer,
    password,
    content,
    rating,
    setRating,
    onChangeWriter,
    onChangePassword,
    onChangeContent,
    onClickSubmit,
  };
}
