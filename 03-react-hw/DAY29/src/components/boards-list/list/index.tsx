import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import type { FetchBoardsQuery } from "@/commons/graphql/graphql";
import type { Dispatch, MouseEvent, SetStateAction } from "react";

interface IBoardsListProps {
  data: FetchBoardsQuery | undefined;
  handleDelete: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
  isHovered: number | null;
  setIsHovered: Dispatch<SetStateAction<number | null>>;
  keyword: string;
}

export default function BoardsList({
  data,
  handleDelete,
  isHovered,
  setIsHovered,
  keyword,
}: IBoardsListProps) {
  return (
    <div className="flex justify-center pd-10 w-full">
      <div className={styles.총상자}>
        <div className={styles.게시글전체상자}>
          <div className={styles.게시글목록나누기}>
            <span className={styles.번호}>번호</span>
            <span className={styles.제목}>제목</span>
            <span className={styles.작날}>작성자</span>
            <span className={styles.작날}>날짜</span>
          </div>
          <div className={styles.등록된게시글상자}>
            {data?.fetchBoards.map((board, index) => (
              <Link key={board._id} href={`/boards/${board._id}`}>
                <div
                  className={styles.게시글한줄상자}
                  onMouseEnter={() => setIsHovered(index)} //마우스 올렸을 때
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <span className={`${styles.번호} ${styles.유저번호}`}>
                    {String(index + 1).padStart(3, "0")}
                  </span>
                  <span className={`${styles.제목} ${styles.유저제목}`}>
                    {board.title
                      .replace(keyword, `@#$%${keyword}@#$%`)
                      .split("@#$%")
                      .map((el, index) => (
                        <span
                          key={`${el}_${index}`}
                          style={{ color: el === keyword ? "red" : "black" }}
                        >
                          {el}
                        </span>
                      ))}
                  </span>
                  <span className={`${styles.작날} ${styles.유저작성자}`}>
                    {board.writer}
                  </span>
                  <span className={`${styles.작날} ${styles.유저날짜}`}>
                    {new Date(board.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\.$/, "")}
                  </span>
                  {/* hover된 인덱스와 현재 인덱스가 같을 때만 삭제 버튼 보여줌 */}
                  {isHovered === index && (
                    <button
                      id={board._id}
                      className={styles.게시글삭제버튼}
                      onClick={handleDelete}
                    >
                      <Image
                        src="/images/icons/delete.svg"
                        alt="Delete"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
