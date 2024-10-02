// import { useState } from "react";

"use client";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";

const FETCH_BOARD = gql`
  query fetchBoard($myid: ID!) {
    fetchBoard(boardId: $myid) {
      writer
      title
      contents
    }
  }
`;

const BoardDetail = () => {
  const param = useParams();
  console.log(param);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      myid: param.boardId,
    },
    // param._id가 아니라 param.boardId인 이유는 다이나믹페이지 이동 할때 uri주소에 id를 상세페이지에서는 boardId(변수)로 받겠다고해서이다
    // param.boardId -> 애가 타입이 다르면 자동변환되지 않고 null로 들어간다 그래서 fetch오류가 자꾸 뜬다
  });

  console.log(data);
  console.log(param.boardId);

  return (
    <main className={styles.containerWap}>
      <header className={styles.headerTitle}>
        <span>{data?.fetchBoard.title}</span>
      </header>
      <section className={styles.sectionDiv}>
        <div className={styles.contentWriterDiv}>
          <div className={styles.WriterDiv}>
            <div>
              <Image
                src="/img/profile.png"
                alt="profile"
                width={24}
                height={24}
                sizes="100vw"
              />
              <span>{data?.fetchBoard.writer}</span>
            </div>
            <span>2024.11.11</span>
          </div>
          <hr />
          <div className={styles.WriterImg}>
            <div>
              <Image
                src="/img/link.png"
                alt="link"
                width={19}
                height={10}
                sizes="100vw"
              />
              {/* <img src="/location." /> */}
              {/* <img src="/img/location." /> */}
              <Image
                src="/img/location.png"
                alt="location"
                width={15}
                height={18}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
        <div className={styles.contentImg}>
          <div>
            <Image
              src="/img/Tranquil Beachside Serenity.png"
              alt="image"
              width={400}
              height={531}
              sizes="100vw"
            />
          </div>
        </div>
        <div className={styles.contentWriting}>{data?.fetchBoard.contents}</div>
      </section>
      <section className={styles.sectionDiv}>
        <Image
          src="/img/Frame.png"
          alt="frame"
          width={822}
          height={464}
          sizes="100vw"
        />
      </section>
      <section className={styles.sectionDiv}>
        <div className={styles.goodBadBtn}>
          <Image
            src="/img/bad.png"
            alt="bad"
            width={24}
            height={24}
            sizes="100vw"
          />
          <span>24</span>
        </div>
        <div className={styles.goodBadBtn}>
          <Image
            src="/img/good.png"
            alt="good"
            width={24}
            height={24}
            sizes="100vw"
          />
          <span>24</span>
        </div>
      </section>
      <section className={styles.sectionDiv}>
        <button>
          <Image
            src="/img/left_icon.png"
            alt="icon"
            width={24}
            height={24}
            sizes="100vw"
          />
          목록으로
        </button>
        <button>
          <Image
            src="/img/left_icon2.png"
            alt="icon"
            width={24}
            height={24}
            sizes="100vw"
          />
          수정하기
        </button>
      </section>
    </main>
  );
};

export default BoardDetail;
