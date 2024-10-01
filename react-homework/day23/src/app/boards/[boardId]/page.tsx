"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

import { FETCH_BOARD } from "../types/api";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";

const BoardsDetail = () => {
  //
  const params = useParams();

  // fetchBoard
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  return (
    <div className={styles.post_detail_page}>
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
            {data?.fetchBoard.createdAt?.split("T")[0]}
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
          <button className={styles.location_btn_box}>
            <Image
              src="/images/location.png"
              alt="location-button"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className={styles.image_box}>
        <Image
          src="/images/beach.png"
          className={styles.main_image}
          alt="main-image"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className={styles.content_box}>{data?.fetchBoard.contents}</div>
      <div className={styles.video_box}>
        <Image
          className="video_image"
          src="/images/video.png"
          alt="video-button"
          width={822}
          height={464}
          sizes="100vw"
        />
      </div>
      <div className={styles.reaction_btn_group}>
        <div className={styles.bad_btn_group}>
          <button className={styles.bad_btn}>
            <Image
              src="/images/bad.png"
              alt="bad-button"
              width={24}
              height={24}
            />
          </button>
          <div className={styles.bad_count}>10</div>
        </div>
        <div className={styles.good_btn_group}>
          <button className={styles.good_btn}>
            <Image
              src="/images/good.png"
              alt="good-button"
              width={24}
              height={24}
            />
          </button>
          <div className={styles.good_count}>10</div>
        </div>
      </div>
      <div className={styles.list_edit_btn_group}>
        <button className={styles.list_btn}>
          <Image
            src="/images/list.png"
            alt="list-button"
            width={24}
            height={24}
          />
          목록으로
        </button>
        <button className={styles.edit_btn}>
          <Image
            src="/images/edit.png"
            alt="edit-button"
            width={24}
            height={24}
          />
          <span>수정하기</span>
        </button>
      </div>
    </div>
  );
};

export default BoardsDetail;
