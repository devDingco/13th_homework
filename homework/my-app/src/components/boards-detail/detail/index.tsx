"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./style.module.css";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useBoardsDetail } from "./hooks";
import { IBoardsDetailprops } from "./types";
import { FrownTwoTone, HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Flex,
  Segmented,
  Tooltip,
  TooltipProps,
} from "antd";
import ReactPlayer from "react-player";

export default function BoardsDetail(props: IBoardsDetailprops) {
  const { listButton, editButton, data } = useBoardsDetail();

  const App: React.FC = () => <HeartOutlined twoToneColor="#eb2f96" />;

  const [arrow, setArrow] = useState<"Show" | "Hide" | "Center">("Show");
  const mergedArrow = useMemo<TooltipProps["arrow"]>(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <div className={styles.container}>
      <div className={styles.bigTitleContainer}>
        <div className={styles.bigTitle}>TRIP BLOG</div>
        <div className={styles.subBigTitle}>여행 경험을 나누어보세요.</div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.grid1}>
          <div className={styles.imgContainer}>
            <Carousel>
              <Carousel.Item>
                <Image
                  src="/image/sampleimg2.jpg"
                  alt="풍경"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={styles.carouselImage}
                  style={{ borderRadius: "20px" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/image/sampleimg2.jpg"
                  alt="풍경"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={styles.carouselImage}
                  style={{ borderRadius: "20px" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/image/sampleimg2.jpg"
                  alt="풍경"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={styles.carouselImage}
                  style={{ borderRadius: "20px" }}
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className={styles.iconContainer}>
            <div className={styles.locationContainer}>
              <div>
                <Tooltip
                  placement="bottomLeft"
                  title={`${data?.fetchBoard.boardAddress?.zipcode} ${data?.fetchBoard.boardAddress?.address} ${data?.fetchBoard.boardAddress?.addressDetail}`}
                  arrow={mergedArrow}
                >
                  <Image
                    src="/image/location.png"
                    alt="주소아이콘"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </Tooltip>
              </div>
              <div>
                <Image
                  src="/image/link.png"
                  alt="주소아이콘"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>

            <div className={styles.goodBadContainer}>
              <div className={styles.good}>
                <FrownTwoTone />
                <div>24</div>
              </div>

              <div className={styles.bad}>
                <HeartTwoTone twoToneColor="#eb2f96" />
                <div>30</div>
              </div>
            </div>
          </div>

          <div className={styles.addressContainer}>
            <div className={styles.address}></div>
          </div>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.aboutContent}>
            <div className={styles.authorDateContainer}>
              <div className={styles.authorName}>{data?.fetchBoard.writer}</div>
              <div className={styles.date}>2024.11.11</div>
            </div>

            <div className={styles.titleContainer}>
              <div className={styles.title}>{data?.fetchBoard.title}</div>
            </div>
          </div>

          <div className={styles.textContent}>{data?.fetchBoard.contents}</div>
        </div>
      </div>

      <div className={styles.videoConatiner}>
        <div className={styles.grayBox}>
          {data?.fetchBoard.youtubeUrl ? (
            <ReactPlayer
              url={data.fetchBoard.youtubeUrl}
              playing={true}
              muted={true}
              controls={true}
              loop={true}
              width={"100%"}
              height={"100%"}
            />
          ) : (
            <div
              style={{
                width: "822px",
                height: "464px",
                backgroundColor: "#f0f0f0",
              }}
            >
              {/* YouTube URL이 없을 때 대체로 보여줄 내용 */}
              <p>비디오가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.gotoListButton} onClick={listButton}>
          <Image
            src="/image/list_icon.png"
            className={styles.buttonIcon}
            alt="동영상썸네일"
            width={0}
            height={0}
            sizes="100vw"
          />
          목록으로
        </button>

        <button className={styles.gotoListButton} onClick={editButton}>
          <Image
            src="/image/edit_icon.png"
            className={styles.buttonIcon}
            alt="동영상썸네일"
            width={0}
            height={0}
            sizes="100vw"
          />
          수정하기
        </button>
      </div>
    </div>
  );
}
