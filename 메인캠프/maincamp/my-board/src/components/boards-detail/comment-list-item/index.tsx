'use client';
import { Rate } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import CommentWrite from '../comment-write';
import { ICommentWrite } from '../comment-write/types';

export default function CommentListItem({ el }: ICommentWrite) {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = (id: string) => {
    // console.log('댓글 id', id);
    setIsEdit(true);
  };

  const handleUnableEdit = () => {
    setIsEdit(false);
  };
  return (
    <>
      {!isEdit ? (
        <div
          key={el?._id}
          className="border-b border-solid border-gray-200 flex flex-col gap-2 w-full mb-4"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Image
                src="/images/profile.png"
                width={24}
                height={24}
                sizes="100vw"
                alt="프로필"
              />
              <span>{el?.writer}</span>
              <span>
                <Rate value={el?.rating} disabled={true} />
              </span>
            </div>
            <div className="flex gap-1">
              <Image
                width={20}
                height={20}
                alt="수정"
                src="/images/edit.png"
                className="cursor-pointer"
                onClick={() => handleEdit(String(el?._id))}
              />
              <Image
                width={20}
                height={20}
                alt="삭제"
                src="/images/close.png"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="prose-r_16_24">{el?.contents}</div>
          <div className="mb-2 text-gray-400 prose-r_14_20">
            {el?.createdAt.slice(0, 10)}
          </div>
        </div>
      ) : (
        <CommentWrite
          isEdit={isEdit}
          el={el}
          setIsEdit={setIsEdit}
          commentId={el?._id}
          handleUnableEdit={handleUnableEdit}
        />
      )}
    </>
  );
}
