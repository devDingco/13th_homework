'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ListIcon from '@/../public/icons/list_icon.svg';
import EditIcon from '@/../public/icons/edit_icon.svg';
import Button from '@/app/_component/form/Button';
import s from './PostDetail.module.css';
import { useParams, useRouter } from 'next/navigation';
import BoardDetail from '@/app/_component/boardDetail/BoardDetail';
import CommentList from '@/app/_component/boardDetail/CommentList';

const PostDetail = () => {
  const { postId: params } = useParams();
  const router = useRouter();

  return (
    <>
      <BoardDetail style={s} postId={params.toString()} />
      <div className={`${s.flexbox} justify-center gap-6`}>
        <Button style="default" onClickFnc={() => router.push('/boards')}>
          <Image src={ListIcon} alt="" width={0} height={0} />
          목록으로
        </Button>
        <Button
          style="default"
          onClickFnc={() => router.push(`/boards/${params}/edit`)}>
          <Image src={EditIcon} alt="" width={0} height={0} />
          수정하기
        </Button>
      </div>
    </>
  );
};
export default PostDetail;
