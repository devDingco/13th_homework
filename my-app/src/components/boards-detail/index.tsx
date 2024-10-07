import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useBoardsDetail } from "./hooks";

function BoardsDetail() {
  const { params, data } = useBoardsDetail();
  return (
    <main className={styles.main}>
      <div className={styles.title_box}>{data?.fetchBoard.title}</div>
      <div className={styles.details_box}>
        <div className={styles.writer_date_box}>
          <div className={styles.writer_box}>
            <Image
              className={styles.profile}
              src="/img/profile.png"
              alt="profileImg"
              width={0}
              height={0}
            />
            <div className={styles.writer}>{data?.fetchBoard.writer}</div>
          </div>
          <div className={styles.date_box}>{data?.fetchBoard.createdAt}</div>
        </div>
        <hr />
        <div className={styles.icon_box}>
          <Image
            className={styles.icon_box_img}
            src="/img/link.png"
            alt="linkImg"
            width={0}
            height={0}
          />
          <Image
            className={styles.icon_box_img}
            src="/img/location.png"
            alt="locationImg"
            width={0}
            height={0}
          />
        </div>
      </div>
      <Image
        className={styles.content_box_img}
        src="/img/beach.svg"
        alt="beachImg"
        width={0}
        height={0}
      />
      <div className={styles.content_box}>
        <pre>{data?.fetchBoard.contents}</pre>
      </div>
      <div className={styles.video_box}>
        <Image src="/img/video.png" alt="videoImg" width={822} height={464} />
      </div>
      <div className={styles.bad_good_box}>
        <div className={styles.heart_box}>
          <Image src="/img/bad.png" alt="badImg" width={24} height={24} />
          <div className="bad_count">24</div>
        </div>
        <div className={styles.heart_box}>
          <Image src="/img/good.svg" alt="goodImg" width={24} height={24} />
          <div className={styles.good_count}>24</div>
        </div>
      </div>
      <div className={styles.list_edit_box}>
        <div className={styles.button_box}>
          <Image src="/img/menu.png" alt="listImg" width={24} height={24} />
          <div className={styles.button_text}>목록으로</div>
        </div>
        <div className={styles.button_box}>
          <Image src="/img/edit.png" alt="editImg" width={24} height={24} />
          <div className={styles.button_text}>
            <Link href={`/boards/${params.boardId}/edit`}>수정하기</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BoardsDetail;
