"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { useBoardDetail } from "./hook";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import YouTube from "react-youtube";
const IMAGE_SRC = {
  profileImage: {
    src: require("@assets/profile_image.png"),
    alt: "프로필이미지",
  },
  linkImage: {
    src: require("@assets/link.png"),
    alt: "링크아이콘",
  },
  locationImage: {
    src: require("@assets/location.png"),
    alt: "위치아이콘",
  },
  cheongsanImage: {
    src: require("@assets/cheongsan.png"),
    alt: "청산사진",
  },
  neotubeImage: {
    src: require("@assets/neotube.png"),
    alt: "너튜브사진",
  },
  badImage: {
    src: require("@assets/bad.png"),
    alt: "싫어요",
  },
  goodImage: {
    src: require("@assets/good.png"),
    alt: "좋아요",
  },
  hamberger: {
    src: require("@assets/hamberger.png"),
    alt: "목록아이콘",
  },
  pencil: {
    src: require("@assets/pencil.png"),
    alt: "수정아이콘",
  },
} as const;

export default function BoardDetail() {
  const { data, goToEditPage } = useBoardDetail();
  console.log("주소 왜 바바뀌는데 ㅡㅡ ", data);
  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              />
              <div> {data?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {data?.fetchBoard?.createdAt}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image
              src={IMAGE_SRC.linkImage.src}
              alt={IMAGE_SRC.linkImage.alt}
            />
            <Tooltip title={data?.fetchBoard?.boardAddress?.address}>
              <Image
                src={IMAGE_SRC.locationImage.src}
                alt={IMAGE_SRC.locationImage.alt}
              />
            </Tooltip>
          </div>
          <div className={styles.detailContentContainer}>
            <Image
              src={IMAGE_SRC.cheongsanImage.src}
              alt={IMAGE_SRC.cheongsanImage.alt}
              className={styles.detailContentImage}
            />
            <div className={styles.detailContentText}>
              {data?.fetchBoard?.contents}
            </div>

            <YouTube
              videoId={
                data?.fetchBoard?.youtubeUrl?.split("=")[1] &&
                data?.fetchBoard?.youtubeUrl.split("=")[1]
              }
            />
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <DislikeOutlined />
                <div className={styles.detailBadText}>24</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <LikeOutlined style={{ color: "red" }} />

                <div className={styles.detailGoodText}>12</div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton}>
                <Image
                  src={IMAGE_SRC.hamberger.src}
                  alt={IMAGE_SRC.hamberger.alt}
                />

                <div>목록으로</div>
              </button>
              <button className={styles.detailButton} onClick={goToEditPage}>
                <Image src={IMAGE_SRC.pencil.src} alt={IMAGE_SRC.pencil.alt} />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
