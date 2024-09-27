"use client";

import Image from "next/image";
import styles from "./styles.module.css";

const BoardsDetail = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.head}>
        <div className={styles.contentTitle}>
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
          쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
        </div>{" "}
        <div className={styles.createInfo}>
          {" "}
          <div className={styles.writerName}>
            <Image
              src="/icon/profile_img.png"
              className={styles.profileImg}
              alt="프로필 이미지"
              width={0}
              height={0}
              sizes="100vw"
            />
            <span id={styles.whoWrite}>홍길동</span>
          </div>
          <div className={styles.writeDate}>2024.11.11</div>
        </div>
        <div className={styles.shareImg}>
          {" "}
          <Image
            src="/icon/link_icon_24.png"
            className={styles.shareicon}
            alt="링크 아이콘"
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            src="/icon/location_24.png"
            className={styles.shareicon}
            alt="위치 아이콘"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>

      <div className={styles.contentBox}>
        {" "}
        <Image
          src="/images/content_img.png"
          className={styles.contentImg}
          alt="내용 이미지"
          width={0}
          height={0}
          sizes="100vw"
        />
        <span id={styles.contentsPoem}>
          살겠노라 살겠노라. 청산에 살겠노라.
          <br />
          머루랑 다래를 먹고 청산에 살겠노라.
          <br />
          얄리얄리 얄랑셩 얄라리 얄라
          <br />
          <br />
          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          <br />
          너보다 시름 많은 나도 자고 일어나 우노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
          <br />
          이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          이럭저럭 하여 낮일랑 지내 왔건만
          <br />
          올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          어디다 던지는 돌인가 누구를 맞히려던 돌인가.
          <br />
          미워할 이도 사랑할 이도 없이 맞아서 우노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          살겠노라 살겠노라. 바다에 살겠노라.
          <br />
          나문재, 굴, 조개를 먹고 바다에 살겠노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
          <br />
          사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          가다 보니 배불룩한 술독에 독한 술을 빚는구나.
          <br />
          조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
        </span>
      </div>

      <div className={styles.previewBox}>
        {" "}
        <Image
          src="/images/video.png"
          className={styles.previewImg}
          alt="동영상 미리보기"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>

      <div className={styles.evaluate}>
        {" "}
        <div className={styles.hate}>
          <button className={styles.hateButton}></button>
          <span className={styles.hateNum}>24</span>
        </div>
        <div className={styles.like}>
          <button className={styles.likeButton}></button>
          <span className={styles.likeNum}>12</span>
        </div>
      </div>

      <div className={styles.toButtons}>
        {" "}
        <button className={styles.toList}>목록으로</button>
        <button className={styles.edit}>수정하기</button>
      </div>
    </div>
  );
};

export default BoardsDetail;
