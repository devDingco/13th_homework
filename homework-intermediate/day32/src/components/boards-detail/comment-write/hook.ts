import { ChangeEvent, useState } from 'react';
import { CommentWriteProps } from '.';

export default function useCommentWrite(props: CommentWriteProps) {
  const [writer, setWriter] = useState(
    (props.isEdit && props.commentItem?.writer) || ''
  );
  const [password, setPassword] = useState('');
  const [content, setContent] = useState(
    (props.isEdit && props.commentItem?.contents) || ''
  );
  const [rating, setRating] = useState(
    (props.isEdit && props.commentItem?.rating) || 3
  );

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  return {
    writer,
    password,
    content,
    rating,
    setWriter,
    setPassword,
    setContent,
    setRating,
    onChangeWriter,
    onChangePassword,
    onChangeContent,
  };
}
