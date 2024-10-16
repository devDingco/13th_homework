"use client";

import styles from "./index.module.scss";
import { useEffect, useState } from "react";

interface YouTubeBoxProps {
  videoUrl: string;
}

const YoutubeBox: React.FC<YouTubeBoxProps> = ({ videoUrl }) => {
  const videoUrlSet =
    videoUrl.includes(".be/") || videoUrl.includes("watch?v=")
      ? `https://www.youtube-nocookie.com/embed/${
          videoUrl.split(".be/")[1] + "&autoplay=1&mute=1" ||
          videoUrl.split("watch?v=")[1] + "&autoplay=1&mute=1"
        }`
      : videoUrl;
  // console.log(videoUrlSet);

  return (
    <div className={styles.videoWrapper}>
      <iframe
        title="YouTube video player"
        src={videoUrlSet}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeBox;
