"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Image from "next/image";

export default function LayoutNavigation() {
  const router = useRouter();
  const goToNewPage = (event: React.MouseEvent<HTMLDivElement>) => {
    // 클릭 이벤트가 상위로 전파되는 것을 막음
    event.stopPropagation();
    // 클릭 시 기본 동작을 방지
    event.preventDefault();

    // 페이지 이동
    router.push("/boards/new");
  };
  return (
    <div className={styles.navigation}>
      <div className={styles.logoContainer}>
        <Image
          src="/assets/ic_conversation.png"
          alt="conversation"
          width={20}
          height={20}
          className={styles.icon}
        />
        <span>TALKR</span>
      </div>
      <div className={styles.logoContainer}>
        <Image
          src="/assets/ic_list.png"
          alt="list_color"
          width={20}
          height={20}
          className={styles.icon}
        />
        <span>전체 글 보기</span>
      </div>
      <div className={styles.line}></div>
      <div className={styles.logoContainer} onClick={goToNewPage}>
        <Image
          src="/assets/ic_new-1.png"
          alt="새게시물 작성"
          width={20}
          height={20}
          className={styles.icon}
          style={{ pointerEvents: "none" }} // 이미지 클릭 방지
        />
        <span>새 글 작성</span>
      </div>
    </div>
  );
}
