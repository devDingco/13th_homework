"use client";

import Image from "next/image";
import useBoardsDetail from "./hook";
import Link from "next/link";
import styles from "./styles.module.css";
import profile from "../../../../../public/images/profile_img.png";
import {
  DislikeOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LikeOutlined,
  LinkOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import YouTube from "react-youtube";
import { Tooltip } from "antd";

const BoardsDetailComponent = () => {
  const { params, data, address } = useBoardsDetail();

  return (
    <div className={styles.container}>
      {/* 제목 */}
      <div className={styles.title}>
        <pre>{data?.fetchBoard.title}</pre>
      </div>
      <div className={styles.profile}>
        <div className={styles.user}>
          <Image
            src={profile}
            alt="profile img"
            width={0}
            height={0}
            sizes=""
            className={styles.profileImg}
          />
          <p className={styles.writer}>{data?.fetchBoard.writer}</p>
        </div>
        <p className={styles.date}>
          {data?.fetchBoard.createdAt.split("T")[0]}
        </p>
      </div>
      <div className={styles.tools}>
        <button className={styles.backNone}>
          <LinkOutlined />
        </button>
        <Tooltip placement="bottom" title={address}>
          <button className={styles.backNone}>
            <EnvironmentOutlined />
          </button>
        </Tooltip>
      </div>

      {/* 내용 */}
      <div>
        {/* {data?.fetchBoard.images &&
          data?.fetchBoard.images.map((el, index) => <div key={index + 1}>이미지 삽입</div>)} */}
        <div>{data?.fetchBoard.contents}</div>
        {data?.fetchBoard.youtubeUrl && (
          // videoId={영상의 키값}
          <YouTube videoId={data?.fetchBoard.youtubeUrl.split("=")[1]} />
        )}
      </div>

      {/* 버튼 */}
      <div className={styles.button}>
        <div>
          <div>
            <button className={styles.backNone}>
              <LikeOutlined />
              {/* TODO: 좋아요 눌렀을 때 */}
              {/* <LikeFilled /> */}
            </button>
            <p>{data?.fetchBoard.likeCount}</p>
          </div>
          <div>
            <button className={styles.backNone}>
              <DislikeOutlined />
              {/* TODO:싫어요 눌렀을 때 */}
              {/* <DislikeFilled /> */}
            </button>
            <p>{data?.fetchBoard.dislikeCount}</p>
          </div>
        </div>
        <div>
          {/* TODO: Link 말고 onClick으로 구현? 근데 단순 페이지 이동이라... */}
          <Link href={`/boards`}>
            <button className="backNone">
              <MenuOutlined />
              목록으로
            </button>
          </Link>
          <Link href={`/boards/${params.boardId}/edit`}>
            <button className="backNone">
              <EditOutlined />
              수정하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetailComponent;
