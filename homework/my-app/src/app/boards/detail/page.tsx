// import { useState } from "react";

"use client";
import styles from "./styles.module.css";
import Image from "next/image";

const BoardDetail = () => {
  return (
    <main className={styles.containerWap}>
      <header className={styles.headerTitle}>
        <span>
          살어리 살어리랏다 청산애 살어리랏다멀위랑 도래랑 먹고 청산에
          살어리랏다얄ㄹ리얄리 얄라리얄라
        </span>
      </header>
      <section className={styles.sectionDiv}>
        <div className={styles.contentWriterDiv}>
          <div className={styles.WriterDiv}>
            <div>
              <Image
                src="/img/profile.png"
                alt="profile"
                width={24}
                height={24}
                sizes="100vw"
              />
              <span>홍길동</span>
            </div>
            <span>2024.11.11</span>
          </div>
          <hr />
          <div className={styles.WriterImg}>
            <div>
              <Image
                src="/img/link.png"
                alt="link"
                width={19}
                height={10}
                sizes="100vw"
              />
              {/* <img src="/location." /> */}
              {/* <img src="/img/location." /> */}
              <Image
                src="/img/location.png"
                alt="location"
                width={15}
                height={18}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
        <div className={styles.contentImg}>
          <div>
            <Image
              src="/img/Tranquil Beachside Serenity.png"
              alt="image"
              width={400}
              height={531}
              sizes="100vw"
            />
          </div>
        </div>
        <div className={styles.contentWriting}>
          제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이
          지명하는 자를 임명한다. 국회는 선전포고, 국군의 외국에의 파견 또는
          외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 모든
          국민은 직업선택의 자유를 가진다. 위원은 탄핵 또는 금고 이상의 형의
          선고에 의하지 아니하고는 파면되지 아니한다. 국무총리 또는 행정각부의
          장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령
          또는 부령을 발할 수 있다.
        </div>
      </section>
      <section className={styles.sectionDiv}>
        <Image
          src="/img/Frame.png"
          alt="frame"
          width={822}
          height={464}
          sizes="100vw"
        />
      </section>
      <section className={styles.sectionDiv}>
        <div className={styles.goodBadBtn}>
          <Image
            src="/img/bad.png"
            alt="bad"
            width={24}
            height={24}
            sizes="100vw"
          />
          <span>24</span>
        </div>
        <div className={styles.goodBadBtn}>
          <Image
            src="/img/good.png"
            alt="good"
            width={24}
            height={24}
            sizes="100vw"
          />
          <span>24</span>
        </div>
      </section>
      <section className={styles.sectionDiv}>
        <button>
          <Image
            src="/img/left_icon.png"
            alt="icon"
            width={24}
            height={24}
            sizes="100vw"
          />
          목록으로
        </button>
        <button>
          <Image
            src="/img/left_icon2.png"
            alt="icon"
            width={24}
            height={24}
            sizes="100vw"
          />
          수정하기
        </button>
      </section>
    </main>
  );
};

export default BoardDetail;
