"use client";
import useBoardList from "./hooks";
import styles from "./style.module.css";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

export default function BoardList({ data, refetch, currentPage }: any) {
  const router = useRouter();
  const { onClickDelete } = useBoardList();

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
    <div className="">
      <div className={styles.listContainer}>
        <div className={styles.list}>
          {data?.fetchBoards.map((el: any, index: any) => (
            <div key={el._id} onClick={() => router.push(`/boards/${el._id}`)}>
              <div className={styles.listOfWriing}>
                <div className={styles.box1}>
                  <div className={styles.dateContainer}>
                    <div className={styles.listNum}>
                      {(currentPage - 1) * 10 + (index + 1)}
                    </div>
                    <div className={styles.date}>
                      {formatDate(el.createdAt)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.titleContainer}>
                    <div className={styles.title} style={{ cursor: "pointer" }}>
                      {el.title} {el._id}
                    </div>
                    <Image
                      src="/image/add.png"
                      className={styles.trashIcon}
                      alt="휴지통"
                      width={24}
                      height={24}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDelete(e, refetch); // refetch 전달
                      }}
                      id={el._id}
                    />
                  </div>
                  <span className={styles.authorName}>
                    <br /> - {el.writer}
                  </span>
                </div>
                <div>
                  <div className={styles.titleContainer}>
                    <div className={styles.thumbnail}>
                      <Image
                        src="/image/sampleimg3.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="썸네일"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
