import Link from "next/link";
import { useBoardsDetail } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";

// mui 아이콘 사용
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

export default function BoardsDetail() {
  const { params, data } = useBoardsDetail();

  return (
    <>
      <main className={styles.boardDetail}>
        <Link href="/boards/new">BoardNew 페이지로 가는 기능</Link>
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
          <Image
            src="/images/location.png"
            alt="위치아이콘"
            className={styles.locationIcon}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <div className={styles.boardImage}>
          <Image
            src="/images/mainImage.png"
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
          <Image
            src="/images/mainVideo.png"
            alt="메인비디오"
            className={styles.mainVideo}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <div className={styles.goodAndBad}>
          <div className={styles.bad}>
            <HeartBrokenIcon />
            {/* <Image
              src="/images/bad.png"
              alt="싫어요"
              className={styles.badIcon}
              width={0}
              height={0}
              sizes="100vw"
            /> */}

            <span>24</span>
          </div>
          <div className={styles.good}>
            <FavoriteBorderIcon />
            {/* <Image
              src="/images/good.png"
              alt="좋아요"
              className={styles.goodIcon}
              width={0}
              height={0}
              sizes="100vw"
            /> */}
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
