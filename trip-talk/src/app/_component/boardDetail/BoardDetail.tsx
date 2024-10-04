import dateFormatter from '@/app/_commons/formatter/dateFormat';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import React from 'react';
import LinkIcon from '@/../public/icons/link_icon.svg';
import LocationIcon from '@/../public/icons/location_icon.svg';
import LikeIcon from '@/../public/icons/like_icon.svg';
import UnLikeIcon from '@/../public/icons/unlike_icon.svg';
import MockImg1 from '@/../public/images/mockImg1.png';
import MockImg2 from '@/../public/images/mockImg2.svg';
import { FETCH_BOARD } from '@/app/_api/board/query/getBoardData';
import { FetchBoardDocument } from '@/app/_commons/graphql/graphql';

export default function BoardDetail({
  style: s,
  postId,
}: BoardDetailPropsType) {
  const { data } = useQuery(FetchBoardDocument, {
    fetchPolicy: 'no-cache',
    variables: { boardId: postId },
  });
  return (
    <>
      <div className="border-b-[#E4E4E4] border-b border-solid">
        <h3 className={`${s.H3} ${data ? '' : 'bg-[#ccc] w-[100px] h-[20px]'}`}>
          {data?.fetchBoard.title}
        </h3>
        <div className={`${s.flexbox} gap-1`}>
          <div className={`${s.flexbox} gap-1`}>
            <p className={s.userImg} />
            <p
              className={`${s.userName} ${
                data ? '' : 'bg-[#ccc] w-[100px] h-[20px]'
              }`}>
              {data?.fetchBoard.writer}
            </p>
          </div>
          <span
            className={`${s.dateFormat} ${
              data ? '' : 'bg-[#ccc] w-[100px] h-[20px]'
            }`}>
            {data && dateFormatter(data?.fetchBoard.createdAt)}
          </span>
        </div>
      </div>
      <section className="w-full">
        <div className={`${s.flexbox} justify-end gap-1`}>
          <button>
            <Image src={LinkIcon} alt="linkIcon" width={0} height={0} />
          </button>
          <button>
            <Image src={LocationIcon} alt="" width={0} height={0} />
          </button>
        </div>
        <Image src={MockImg1} alt="" width={0} height={0} />
        <p className={`${data ? '' : 'bg-[#ccc] w-[100px] h-[20px]'}`}>
          {data?.fetchBoard.contents}
        </p>
        <div className={`${s.videoBox}`}>
          <Image src={MockImg2} alt="" width={0} height={0} />
        </div>
        <div className={`${s.flexbox} justify-center gap-6`}>
          <button>
            <Image src={UnLikeIcon} alt="" width={0} height={0} />
            <p>24</p>
          </button>
          <button>
            <Image src={LikeIcon} alt="" width={0} height={0} />
            <p className="text-[#F66A6A]">24</p>
          </button>
        </div>
      </section>
    </>
  );
}
