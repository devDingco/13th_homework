// 컴포넌트
"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import UseBoardsDetail from "./hooks";

export default function BoardsDetailUI() {
  const { params, data } = UseBoardsDetail();
  return (
    <main className={styles.containerWrap}>
      <header className={styles.headerTitle}>
        <span>{data?.fetchBoard?.title}</span>
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
              <span>{data?.fetchBoard?.writer}</span>
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
        <div className={styles.contentWriting}>
          {data?.fetchBoard?.contents}
        </div>
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
        <Link href={`/boards/${params.boardId}/edit`}>
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
        </Link>
      </section>
    </main>
  );
}
