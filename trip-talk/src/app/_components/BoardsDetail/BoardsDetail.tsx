"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import useBoardsDetail from "../../../commons/hooks/useBoardsDetail";
import LikeButton from "../LikeButton/LikeButton";
import DisLikeButton from "../DisLikeButton/DisLikeButton";
import Youtube from "../Youtube/Youtube";

export default function BoardsDetail() {
  const { boardId, boardData } = useBoardsDetail();

  return (
    <div className={styles.layout}>
      <div className={styles.title}>{boardData?.title}</div>
      <div>
        <div className={styles.author_info}>
          <div className={styles.author_name}>
            <Image
              src="/svgs/profileIcon.svg"
              alt="profileIcon"
              width={24}
              height={24}
            />
            <p>{boardData?.writer}</p>
          </div>
          <div className={styles.date}>
            <div>{boardData?.createdAt.slice(0, 10).replaceAll("-", ".")}</div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.link_location_row}>
          <Image src="/svgs/link.svg" alt="link" width={24} height={24} />
          <Image
            src="/svgs/location.svg"
            alt="location"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div>
        <Image
          src="/pngs/post-image.png"
          alt="post-image"
          width={400}
          height={531}
        />
      </div>
      <div className={styles.post_content}>{boardData?.contents}</div>
      <div className={styles.video_thumbnail_wrapper}>
        {boardData?.youtubeUrl && (
          <Youtube youtubeUrl={boardData?.youtubeUrl} />
        )}
      </div>
      <div className={styles.reaction}>
        <DisLikeButton />
        <LikeButton />
      </div>
      <div className={styles.button_layout}>
        <Link href={"/boards"}>
          <Button color="white" id="list" />
        </Link>
        <Link href={`${boardId}/edit`}>
          <Button color="white" id="edit" />
        </Link>
      </div>
    </div>
  );
}
