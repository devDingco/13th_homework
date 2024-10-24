import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

function Example() {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // 모든 이벤트 핸들러에서 플레이어에 접근할 수 있습니다.
    event.target.pauseVideo(); // 비디오 시작 시 정지합니다.
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1, // 자동 재생하도록 설정
      controls: 1, // 플레이어 컨트롤 표시
      modestbranding: 1, // 모드 Branding 표시
      rel: 0, // 관련 비디오 표시 안 함
      playsinline: 1, // 인라인 재생 지원
    },
  };

  return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} />;
}
