import Image from 'next/image';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';
import CommentStarEmpty from '@/../public/icons/comment_star_empty.svg';
import ChatIcon from '@/../public/icons/chat.svg';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from '@/app/_commons/graphql/graphql';
import { Rate } from 'antd';

export default function CommentWrite() {
  const resetCommentData = {
    commentContent: '',
    commentUser: '',
    commentPw: '',
    commentRate: 0,
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

  const onPostsButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
        refetchQueries: [FetchBoardCommentsDocument],
      });
      setCommentData({ ...resetCommentData });
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <>
      <h3 className="flex">
        <Image src={ChatIcon} width={0} height={0} alt="댓글 별리뷰1" />
        댓글
      </h3>
      <form onSubmit={(event) => onPostsButtonClick(event)}>
        <div className="flex">
          <Rate
            onChange={(e) =>
              setCommentData((prev) => {
                return {
                  ...prev,
                  commentRate: e,
                };
              })
            }
            value={commentData.commentRate}
          />
        </div>
        <div className="flex gap-4 w-1/2 mb-4">
          <Input
            value={commentData.commentUser}
            type="text"
            placeholder="작성자 명을 입력해 주세요"
            label="작성자"
            id="commentUser"
            required={requiredMessage}
            onChangeFnc={onCommentFormChange}
          />
          <Input
            value={commentData.commentPw}
            type="text"
            placeholder="비밀번호을 입력해주세요."
            label="비밀번호"
            id="commentPw"
            required={requiredMessage}
            onChangeFnc={onCommentFormChange}
          />
        </div>
        <Textarea
          value={commentData.commentContent}
          placeholder="내용을 입력해주세요."
          id="commentContent"
          required={requiredMessage}
          onChangeFnc={onCommentFormChange}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            style="primary"
            disabled={
              !(
                commentData.commentContent &&
                commentData.commentPw &&
                commentData.commentUser
              )
            }>
            등록하기
          </Button>
        </div>
      </form>
    </>
  );
}
