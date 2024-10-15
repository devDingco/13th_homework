"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardsDetail } from "./hook";
import { IBoardsDetailProps } from "./types";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

const BoardsDetail = (props: IBoardsDetailProps) => {
  const {
    onClickMoveToList,
    onClickMoveToUpdate,
    onClickLikeCount,
    onClickDislikeCount,
    likeCount,
    dislikeCount,
  } = useBoardsDetail();

  return (
    <div className={styles.layout}>
      <div className={styles.head}>
        <div className={styles.contentTitle}>
          {props.data?.fetchBoard?.title}
        </div>
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
            <span id={styles.whoWrite}>{props.data?.fetchBoard?.writer}</span>
          </div>
          <div className={styles.writeDate}>
            {props.data?.fetchBoard.createdAt &&
              new Date(props.data.fetchBoard.createdAt).toLocaleDateString()}
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
        <span id={styles.contentsPoem}>{props.data?.fetchBoard?.contents}</span>
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
          <button>
            <DislikeOutlined
              onClick={onClickDislikeCount}
              style={{ color: "#5f5f5f" }}
            />
          </button>
          <span className={styles.hateNum}>{dislikeCount}</span>
        </div>
        <div className={styles.like}>
          <button>
            <LikeOutlined
              onClick={onClickLikeCount}
              style={{ color: "#f66a6a" }}
            />
          </button>
          <span className={styles.likeNum}>{likeCount}</span>
        </div>
      </div>

      <div className={styles.toButtons}>
        {" "}
        <button className={styles.toList} onClick={onClickMoveToList}>
          목록으로
        </button>
        <button className={styles.edit} onClick={onClickMoveToUpdate}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default BoardsDetail;
