import dateFormatter from '@/app/_commons/formatter/dateFormat';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useState } from 'react';
import LinkIcon from '@/../public/icons/link_icon.svg';
import LocationIcon from '@/../public/icons/location_icon.svg';
import MockImg1 from '@/../public/images/mockImg1.png';
import MockImg2 from '@/../public/images/mockImg2.svg';
import { FetchBoardDocument } from '@/app/_commons/graphql/graphql';
import { DislikeTwoTone, LikeTwoTone } from '@ant-design/icons';
import { FETCH_BOARD } from '@/app/_api/board/Query';
import { Divider, Space, Tooltip } from 'antd';
import ReactPlayer from 'react-player';
import CommentList from './CommentList';

export default function BoardDetail({
  style: s,
  postId,
}: BoardDetailPropsType) {
  const [locateHover, setLocateHover] = useState(false);
  const { data } = useQuery(FETCH_BOARD, {
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
          {/* <Divider orientation="left">Presets</Divider> */}
          <Space wrap>
            {data && (
              <Tooltip
                placement="topRight"
                title={data?.fetchBoard.boardAddress?.address && ''}
                color="#999">
                <button>
                  <Image src={LocationIcon} alt="" width={0} height={0} />
                </button>
              </Tooltip>
            )}
          </Space>
        </div>
        <div className="flex gap-2">
          {data &&
            data?.fetchBoard.images?.map((imageUrl: string) => (
              <Image
                src={`https://storage.googleapis.com/${imageUrl}`}
                alt=""
                width={200}
                height={200}
              />
            ))}
        </div>
        <p className={`${data ? '' : 'bg-[#ccc] w-[100px] h-[20px]'}`}>
          {data?.fetchBoard.contents}
        </p>
        {data?.fetchBoard.youtubeUrl && (
          <div className={`${s.videoBox}`}>
            {data && <ReactPlayer url={data?.fetchBoard.youtubeUrl} />}
          </div>
        )}
        <div className={`${s.flexbox} justify-center gap-6`}>
          <button>
            <DislikeTwoTone />
            <p>24</p>
          </button>
          <button>
            <LikeTwoTone twoToneColor="#F66A6A" />
            <p className="text-[#F66A6A]">24</p>
          </button>
        </div>
      </section>
      <CommentList />
    </>
  );
}
