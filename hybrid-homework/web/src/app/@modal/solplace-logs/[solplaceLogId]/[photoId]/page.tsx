"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";

const images = [
  "/images/default1.jpeg",
  "/images/default2.jpeg",
  "/images/default3.jpeg",
  "/images/default4.jpeg",
];

export default function FullscreenModal() {
  const params = useParams();
  const photoId = Number(params.photoId);

  return (
    <div className={styles.fullscreen}>
      <Image
        className={styles.image}
        src={images[photoId]}
        width={0}
        height={0}
        sizes="100vw"
        alt="사진전체화면"
      />
    </div>
  );
}
