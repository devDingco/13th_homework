"use client";
import useBoardsDetail from "@/app/components/boards/Boards-detail/hook";
import styles from "./styles.module.css";
import { Divider } from "@/app/components/boards/Boards-write";
import BoardCommentsInputForm from "@/app/components/boards//Boards-detail/BoardCommentsInputForm";
import BoardDetailProfile from "./Profile";
import BoardComment from "./BoardComment";

const BoardsDetail = () => {
  const { board, onClickEdit, onClickShowBoards } = useBoardsDetail();

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
            <img src="/assets/location.png" />
          </button>
        </section>
      </div>
      <article className={styles.BoardsDetail_article}>
        <figure>
          <img src="/assets/boards_main_img.png" />
        </figure>
        <p className={styles.BoardsDetail_p}>{board.contents}</p>
      </article>
      <section className={styles.BoardsDetail_video_section}>
        <img src="/assets/video.png" />
      </section>
      <section className={styles.BoardsDetail_heartButton_list_section}>
        <div className={styles.BoardsDetail_heartBreak_button}>
          <img src="/assets/heartBreak.png" />
          24
        </div>
        <div className={styles.BoardsDetail_heart_button}>
          <img src="/assets/heart.png" />
          12
        </div>
      </section>
      <footer className={styles.BoardsDetail_footer}>
        <button
          className={styles.BoardsDetail_footer_button}
          onClick={onClickShowBoards}
        >
          <img src="/assets/list.png" />
          목록으로
        </button>
        <button
          className={styles.BoardsDetail_footer_button}
          onClick={onClickEdit}
        >
          <img src="/assets/edit.png" />
          수정하기
        </button>
      </footer>
      <BoardCommentsInputForm />
      <BoardComment />
    </div>
  );
};

export default BoardsDetail;
