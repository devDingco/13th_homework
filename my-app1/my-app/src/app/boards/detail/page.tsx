// import "../css/boardDetail.css"; // boardsDetail.css 파일 경로
import styles from "./styles.module.css";
import Image from "next/image";
// import { Link } from "react-router-dom";
import Link from "next/link";
// 게시물 상세 페이지

const BoardsDetail = () => {
  return (
    <>
      <main className={styles.boardDetail}>
        <Link href="/boards/new">BoardNew 페이지로 가는 기능</Link>
        <div className={styles.title}>
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고{" "}
        </div>

        <div className={styles.nameAndDate}>
          <div className={styles.name}>
            <Image
              src="/images/profile.png"
              alt="프로필아이콘"
              className={styles.profileIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
            <span>홍길동</span>
          </div>
          <div className={styles.date}>2024.11.11</div>
        </div>

        <hr className={styles.실선} />

        <div className={styles.shareAndLocation}>
          <Image
            src="/images/link.png"
            alt="링크아이콘"
            className={styles.linkIcon}
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            src="/images/location.png"
            alt="위치아이콘"
            className={styles.locationIcon}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <div className={styles.boardImage}>
          <Image
            src="/images/mainImage.png"
            alt="메인이미지"
            className={styles.mainImage}
            width={0}
            height={0}
            sizes="100vh"
          />
        </div>

        <div className={styles.boardText}>
          <p>
            살겠노라 살겠노라. 청산에 살겠노라. <br />
            머루랑 다래를 먹고 청산에 살겠노라. <br />
            얄리얄리 얄랑셩 얄라리 얄라 <br />
            <br />
            우는구나 우는구나 새야. 자고 일어나 우는구나 새야. <br />
            너보다 시름 많은 나도 자고 일어나 우노라. <br />
            얄리얄리 얄라셩 얄라리 얄라 <br />
            <br />
            갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
            <br />
            이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. <br />
            얄리얄리 얄라셩 얄라리 얄라 <br />
            <br />
            이럭저럭 하여 낮일랑 지내 왔건만 <br />올 이도 갈 이도 없는 밤일랑
            또 어찌 할 것인가.
            <br /> 얄리얄리 얄라셩 얄라리 얄라 <br />
            <br />
            어디다 던지는 돌인가 누구를 맞히려던 돌인가. <br />
            미워할 이도 사랑할 이도 없이 맞아서 우노라. <br />
            얄리얄리 얄라셩 얄라리 얄라 <br />
            살겠노라 살겠노라. 바다에 살겠노라. <br />
            나문재, 굴, 조개를 먹고 바다에 살겠노라. <br />
            얄리얄리 얄라셩 얄라리 얄라 <br />
            <br />
            가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. <br />
            사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라. <br />
            얄리얄리 얄라셩 얄라리 얄라 <br />
            <br />
            가다 보니 배불룩한 술독에 독한 술을 빚는구나. <br />
            조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까. [1]
            <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
        </div>

        <div className={styles.boardVideo}>
          <Image
            src="/images/mainVideo.png"
            alt="메인비디오"
            className={styles.mainVideo}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <div className={styles.goodAndBad}>
          <div className={styles.bad}>
            <Image
              src="/images/bad.png"
              alt="싫어요"
              className={styles.badIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
            <span>24</span>
          </div>
          <div className={styles.good}>
            <Image
              src="/images/good.png"
              alt="좋아요"
              className={styles.goodIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
            <span>12</span>
          </div>
        </div>

        <div className={styles.menuAndEdit}>
          <button className={styles.menu}>
            <Image
              src="/images/menu.png"
              alt="메뉴"
              className={styles.menuIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
            <span>목록으로</span>
          </button>
          <button className={styles.edit}>
            <Image
              src="/images/edit.png"
              alt="수정"
              className={styles.editIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
            <span>수정하기</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default BoardsDetail;
