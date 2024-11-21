"use client";
import useBoardList from "./hooks";
import styles from "./style.module.css";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IBoardListprops } from "./types";
import { gql, useMutation } from "@apollo/client";

export default function BoardList({ data }: IBoardListprops) {
  const router = useRouter();
  const { onClickDelete, onClickLike } = useBoardList();
  const defaultImage = "/image/sampleimg2.jpg";

  const formatDate = (isoString: string | number | Date) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={styles.Container}>
      {data?.fetchBoards.map((el: any, index: any) => (
        <div key={el._id} className={styles.card}>
          <div className={styles.header}>
            <Image
              src={defaultImage}
              width={48}
              height={48}
              className={styles.avatar}
              alt="Profile"
            />
            <div className={styles.userInfo}>
              <div className={styles.username}>{el.title}</div>
              <div className={styles.handle}>@{el.writer}</div>
            </div>
          </div>
          <div
            className={styles.content}
            onClick={() => router.push(`/boards/${el._id}`)}
          >
            <p>{el.title}</p>
            {el.images?.[0] && (
              <div className={styles.imageBox}>
                <Image
                  layout="intrinsic" /* 이미지 비율에 따라 크기 자동 조정 */
                  src={`https://storage.googleapis.com/${el.images[0]}`}
                  objectFit="contain" /* 이미지를 박스에 꽉 차게 */
                  alt="Post Thumbnail"
                  width={400}
                  height={0}
                />
              </div>
            )}
          </div>
          <div className={styles.footer}>
            <div className={styles.iconGroup}>
              <button
                onClick={() => {
                  onClickLike(el._id);
                }}
              >
                👍 {el.likeCount ?? "0"}
              </button>
              <span>💬 20</span>
              <span>🔁 12</span>
            </div>
            <div className={styles.date}>{formatDate(el.createdAt)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
