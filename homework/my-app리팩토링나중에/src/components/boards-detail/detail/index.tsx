// 컴포넌트
"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import useBoardsDetail from "./hooks";
import YouTube from "react-youtube";
import { Tooltip } from "antd";
import { relative } from "path";

export default function BoardsDetailUI() {
  const { params, data } = useBoardsDetail();
  // TODO: 유튜브 주소를 등록하지 않았을때 처리하기_ 주소에  = 두개 있는거뭐임

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
            <span>{data?.fetchBoard.createdAt.substring(0, 10)}</span>
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
              {/* TODO : Tooltip나중에 디자인하기 */}
              <div>
                <Tooltip
                  title={data?.fetchBoard.boardAddress?.address ?? "주소없음"}
                  placement="bottomRight"
                  color="white"
                  overlayInnerStyle={{
                    color: "black",
                  }}
                >
                  <Image
                    src="/img/location.png"
                    alt="location"
                    width={15}
                    height={18}
                    sizes="100vw"
                  />
                </Tooltip>
              </div>
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
        <YouTube
          videoId={data?.fetchBoard.youtubeUrl?.split("=")[1]}
          title="유튜브동영상"
          opts={{
            height: "409",
            width: "728",
            playerVars: {
              autoplay: 1, // 자동 재생
              controls: 1, // 재생 컨트롤 표시
              rel: 0, // 관련 동영상 표시하지 않기
            },
          }}
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
