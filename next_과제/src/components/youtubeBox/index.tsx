"use client";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const YoutubeBox = ({ videoUrl }: { videoUrl: string }) => {
  const [isWindow, setIsWindow] = useState<boolean>(false);

  useEffect(() => {
    setIsWindow(true);
  }, []);
  return (
    <div className={styles.videoWrapper}>
      {isWindow && (
        <ReactPlayer url={videoUrl} controls playing={true} muted={true} />
      )}
    </div>
  );
};
export default YoutubeBox;
