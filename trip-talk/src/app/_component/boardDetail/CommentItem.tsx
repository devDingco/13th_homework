import React from 'react';
import Image from 'next/image';
import UserImage from '@/../public/images/userImage.svg';
import CommentStarEmpty from '@/../public/icons/comment_star_empty.svg';
import CommentEditIcon from '@/../public/icons/comment_edit_icon.svg';
import CommentDeleteIcon from '@/../public/icons/comment_delete_icon.svg';
import dateFormatter from '@/app/_commons/formatter/dateFormat';

interface CommentItemType {
  writer: string;
  content: string;
  createdAt: Date;
  rating: string;
}

export default function CommentItem({
  writer,
  content,
  createdAt,
  rating,
}: CommentItemType) {
  console.log('여기는 아이템', writer, content);
  return (
    <>
      <div className="flex gap-4">
        <Image src={UserImage} width={0} height={0} alt="dd" />
        <p>{writer}</p>
        <div className="flex grow">
          <Image src={CommentStarEmpty} width={0} height={0} alt="댓글별점1" />
          <Image src={CommentStarEmpty} width={0} height={0} alt="댓글별점2" />
          <Image src={CommentStarEmpty} width={0} height={0} alt="댓글별점3" />
          <Image src={CommentStarEmpty} width={0} height={0} alt="댓글별점4" />
          <Image src={CommentStarEmpty} width={0} height={0} alt="댓글별점5" />
        </div>
        <Image
          src={CommentEditIcon}
          width={0}
          height={0}
          alt="댓글수정아이콘"
        />
        <Image
          src={CommentDeleteIcon}
          width={0}
          height={0}
          alt="댓글삭제아이콘"
        />
      </div>
      <div>{dateFormatter(createdAt)}</div>
      <div>{content}</div>
    </>
  );
}
