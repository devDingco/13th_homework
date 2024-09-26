"use client";
import React from "react";
import styles from './styles.module.css';
import Image from "next/image";

const BoardsDetailPage = () => {
  return (
    <div className={styles.detailAllContainer}>
      <div className={styles.detailContainer}>
        <div className={styles.detailTitleArea}>
          <div className={styles.detailTitle}>
            살어리 살어리라사 청산에 살어리라사멀위랑 도래랑 먹고 청산에 살어리랏다얄리얄리 얄랑셩 얄라리얄라라라얄랑셩
            얄라리얄라라라
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.nick}>
            <div className={styles.profileImg}>
              <Image src="/images/profile.png" alt="profile" width={0} height={0} sizes="100vw" />
            </div>
            <p>홍길동</p>
          </div>
          <div className={styles.date}>2024.11.11</div>
        </div>
        <div className={styles.shareArea}>
          <div className={styles.shareImg}>
            <Image src="/images/clip.png" alt="clip" width={0} height={0} sizes="100vw" />
            <Image src="/images/place.png" alt="place" width={0} height={0} sizes="100vw" />
          </div>
        </div>
        <div className={styles.detailContentArea}>
          <Image src="/images/example.png" alt="ex" className={styles.contentImg} width={0} height={0} sizes="100vw" />
          <div className={styles.detailContent}>
            <p>살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라. 얄리얄리 얄랑셩 얄라리 얄라 </p>
            <p>
              우는구나 우는구나 새야. 자고 일어나 우는구나 새야. 너보다 시름 많은 나도 자고 일어나 우노라. 얄리얄리
              얄라셩 얄라리 얄라
            </p>
            <p>
              갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 이끼 묻은 쟁기를 가지고 물 아래 갈던 밭
              보았느냐. 얄리얄리 얄라셩 얄라리 얄라
            </p>
            <p>
              이럭저럭 하여 낮일랑 지내 왔건만 올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가. 얄리얄리 얄라셩 얄라리
              얄라
            </p>
            <p>
              어디다 던지는 돌인가 누구를 맞히려던 돌인가. 미워할 이도 사랑할 이도 없이 맞아서 우노라. 얄리얄리 얄라셩
              얄라리 얄라
            </p>
            <p>
              살겠노라 살겠노라. 바다에 살겠노라. 나문재, 굴, 조개를 먹고 바다에 살겠노라. 얄리얄리 얄라셩 얄라리 얄라
            </p>
            <p>
              가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. 사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을
              듣노라. 얄리얄리 얄라셩 얄라리 얄라
            </p>
            <p>
              가다 보니 배불룩한 술독에 독한 술을 빚는구나. 조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌
              하리이까.[1] 얄리얄리 얄라셩 얄라리 얄라
            </p>
          </div>
          <div className={styles.videoArea}>
            <Image className={styles.videoImg} src="/images/video.png" alt="video" width={0} height={0} sizes="100vw" />
          </div>
          <div className={styles.heartArea}>
            <div className={styles.brokenHeart}>
              <Image
                className={styles.heargImg}
                src="/images/broken-heart.png"
                alt="brokenheart"
                width={0}
                height={0}
                sizes="100vw"
              />
              <p>24</p>
            </div>
            <div className={styles.redHeart}>
              <Image
                className={styles.heargImg}
                src="/images/red-heart.png"
                alt="redheart"
                width={0}
                height={0}
                sizes="100vw"
              />
              <p>12</p>
            </div>
          </div>
          <div className={styles.detailBtnArea}>
            <button>
              <Image src="/images/list.png" alt="list" width={0} height={0} sizes="100vw" />
              목록으로
            </button>
            <button>
              <Image src="/images/edit.png" alt="edit" width={0} height={0} sizes="100vw" />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetailPage;
