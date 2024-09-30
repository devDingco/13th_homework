"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const BoardsDetail = () => {
  const params = useParams();
  console.log("Params:", params);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  console.log(data); // 데이터 확인

  return (
    <div className={styles.layout}>
      <div className={styles.head}>
        <div className={styles.contentTitle}>{data?.fetchBoard?.title}</div>
        <div className={styles.createInfo}>
          <div className={styles.writerName}>
            <Image
              src="/icon/profile_img.png"
              className={styles.profileImg}
              alt="프로필 이미지"
              width={0}
              height={0}
              sizes="100vw"
            />
            <span id={styles.whoWrite}>{data?.fetchBoard?.writer}</span>
          </div>
          <div className={styles.writeDate}>
            {data?.fetchBoard.createdAt &&
              new Date(data.fetchBoard.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className={styles.shareImg}>
          {" "}
          <Image
            src="/icon/link_icon_24.png"
            className={styles.shareicon}
            alt="링크 아이콘"
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            src="/icon/location_24.png"
            className={styles.shareicon}
            alt="위치 아이콘"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>

      <div className={styles.contentBox}>
        {" "}
        <Image
          src="/images/content_img.png"
          className={styles.contentImg}
          alt="내용 이미지"
          width={0}
          height={0}
          sizes="100vw"
        />
        <span id={styles.contentsPoem}>{data?.fetchBoard?.contents}</span>
      </div>

      <div className={styles.previewBox}>
        {" "}
        <Image
          src="/images/video.png"
          className={styles.previewImg}
          alt="동영상 미리보기"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>

      <div className={styles.evaluate}>
        {" "}
        <div className={styles.hate}>
          <button className={styles.hateButton}></button>
          <span className={styles.hateNum}>24</span>
        </div>
        <div className={styles.like}>
          <button className={styles.likeButton}></button>
          <span className={styles.likeNum}>12</span>
        </div>
      </div>

      <div className={styles.toButtons}>
        {" "}
        <button className={styles.toList}>목록으로</button>
        <button className={styles.edit}>수정하기</button>
      </div>
    </div>
  );
};

export default BoardsDetail;
