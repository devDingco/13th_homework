import { useBoardDetail } from "./hook";
import styles from "./styles.module.css"
import Image from "next/image";

export default function BoardDetail() {
  const { onClickMoveEdit, data, createdDate } = useBoardDetail();

  return (
    <div className={styles.detailAllContainer}>
      <div className={styles.detailContainer}>
        <div className={styles.detailTitleArea}>
          <div className={styles.detailTitle}>{data?.fetchBoard?.title}</div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.nick}>
            <div className={styles.profileImg}>
              <Image src="/images/profile.png" alt="profile" width={0} height={0} sizes="100vw" />
            </div>
            <p>{data?.fetchBoard?.writer}</p>
          </div>
          <div className={styles.date}>{createdDate}</div>
        </div>
        <div className={styles.shareArea}>
          <div className={styles.shareImg}>
            <Image src="/images/clip.png" alt="clip" width={0} height={0} sizes="100vw" />
            <Image src="/images/place.png" alt="place" width={0} height={0} sizes="100vw" />
          </div>
        </div>
        <div className={styles.detailContentArea}>
          <Image src="/images/example.png" alt="ex" className={styles.contentImg} width={0} height={0} sizes="100vw" />
          <div className={styles.detailContent}>{data?.fetchBoard?.contents}</div>
          <div className={styles.videoArea}>
            <Image className={styles.videoImg} src="/images/video.png" alt="video" width={0} height={0} sizes="100vw" />
          </div>
          <div className={styles.heartArea}>
            <div className={styles.brokenHeart}>
              <Image
                className={styles.heargImg}
                src="/images/broken-heart.png"
                alt="brokenheart"
                width={0}
                height={0}
                sizes="100vw"
              />
              <p>{data?.fetchBoard?.dislikeCount}</p>
            </div>
            <div className={styles.redHeart}>
              <Image
                className={styles.heargImg}
                src="/images/red-heart.png"
                alt="redheart"
                width={0}
                height={0}
                sizes="100vw"
              />
              <p>{data?.fetchBoard?.likeCount}</p>
            </div>
          </div>
          <div className={styles.detailBtnArea}>
            <button>
              <Image src="/images/list.png" alt="list" width={0} height={0} sizes="100vw" />
              목록으로
            </button>
            <button onClick={onClickMoveEdit}>
              <Image src="/images/edit.png" alt="edit" width={0} height={0} sizes="100vw" />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
