import Image from "next/image";
import styles from "./styles.module.css";

import useBoardsDetailCommentList from "./hook";
import { Rate } from "antd";

export default function BoardsDetailCommentList() {
  const { data } = useBoardsDetailCommentList();

  return (
    <>
      <main>
        {data?.fetchBoardComments?.map((el) => (
          <div key={el._id} className={styles.commentListSection}>
            <hr />
            <div className={styles.commentListTop}>
              <Image
                src="/images/profile.png"
                alt="프로필아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.profileIcon}
              />
              <div className={styles.commentName}>{el.writer}</div>
              <div className={styles.starSection}>
                {/* {Array.from({ length: el.rating }).map((_, starIndex) => (
                  <Image
                    key={starIndex}
                    src="/images/star.png"
                    alt="별점아이콘"
                    width={10}
                    height={10}
                    sizes="100vw"
                    className={styles.starIcon}
                  />
                ))} */}
                <Rate value={el.rating} disabled />
              </div>
              <div className={styles.editAndClose}>
                <Image
                  src="/images/edit.png"
                  alt="수정아이콘"
                  width={10}
                  height={10}
                  sizes="100vw"
                  className={styles.editIcon}
                />
                <Image
                  src="/images/close.png"
                  alt="삭제아이콘"
                  width={10}
                  height={10}
                  sizes="100vw"
                  className={styles.closeIcon}
                />
              </div>
            </div>
            <div className={styles.commentListMiddle}>{el.contents}</div>
            <div className={styles.commentListBottom}>
              {new Date(el.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}

        <div className={styles.commentListSection}>
          <hr />
          <div className={styles.commentListTop}>
            <Image
              src="/images/profile.png"
              alt="프로필아이콘"
              width={10}
              height={10}
              sizes="100vw"
              className={styles.profileIcon}
            />
            <div className={styles.commentName}>홍길동</div>
            <div className={styles.starSection}>
              <Image
                src="/images/star.png"
                alt="별점아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.starIcon}
              />
              <Image
                src="/images/star.png"
                alt="별점아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.starIcon}
              />
              <Image
                src="/images/star.png"
                alt="별점아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.starIcon}
              />
              <Image
                src="/images/star.png"
                alt="별점아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.starIcon}
              />
              <Image
                src="/images/star.png"
                alt="별점아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.starIcon}
              />
            </div>
            <div className={styles.editAndClose}>
              <Image
                src="/images/edit.png"
                alt="수정아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.editIcon}
              />
              <Image
                src="/images/close.png"
                alt="삭제아이콘"
                width={10}
                height={10}
                sizes="100vw"
                className={styles.closeIcon}
              />
            </div>
          </div>
          <div className={styles.commentListMiddle}>
            살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에
            살겠노라. 얄리얄리 얄랑셩 얄라리 얄라
          </div>
          <div className={styles.commentListBottom}>2024.11.11</div>
        </div>
      </main>
    </>
  );
}
