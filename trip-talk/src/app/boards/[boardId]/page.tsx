"use client";

import Image from "next/image";
import Button from "../../components/Button/Button";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FETCH_BOARD } from "../../../commons/graphql/backend-api";

export default function BoardsDetail() {
  const params = useParams();
  const boardId = params.boardId;
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });

  const boardWriter = data?.fetchBoard.writer;
  const boardTitle = data?.fetchBoard.title;
  const boardContents = data?.fetchBoard.contents;
  const boardCreatedAt = data?.fetchBoard.createdAt
    .slice(0, 10)
    .replaceAll("-", ".");

  return (
    <div className={styles.layout}>
      <div className={styles.title}>{boardTitle}</div>
      <div>
        <div className={styles.author_info}>
          <div className={styles.author_name}>
            <Image
              src="/svgs/profileIcon.svg"
              alt="profileIcon"
              width={24}
              height={24}
            />
            <p>{boardWriter}</p>
          </div>
          <div className={styles.date}>
            <div>{boardCreatedAt}</div>
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
      <div className={styles.post_content}>{boardContents}</div>
      <div className={styles.video_thumbnail_wrapper}>
        <Image
          src="/pngs/video-thumbnail.png"
          alt="video-thumbnail"
          width={822}
          height={464}
        />
      </div>
      <div className={styles.reaction}>
        <div>
          <Image src="/svgs/bad.svg" alt="bad" width={24} height={24} />
          <p className={styles.bad_count}>12</p>
        </div>
        <div>
          <Image src="/svgs/good.svg" alt="good" width={24} height={24} />
          <p className={styles.good_count}>24</p>
        </div>
      </div>
      <div className={styles.button_layout}>
      <Link href={"/boards"}>
        <Button color="white" src="/svgs/menu.svg" alt="menu">
          목록으로
        </Button>
        </Link>
        <Link href={`${boardId}/edit`}>
        <Button color="white" src="/svgs/edit.svg" alt="edit">
          수정하기
        </Button>
        </Link>
      </div>
    </div>
  );
}
