'use client';

import { Flex, Modal, Rate } from 'antd';
import Image from 'next/image';
import useCommentWrite from './hook';
import { useMutation } from '@apollo/client';
import {
  BoardComment,
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from '@/commons/graphql/graphql';
import { useParams } from 'next/navigation';
import { UpdateBoardCommentDocument } from '@/commons/graphql/graphql';
import { UpdateBoardCommentMutationVariables } from '@/commons/graphql/graphql';

const IMAGE_SRC = {
  chatImage: {
    src: require('@/assets/chat.png'),
    alt: '댓글입력창아이콘',
  },
  starImage: {
    src: require('@/assets/star.png'),
    alt: '별점아이콘',
  },
  profileImage: {
    src: require('@/assets/profile.png'),
    alt: '기본프로필아이콘',
  },
} as const;

export type CommentWriteProps = {
  isEdit?: boolean;
  commentItem?: BoardComment;
  onToggleEdit?: () => void;
};

export default function CommentWrite(props: CommentWriteProps) {
  const params = useParams();
  const {
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
  } = useCommentWrite(props);

  const [createComment] = useMutation(CreateBoardCommentDocument);
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

  const [updateComment] = useMutation(UpdateBoardCommentDocument);
  const onClickUpdate = async () => {
    if (!props.commentItem || !props.onToggleEdit) {
      return;
    }

    const myVariables: UpdateBoardCommentMutationVariables = {
      boardCommentId: props.commentItem._id,
      password: password,
      updateBoardCommentInput: {},
    };
    if (content) myVariables.updateBoardCommentInput.contents = content;

    try {
      const result = await updateComment({
        variables: myVariables,
      });
      if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
    } catch (error) {
      Modal.error({
        content: '비밀번호가 틀렸습니다.',
      });
    }
    const result = await updateComment({
      variables: myVariables,
    });
    console.log('🚀 ~ onClickUpdate ~ result:', result);
    Modal.success({
      content: '수정이 완료되었습니다.',
    });
    props.onToggleEdit();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-2">
        <Image src={IMAGE_SRC.chatImage.src} alt={IMAGE_SRC.chatImage.alt} />
        <div>댓글</div>
      </div>

      <div className="flex">
        <Flex gap="middle">
          <Rate onChange={setRating} value={rating} />
        </Flex>
      </div>

      <div className="flex gap-4 max-w-screen-sm">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <div>작성자</div>
            <div className="text-red-400"> *</div>
          </div>
          <div>
            <input
              className="border-2 rounded-lg p-4 w-full"
              type="text"
              placeholder="작성자 명을 입력해 주세요"
              value={writer}
              onChange={onChangeWriter}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <div>비밀번호</div>
            <div className="text-red-400"> *</div>
          </div>
          <div>
            <input
              className="border-2 rounded-lg p-4 w-full"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </div>
      </div>
      <div>
        <textarea
          className="w-full h-36 resize-none border-2 rounded-lg p-4"
          name="comment"
          placeholder="댓글을 입력해 주세요"
          value={content}
          onChange={onChangeContent}
        ></textarea>
      </div>
      <div className="flex justify-end gap-4">
        {props.isEdit && (
          <button
            className="p-4 border-2 rounded-lg bg-black text-white"
            onClick={props.onToggleEdit}
          >
            취소
          </button>
        )}
        <button
          className="p-4 border-2 rounded-lg"
          onClick={props.isEdit ? onClickUpdate : onClickSubmit}
        >
          {props.isEdit ? `댓글 수정` : `댓글 등록`}
        </button>
      </div>
    </div>
  );
}
