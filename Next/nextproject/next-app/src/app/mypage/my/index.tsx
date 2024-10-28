import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
export default function My() {
  return (
    <>
      <div className={styles.css_mypage}>마이 페이지</div>
      <div className={styles.css_infobox}>
        내 정보
        <div className={styles.css_profile}>
          <Image
            src="/assets/Profile.png"
            alt="profile"
            width={40}
            height={40}
          />
          <div className={styles.css_name}>안상현</div>
        </div>
        <div className={styles.css_line}></div>
        <div className={styles.css_pointbox}>
          <Image src="/assets/Point.png" alt="point" width={18} height={17} />
          <div className={styles.css_youtpoint}>23000P</div>
        </div>
        <div className={styles.css_line}></div>
        <div className={styles.css_boxs}>
          <div className={styles.css_bookmark}>
            거래내역 & 북마크
            <Image
              src="/assets/Right.png"
              alt="right"
              width={8}
              height={15}
              sizes="100vw"
            />
          </div>
          <div className={styles.css_bookmark}>
            포인트 사용 내역
            <Image
              src="/assets/Right.png"
              alt="right"
              width={8}
              height={15}
              sizes="100vw"
            />
          </div>
          <div className={styles.css_bookmark}>
            비밀번호 변경
            <Image
              src="/assets/Right.png"
              alt="right"
              width={8}
              height={15}
              sizes="100vw"
            />
          </div>
        </div>
        <div className={styles.css_productbox}>
          <button className={styles.css_myproduct}>나의 상품</button>
          <button className={styles.css_mybookmark}>북마크</button>
          <div className={styles.css_searchbox}>
            <div className={styles.css_search}>
              <Image
                src="/assets/Search.png"
                alt="search"
                width={0}
                height={0}
                className={styles.css_searchimg}
              />
              <input
                type="text"
                placeholder="필요한 내용을 검색해 주세요."
                className={styles.css_searchinput}
              />
              <button className={styles.css_searchbtn}>검색</button>
            </div>
          </div>

          <div className={styles.css_listbox}>
            <div className={styles.css_listheader}>
              <div className={styles.css_num}>번호</div>
              <div className={styles.css_prdname}>상품 명</div>
              <div className={styles.css_price}>판매가격</div>
              <div className={styles.css_date}>날짜</div>
            </div>
            <div className={styles.css_list}>
              <div className={styles.css_mylist}>1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
