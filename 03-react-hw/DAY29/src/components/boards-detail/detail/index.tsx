import Image from "next/image";
import styles from "./styles.module.css";
import useBoardsDetailForm from "./hook";

import { FavoriteBorder, ThumbDownOutlined } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import UserProfile from "@/components/UserProfile";
import YouTube, { type YouTubeProps } from "react-youtube";

const STORAGE_URL = "https://storage.googleapis.com";

export default function BoardsDetailForm() {
  const { data, handlePage } = useBoardsDetailForm();

  // 유튜브: react-youtube 설치
  const opts: YouTubeProps["opts"] = {
    height: "464",
    width: "822",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // 자동 재생하도록 설정
      controls: 1, // 플레이어 컨트롤 표시
      modestbranding: 1, // 모드 Branding 표시
      rel: 0, // 관련 비디오 표시 안 함
      playsinline: 1, // 인라인 재생 지원
    },
  };

  console.log("사진: ", data?.fetchBoard.images?.[1]);
  return (
    <div className={styles.게시물상세화면상자}>
      {/* 게시글 제목부분 */}
      <div className={styles.게시물타이틀상자}>
        <p>{data?.fetchBoard.title}</p>
        <div className={styles.작성자등록일자담는상자}>
          <UserProfile writer={data?.fetchBoard.writer || ""} />
          <span>
            {new Date(data?.fetchBoard.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <hr />
      <div>
        {/* 링크복사, 위치 아이콘 표시 */}
        <div className={styles.아이콘상자}>
          <Image
            src="/images/icons/Link Icon Weight 300.svg"
            alt="링크복사아이콘"
            width={24}
            height={24}
          />
          <Image
            src="/images/icons/location_on_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24.svg"
            alt="위치아이콘"
            width={24}
            height={24}
          />
        </div>
        {/* 게시글 사진, 내용, 동영상, 좋아요싫어요 버튼 상자 */}
        <div className={styles.게시글총내용상자}>
          {/* 사진 */}
          <div>
            {data?.fetchBoard.images
              ?.filter((image) => image) // 빈 문자열 필터링
              .map((image, index) => (
                <Image
                  key={index}
                  src={`${STORAGE_URL}/${image}`}
                  alt={`게시글 이미지 ${index + 1}`}
                  width={500}
                  height={300}
                  style={{ objectFit: "cover" }}
                />
              ))}
          </div>
          {/* 게시글 내용 */}
          <pre>{data?.fetchBoard.contents}</pre>
          {/* 게시글 동영상 */}

          {data?.fetchBoard.youtubeUrl && (
            <div className={styles.동영상배경상자}>
              <YouTube
                videoId={
                  data?.fetchBoard.youtubeUrl
                    .split("youtu.be/")[1]
                    ?.split("?")[0]
                }
                opts={opts}
              />
            </div>
          )}
          {/* 좋아요 싫어요 상자 */}
          <div className={styles.좋싫상자}>
            {/* 싫어요 상자 */}
            <div>
              <ThumbDownOutlined sx={{ fontSize: 24 }} color="disabled" />
              <span>24</span>
            </div>
            {/* 좋아요 상자 */}
            <div className={styles.좋아요상자}>
              <FavoriteBorder sx={{ fontSize: 24, color: pink[500] }} />
              <span>12</span>
            </div>
          </div>
          {/* 목록, 수정하기 버튼 상자 */}
          <div className={styles.목록수정버튼상자}>
            <button onClick={handlePage} id="boardListPage">
              <Image
                src="/images/icons/Left icon.svg"
                alt="목록버튼"
                width={24}
                height={24}
              />
              목록으로
            </button>
            <button onClick={handlePage}>
              <Image
                src="/images/icons/Left icon (1).svg"
                alt="수정하기버튼"
                width={24}
                height={24}
              />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
