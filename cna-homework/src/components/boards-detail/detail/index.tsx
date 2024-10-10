import { Tooltip } from "antd";
import { useBoardDetail } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import YouTube from "react-youtube";

export default function BoardDetail() {
  const { onClickMoveEdit, data, createdDate, youtubeId } = useBoardDetail();
  console.log("youtube:", youtubeId);

  const address = data?.fetchBoard.boardAddress?.address;

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
            <Image src="/images/clip.png" alt="clip" width={19} height={9} sizes="100vw" />

            <Tooltip
              placement="bottomRight"
              title={
                <div style={{ color: "black", fontSize: "14px", fontWeight: "500", lineHeight: "20px" }}>{address}</div>
              }
              arrow={false}
              color="white"
            >
              <Image
                src="/images/place.png"
                alt="place"
                width={15}
                height={18}
                sizes="100vw"
                className={styles.tooltipImg}
              />
            </Tooltip>
          </div>
        </div>
        <div className={styles.detailContentArea}>
          <Image
            src="/images/example.png"
            alt="example"
            className={styles.contentImg}
            width={0}
            height={0}
            sizes="100vw"
          />
          <div className={styles.detailContent}>{data?.fetchBoard?.contents}</div>
          <div className={styles.videoArea}>
            <YouTube
              videoId={youtubeId}
              opts={{
                width: "820",
                height: "464",
                playerVars: {
                  autoplay: 1, //자동 재생 여부
                  modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                  loop: 1, //반복 재생
                  playlist: youtubeId, //반복 재생으로 재생할 플레이 리스트
                },
              }}
            />
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
