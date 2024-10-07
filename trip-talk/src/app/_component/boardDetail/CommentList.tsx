import Image from 'next/image';
import React from 'react';
import UserImage from '@/../public/images/userImage.svg';
import CommentStar from '@/../public/icons/comment_star.svg';
import CommentEditIcon from '@/../public/icons/comment_edit_icon.svg';
import CommentDeleteIcon from '@/../public/icons/comment_delete_icon.svg';

export default function CommentList() {
  return (
    <div>
      <div className="flex">
        <Image src={UserImage} width={0} height={0} alt="dd" />
        <p>이름</p>
        <div className="flex grow">
          <Image src={CommentStar} width={0} height={0} alt="댓글별점1" />
          <Image src={CommentStar} width={0} height={0} alt="댓글별점2" />
          <Image src={CommentStar} width={0} height={0} alt="댓글별점3" />
          <Image src={CommentStar} width={0} height={0} alt="댓글별점4" />
          <Image src={CommentStar} width={0} height={0} alt="댓글별점5" />
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
      <div>{''}</div>
      <div>{''}</div>
    </div>
  );
}
