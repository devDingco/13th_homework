"use client";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";

import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const IMAGE_SRC = {
  profileImage: {
    src: require("@assets/profile_image.png"),
    alt: "프로필이미지",
  },
  linkImage: {
    src: require("@assets/link.png"),
    alt: "링크아이콘",
  },
  locationImage: {
    src: require("@assets/location.png"),
    alt: "위치아이콘",
  },
  cheongsanImage: {
    src: require("@assets/cheongsan.png"),
    alt: "청산사진",
  },
  neotubeImage: {
    src: require("@assets/neotube.png"),
    alt: "너튜브사진",
  },
  badImage: {
    src: require("@assets/bad.png"),
    alt: "싫어요",
  },
  goodImage: {
    src: require("@assets/good.png"),
    alt: "좋아요",
  },
  hamberger: {
    src: require("@assets/hamberger.png"),
    alt: "목록아이콘",
  },
  pencil: {
    src: require("@assets/pencil.png"),
    alt: "수정아이콘",
  },
} as const;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;

export default function BoardsDetailPage() {
  const params = useParams();
  const id = params.boardId;
  console.log("detail 화면에서 id::::", id);

  const { data: boardData } = useQuery(FETCH_BOARD, {
    variables: { boardId: id },
  });

  console.log("detail 화면에서 data:::", boardData);

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    if (boardData?.fetchBoard) {
      setLikeCount(boardData.fetchBoard.likeCount);
      setDislikeCount(boardData.fetchBoard.dislikeCount);
    }
  }, [boardData]);

  const [likeMutation] = useMutation(LIKE_BOARD);
  const [dislikeMutation] = useMutation(DISLIKE_BOARD);

  const increaseLikes = async () => {
    try {
      const { data } = await likeMutation({
        variables: { boardId: id },
      });
      setLikeCount(data.likeBoard);
      console.dir(data);
    } catch (error) {
      console.error("like 에러", error);
    }
  };

  const increaseDislikes = async () => {
    try {
      const { data } = await dislikeMutation({
        variables: { boardId: id },
      });
      setDislikeCount(data.dislikeBoard);
      console.dir(data);
    } catch (error) {
      console.error('dislike 에러', error);
    }
  };

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{boardData?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              />
              <div> {boardData?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {' '}
              {boardData?.fetchBoard?.createdAt}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image
              src={IMAGE_SRC.linkImage.src}
              alt={IMAGE_SRC.linkImage.alt}
            />
            <Image
              src={IMAGE_SRC.locationImage.src}
              alt={IMAGE_SRC.locationImage.alt}
            />
          </div>
          <div className={styles.detailContentContainer}>
            <Image
              src={IMAGE_SRC.cheongsanImage.src}
              alt={IMAGE_SRC.cheongsanImage.alt}
              className={styles.detailContentImage}
            />
            <div className={styles.detailContentText}>
              {boardData?.fetchBoard?.contents}
            </div>
            <Image
              src={IMAGE_SRC.neotubeImage.src}
              alt={IMAGE_SRC.neotubeImage.alt}
            />
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <Image
                  src={IMAGE_SRC.goodImage.src}
                  alt={IMAGE_SRC.goodImage.alt}
                  onClick={ increaseLikes }
                />
                <div className={styles.detailGoodText} onClick={ increaseLikes }>
                  {likeCount}
                </div>
              </div>
              <div className={styles.detailGoodContainer}>
                <Image
                  src={IMAGE_SRC.badImage.src}
                  alt={IMAGE_SRC.badImage.alt}
                  onClick={ increaseDislikes }
                />
                <div className={styles.detailBadText} onClick={ increaseDislikes }>
                  {dislikeCount}
                </div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton}>
                <Image
                  src={IMAGE_SRC.hamberger.src}
                  alt={IMAGE_SRC.hamberger.alt}
                />
                <div>
                  <Link href="/boards">목록으로</Link>
                </div>
              </button>
              <button className={styles.detailButton}>
                <Image src={IMAGE_SRC.pencil.src} alt={IMAGE_SRC.pencil.alt} />
                <div>
                  <Link href={`/boards/edit/${id}`}>수정하기</Link>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
