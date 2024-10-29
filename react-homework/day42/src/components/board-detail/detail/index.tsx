import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardsDetail } from "./hook";
import Link from "next/link";

import likeButton from "@mui/icons-material/FavoriteBorder";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import dislikeButton from "@mui/icons-material/HeartBrokenOutlined";
import { formDate } from "@/utils/date";
import YouTube from "react-youtube";

const BoardsDetail = () => {
  const { params, data } = useBoardsDetail();

  return (
    <div className={styles.post_detail_main_body}>
      <div className={styles.post_detail_main}>
        <div className={styles.title}>{data?.fetchBoard.title}</div>

        <div className={styles.info_box}>
          <div className={styles.info_user_box}>
            <div className={styles.info_user}>
              <Image
                className={styles.user_profile}
                src="/images/profile.png"
                alt="profile-image"
                width={24}
                height={24}
              />
              <div className={styles.user_name}>{data?.fetchBoard.writer}</div>
            </div>
            <div className={styles.user_date}>
              {formDate(data?.fetchBoard.createdAt)}
            </div>
          </div>

          <hr />

          <div className={styles.link_location_btn_group}>
            <button className={styles.link_btn_box}>
              <Image
                src="/images/link.png"
                alt="link-button"
                width={24}
                height={24}
              />
            </button>
            <Tooltip
              title={data?.fetchBoard.boardAddress?.address}
              placement="bottom-end"
            >
              <button className={styles.location_btn_box}>
                <Image
                  src="/images/location.png"
                  alt="location-button"
                  width={24}
                  height={24}
                />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className={styles.image_box}>
          {data?.fetchBoard.images?.map((image, index) =>
            // 이미지가 빈문자열이 아니면 그려주기
            image ? (
              <Image
                key={index}
                src={`https://storage.googleapis.com/${image}`}
                className={styles.main_image}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
              />
            ) : null
          )}
        </div>
        <div className={styles.content_box}>{data?.fetchBoard.contents}</div>

        {data?.fetchBoard.youtubeUrl && (
          <div className={styles.video_box}>
            <YouTube
              videoId={data?.fetchBoard?.youtubeUrl?.split("=")[1] || undefined}
            />
          </div>
        )}

        <div className={styles.reaction_btn_group}>
          <div className={styles.dislike_btn_group}>
            {/* 싫어요 버튼 */}
            <IconButton>
              <SvgIcon component={dislikeButton} sx={{ color: "#5f5f5f" }} />
            </IconButton>
            <div className={styles.dislike_count}>10</div>
          </div>
          <div className={styles.like_btn_group}>
            {/* 좋아요 버튼 */}
            <IconButton>
              <SvgIcon component={likeButton} sx={{ color: "#f66a6a" }} />
            </IconButton>
            <div className={styles.like_count}>10</div>
          </div>
        </div>
        {/* 이 부분 따로 컴포넌트로 빼주기 */}
        <div className={styles.list_edit_btn_group}>
          <Link href={"/boards"} className={styles.list_btn}>
            <Image
              src="/images/list.png"
              alt="list-button"
              width={24}
              height={24}
            />
            목록으로
          </Link>
          <Link href={`./${params.boardId}/edit`} className={styles.edit_btn}>
            <Image
              src="/images/edit.png"
              alt="edit-button"
              width={24}
              height={24}
            />
            <span>수정하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetail;
