import styles from "./style.module.css";
import { UseDetailWrite } from "./hook";
import Image from "next/image";
import React from "react";
import CommentPage from "../comment-write";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import YouTube from "react-youtube";
import { Tooltip } from "antd";
import { IDetailProps } from "./types";

export default function DetailWrite(props: IDetailProps) {
  const { onModify, data, onList } = UseDetailWrite();
  console.log(data, "ddd");
  console.log(data?.fetchBoard.images.length);

  return (
    <div className={styles.css_layout}>
      <div className={styles.css_header}>{data?.fetchBoard?.title}</div>
      <div className={styles.css_info}>
        <div className={styles.css_user}>
          <Image
            src="/assets/Profile.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="profile"
            className={styles.css_profileimage}
          />
          <div className={styles.css_name}>{data?.fetchBoard?.writer}</div>
          <div className={styles.css_date}>
            {data?.fetchBoard?.createdAt.split("T")[0]}
          </div>
        </div>
        <div className={styles.css_detailhr}></div>
        <div className={styles.css_side}>
          <div className={styles.css_sidebutton}>
            <div className={styles.css_clip}>
              <Image
                src="/assets/Clip.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="clip"
                className={styles.css_clip}
              />
            </div>
            <div className={styles.css_location}>
              <Tooltip title={data?.fetchBoard?.boardAddress?.address}>
                <Image
                  src="/assets/Location.png"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="location"
                  className={styles.css_location}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          {data &&
            (data.fetchBoard.images && data.fetchBoard.images.length > 0 ? ( // 배열이 비어있을 때 index가 undefined가 나옴 그래서 배열 길이 체크
              <Image
                src={`https://storage.googleapis.com/${data.fetchBoard.images[0]}`}
                width={0}
                height={0}
                sizes="100vw"
                alt="mainimage"
                className={styles.css_image}
              />
            ) : (
              <p>이미지가 없습니다.</p> // 대체 UI
            ))}
        </div>
      </div>
      <div className={styles.css_text}>{data?.fetchBoard?.contents}</div>

      <div className={styles.css_bottomimage}>
        <YouTube
          videoId={data?.fetchBoard?.youtubeUrl?.split("=")[1]}
          // youtube주소는 www......={videoId}로 구성, =으로 나누어줌
        />
      </div>
      <div className={styles.css_heart}>
        <div className={styles.css_hate}>
          <DislikeOutlined />
          <span>24</span>
        </div>
        <div className={styles.css_like}>
          <LikeOutlined />
          <span>12</span>
        </div>
      </div>
      <div className={styles.css_detailbutton}>
        <button className={styles.css_list}>
          <Image
            src="/assets/List.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="list"
            className={styles.css_listimage}
            onClick={onList}
          />
        </button>
        <button className={styles.css_modify}>
          <Image
            src="/assets/Modify.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="modify"
            className={styles.css_modifyimage}
            onClick={onModify}
          />
        </button>
      </div>
      <div className={styles.css_comment}>
        <div className={styles.css_commentheader}>
          <div className={styles.css_commenttag}>댓글</div>
        </div>
        <CommentPage />
      </div>
    </div>
  );
}
