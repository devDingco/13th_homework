"use client";
import useBoardsDetail from "@/app/_components/boards/Boards-detail/Detail/hook";
import styles from "./styles.module.css";
import BoardCommentWrite from "@/app/_components/boards/Boards-detail/Comment-write";
import BoardDetailProfile from "../Profile";
import BoardCommentList from "../Comment-list";
import { DislikeOutlined, HeartOutlined } from "@ant-design/icons";
import Divider from "@/app/_components/commons/divider";
import { Image, Tooltip } from "antd";
import YouTube from "react-youtube";
import { EditIcon, ListIcon } from "@/commons/ui/icon";
import { Button, ButtonSize, ButtonVariant } from "@/commons/ui/button";

const BoardsDetail = () => {
  const {
    board,
    comments,
    hasMore,
    onClickEdit,
    onClickShowBoards,
    toggleHasMoreScroll,
  } = useBoardsDetail();

  console.log(board.images);

  return (
    <div className={styles.BoardsDetail_root}>
      <header className={styles.BoardsDetail_header}>{board.title}</header>
      <div className={styles.BoardsDetail_userForm_and_sideButton}>
        <div className={styles.BoardsDetail_userForm}>
          <BoardDetailProfile writer={board.writer} />
          <div className={styles.postDate}>2024.11.11</div>
        </div>
        <Divider />
        <section className={styles.BoardsDetail_userForm_sideButton_section}>
          <button className={styles.BoardsDetail_userForm_sideButton}>
            <img src="/assets/link.png" />
          </button>
          <button className={styles.BoardsDetail_userForm_sideButton}>
            <Tooltip
              placement="bottomLeft"
              color={"white"}
              title={board.address}
              arrow={false}
              overlayInnerStyle={{
                color: "black",
                boxShadow: "0px 2px 6px 2px #00000026",
              }}
            >
              <img src="/assets/location.png" />
            </Tooltip>
          </button>
        </section>
      </div>
      <article className={styles.BoardsDetail_article}>
        <figure className={styles.uploadImagesContainer}>
          {board.images.map((el, index) =>
            el !== "" ? (
              <Image
                key={index}
                src={`https://storage.googleapis.com/${el}`}
                alt="추가한 이미지"
                width={400}
                height={513}
                sizes="100vw"
                // 이미지 스타일이 안먹는다..? 왜그런지 찾아봐야함.
                className={styles.uploadImage}
              ></Image>
            ) : (
              <div key={index}></div>
            )
          )}
        </figure>
        <p className={styles.BoardsDetail_p}>{board.contents}</p>
      </article>
      <section className={styles.BoardsDetail_video_section}>
        <YouTube videoId={"0mOvvBwPHJ0"} />
      </section>
      <section className={styles.BoardsDetail_heartButton_list_section}>
        <div className={styles.BoardsDetail_heartBreak_button}>
          <DislikeOutlined style={{ fontSize: "24px" }} />
          24
        </div>
        <div className={styles.BoardsDetail_heart_button}>
          <HeartOutlined style={{ fontSize: "24px" }} />
          12
        </div>
      </section>
      <footer className={styles.BoardsDetail_footer}>
        <Button
          size={ButtonSize.medium}
          variant={ButtonVariant.tertiary}
          label="목록으로"
          onClick={onClickShowBoards}
          leadingIcon={<ListIcon />}
        ></Button>
        <Button
          size={ButtonSize.medium}
          variant={ButtonVariant.tertiary}
          label="수정하기"
          onClick={onClickEdit}
          leadingIcon={<EditIcon />}
        ></Button>
      </footer>
      <BoardCommentWrite
        isEdit={false}
        toggleHasMoreScroll={toggleHasMoreScroll}
      />
      <BoardCommentList
        comments={comments}
        hasMore={hasMore}
        toggleHasMoreScroll={toggleHasMoreScroll}
      />
    </div>
  );
};

export default BoardsDetail;
