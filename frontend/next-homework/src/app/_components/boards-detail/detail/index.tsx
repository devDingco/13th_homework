"use client";

import useBoardsDetail from "./hook";
import Link from "next/link";
import styles from "./styles.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
          <AccountCircleOutlinedIcon />
          <p className={styles.writer}>{data?.fetchBoard.writer}</p>
        </div>
        <p className={styles.date}>
          {data?.fetchBoard.createdAt.split("T")[0]}
        </p>
      </div>
      <div className={styles.tools}>
        <button className={styles.backNone}>
          <IosShareOutlinedIcon />
        </button>
        <Tooltip placement="bottom" title={address}>
          <button className={styles.backNone}>
            <PlaceOutlinedIcon />
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
              <FavoriteBorderOutlinedIcon />
              {/* TODO: 좋아요 눌렀을 때 */}
              {/* <LikeFilled /> */}
            </button>
            <p>{data?.fetchBoard.likeCount}</p>
          </div>
          <div>
            <button className={styles.backNone}>
              <HeartBrokenOutlinedIcon />
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
              <ListOutlinedIcon />
              목록으로
            </button>
          </Link>
          <Link href={`/boards/${params.boardId}/edit`}>
            <button className="backNone">
              <EditOutlinedIcon />
              수정하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetailComponent;
