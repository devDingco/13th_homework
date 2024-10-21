'use client';

import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import useBoardsDeatil from './hooks';
import CommentWrite from '../comment-write';
import CommentList from '../comment-list';
import { useQuery } from '@apollo/client';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import YouTube from 'react-youtube';
import { FETCH_BOARD_COMMENTS } from '../comment-list/queries';
import { useState } from 'react';

const IMAGE_SRC = {
  profileImage: {
    src: require('@/assets/profile.png'),
    alt: '프로필이미지',
  },
  linkImage: {
    src: require('@/assets/link.png'),
    alt: '링크아이콘',
  },
  locationImage: {
    src: require('@/assets/location.png'),
    alt: '위치아이콘',
  },
  cheongsanImage: {
    src: require('@/assets/cheongsan.png'),
    alt: '청산사진',
  },
  neotubeImage: {
    src: require('@/assets/neotube.png'),
    alt: '너튜브사진',
  },
  badImage: {
    src: require('@/assets/bad.png'),
    alt: '싫어요',
  },
  goodImage: {
    src: require('@/assets/good.png'),
    alt: '좋아요',
  },
  hamberger: {
    src: require('@/assets/hamberger.png'),
    alt: '목록아이콘',
  },
  pencil: {
    src: require('@/assets/pencil.png'),
    alt: '수정아이콘',
  },
} as const;

export default function BaordDeatil() {
  const { boardId, data } = useBoardsDeatil();
  const { data: dataCommentList, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: boardId },
  });
  const [hasMore, setHasMore] = useState(true);
  const onNext = () => {
    if (!dataCommentList?.fetchBoardComments.length) {
      return;
    }

    fetchMore({
      variables: {
        page: Math.ceil(dataCommentList?.fetchBoardComments.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments.length) {
          setHasMore(false);
          return;
        }

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              />
              <div>{data?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {new Date(data?.fetchBoard?.createdAt).toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
              })}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image
              src={IMAGE_SRC.linkImage.src}
              alt={IMAGE_SRC.linkImage.alt}
            />
            <Tooltip
              placement="bottom"
              title={data?.fetchBoard.boardAddress?.address}
            >
              <Image
                src={IMAGE_SRC.locationImage.src}
                alt={IMAGE_SRC.locationImage.alt}
              />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <Image
              src={IMAGE_SRC.cheongsanImage.src}
              alt={IMAGE_SRC.cheongsanImage.alt}
              className={styles.detailContentImage}
            />
            <div className={styles.detailContentText}>
              {data?.fetchBoard?.contents}
            </div>
            {/* <Image
              src={IMAGE_SRC.neotubeImage.src}
              alt={IMAGE_SRC.neotubeImage.alt}
            /> */}

            {data?.fetchBoard?.youtubeUrl && (
              <YouTube
                videoId={new URL(data?.fetchBoard?.youtubeUrl).searchParams.get(
                  'v'
                )}
                opts={{
                  width: '100%',
                  height: '720px',
                }}
              />
              // <iframe src={data?.fetchBoard?.youtubeUrl}></iframe>
            )}
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                {/* <Image
                  src={IMAGE_SRC.badImage.src}
                  alt={IMAGE_SRC.badImage.alt}
                /> */}
                <DislikeOutlined />
                <div className={styles.detailBadText}>24</div>
              </div>
              <div className={styles.detailGoodContainer}>
                {/* <Image
                  src={IMAGE_SRC.goodImage.src}
                  alt={IMAGE_SRC.goodImage.alt}
                /> */}
                <LikeOutlined />
                <div className={styles.detailGoodText}>12</div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <Link href={`/boards`} className={styles.detailButton}>
                <Image
                  src={IMAGE_SRC.hamberger.src}
                  alt={IMAGE_SRC.hamberger.alt}
                />
                <div>목록으로</div>
              </Link>
              <Link
                href={`/boards/${boardId}/edit`}
                className={styles.detailButton}
              >
                <Image src={IMAGE_SRC.pencil.src} alt={IMAGE_SRC.pencil.alt} />
                <div>수정하기</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
