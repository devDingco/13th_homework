'use client';
import { EditOutlined } from '@ant-design/icons';
import { Flex, Rate } from 'antd';
import Image from 'next/image';
import CommentWrite from '../comment-write';
import useCommentListItem from './hook';
import { BoardComment } from '@/commons/graphql/graphql';

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

type Props = {
  commentItem: BoardComment;
};

export default function CommentItem({ commentItem }: Props) {
  const { isEdit, onToggleEdit } = useCommentListItem();

  return (
    <>
      {isEdit ? (
        <CommentWrite
          isEdit={isEdit}
          commentItem={commentItem}
          onToggleEdit={onToggleEdit}
        />
      ) : (
        <div key={commentItem._id} className="flex flex-col gap-5 w-full">
          <div className="flex gap-3">
            <Image
              src={IMAGE_SRC.profileImage.src}
              alt={IMAGE_SRC.profileImage.alt}
            ></Image>
            <div>{commentItem.writer}</div>
            <Flex gap="middle">
              <Rate disabled value={commentItem.rating} />
            </Flex>
          </div>
          <div>{commentItem.contents}</div>
          <div className="flex justify-between">
            <div>
              {new Date(
                isEdit ? commentItem.updatedAt : commentItem.createdAt
              ).toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
              })}
            </div>
            <button onClick={onToggleEdit}>
              <EditOutlined />
            </button>
          </div>
          <hr className="my-10" />
        </div>
      )}
    </>
  );
}
