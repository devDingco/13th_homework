import Link from "next/link";
import { useBoardsDetail } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

// mui 아이콘 사용
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { Tooltip } from "antd";

export default function BoardsDetail() {
  const { params, data } = useBoardsDetail();

  return (
    <>
      <main className={styles.boardDetail}>
        <div className={styles.title}>{data?.fetchBoard.title}</div>

        <div className={styles.nameAndDate}>
          <div className={styles.name}>
            <Image
              src="/images/profile.png"
              alt="프로필아이콘"
              className={styles.profileIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
            <span>{data?.fetchBoard.writer}</span>
          </div>
          <div className={styles.date}>2024.11.11</div>
        </div>

        <hr className={styles.실선} />

        <div className={styles.shareAndLocation}>
          <Image
            src="/images/link.png"
            alt="링크아이콘"
            className={styles.linkIcon}
            width={0}
            height={0}
            sizes="100vw"
          />

          <Tooltip
            title={data?.fetchBoard.boardAddress.address || "주소 정보 없음"}
            placement="bottomRight"
          >
            {/* 문제점 address는 필수값이 아니여서 작성 안해도 상세페이지가 들어가져야 하는데 address가 없는 id값은 상세로 들어가지지않음,, */}
            {/* 딮하겐 모르겠지만 과제 밀린분이 gql에 주소값을 넣지않고 만들때 생기는 문제라는 생각을 함. 왜냐면 "주소 정보 없음"이라는 값도 나오는걸 보고 추측함 */}
            <Image
              src="/images/location.png"
              alt="위치아이콘"
              className={styles.locationIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
          </Tooltip>
        </div>

        <div className={styles.boardImage}>
          <Image
            src={`https://storage.googleapis.com/${data?.fetchBoard.images}`}
            alt="메인이미지"
            className={styles.mainImage}
            width={0}
            height={0}
            sizes="100vh"
          />
        </div>

        <div className={styles.boardText}>
          <p>{data?.fetchBoard.contents}</p>
        </div>

        <div className={styles.boardVideo}>
          <ReactPlayer
            url={data?.fetchBoard.youtubeUrl}
            width="822px"
            height="464px"
            controls={true}
          />
        </div>

        <div className={styles.goodAndBad}>
          <div className={styles.bad}>
            <HeartBrokenIcon />

            <span>24</span>
          </div>
          <div className={styles.good}>
            <FavoriteBorderIcon />
            <span>12</span>
          </div>
        </div>

        <div className={styles.menuAndEdit}>
          <button className={styles.menu}>
            <Image
              src="/images/menu.png"
              alt="메뉴"
              className={styles.menuIcon}
              width={0}
              height={0}
              sizes="100vw"
            />

            <span></span>
            <Link href="/boards">
              <span>목록으로</span>
            </Link>
          </button>
          <button className={styles.edit}>
            <Image
              src="/images/edit.png"
              alt="수정"
              className={styles.editIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
            <Link href={`/boards/${params.boardId}/edit`}>수정하러가기</Link>
          </button>
        </div>
      </main>
    </>
  );
}
