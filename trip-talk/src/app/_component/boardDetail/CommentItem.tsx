import React from 'react';
import Image from 'next/image';
import UserImage from '@/../public/images/userImage.svg';
import CommentStarEmpty from '@/../public/icons/comment_star_empty.svg';
import CommentEditIcon from '@/../public/icons/comment_edit_icon.svg';
import CommentDeleteIcon from '@/../public/icons/comment_delete_icon.svg';
import dateFormatter from '@/app/_commons/formatter/dateFormat';
import { Rate } from 'antd';
import { useState } from 'react';

interface CommentItemType {
  writer: string;
  content: string;
  createdAt: Date;
  rating: number;
}

export default function CommentItem({
  writer,
  content,
  createdAt,
  rating,
}: CommentItemType) {
  return (
    <>
      <div className="flex gap-4">
        <Image src={UserImage} width={0} height={0} alt="dd" />
        <p>{writer}</p>
        <div className="flex grow">
          <Rate value={rating} />
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
