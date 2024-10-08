import React, { Fragment } from 'react';
import s from './Board.module.css';
import dateFormatter from '@/app/_commons/formatter/dateFormat';
import Image from 'next/image';
import DeleteIcon from '@/../public/icons/delete_icon.svg';

interface BoardListPropsType {
  number?: number;
  title?: string;
  writer?: string | null;
  createdAt?: Date;
  id?: string;
  onClickDelete?: (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  onClickDetail?: () => void;
}

export default function Board({
  number,
  title,
  writer,
  createdAt,
  id,
  onClickDelete,
  onClickDetail,
}: BoardListPropsType) {
  return (
    <div
      className={`${s.boardContainer} ${
        title ? 'border border-solid border-[#F2F2F2]' : ''
      }`}
      onClick={onClickDetail}>
      <p
        className={`${s.boardItems} ${!title ? 'text-[16px]' : 'text-[14px]'}`}>
        {number ?? '번호'}
      </p>
      <p className={`grow ${!title ? 'text-[16px]' : 'text-[14px]'}`}>
        {title ?? '제목'}
      </p>
      <p
        className={`${s.boardItems} ${!title ? 'text-[16px]' : 'text-[14px]'}`}>
        {writer ?? '작성자'}
      </p>
      <p
        className={`${s.boardItems} ${!title ? 'text-[16px]' : 'text-[14px]'}`}>
        {(createdAt && dateFormatter(createdAt)) ?? '날짜'}
      </p>
      {onClickDelete && id ? (
        <button onClick={(e) => onClickDelete(id, e)}>
          <Image src={DeleteIcon} alt="" width={0} height={0} />
        </button>
      ) : (
        <div className="w-[15px]"></div>
      )}
    </div>
  );
}
