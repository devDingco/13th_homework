"use client";

import styles from "./styles.module.css";

import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function PurchaseDetail() {
  return (
    <main className={styles.main}>
      <section className={styles.titleSection}>
        <span className={styles.title}>상품명이 들어가는 자리 입니다.</span>
        <div className={styles.icons}>
          <DeleteOutlined />
          <LinkIcon />
          <PlaceOutlinedIcon />
          <div className={styles.bookmarkIcon}>
            <BookmarkBorderOutlinedIcon />
            <span>26</span>
          </div>
        </div>
      </section>

      <span className={styles.summaryText}>
        한줄요약이 들어가는 자리 입니다.
      </span>
      <span className={styles.hashTagText}>
        # 태그 입력에서 입력한 값이 들어가는 자리 입니다.
      </span>

      {/* 타이틀 아래부분 ======================== */}

      <section className={styles.middleArea}>
        <div className={styles.showImage}>이미지 들어가는 곳</div>
        {/* 캐러샐 기능 넣어줘서 자동으로 1장씩 넘어가게 보완할 것 */}
        <div>
          <div className={styles.priceAndPurchaseSection}>
            <span className={styles.price}>상품의 가격이 들어가는 곳</span>
            <ul className={styles.list}>
              <li>이용권은 포인트 충전 후 구매하실 수 있습니다.</li>
              <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
            </ul>
            <button className={styles.purchaseBtn}>구매하기</button>
          </div>
          <div className={styles.sellerSection}>
            <span className={styles.sellerTitle}>판매자</span>
            <div className={styles.sellerName}>
              <UserOutlined />
              <span>파는사람이름</span>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.underLine}></div>
      <section>
        <span>상세설명</span>
        <p>
          상세설명에 해당하는 문장이 들어오는 곳입니다.상세설명에 해당하는
          문장이 들어오는 곳입니다.상세설명에 해당하는 문장이 들어오는
          곳입니다.상세설명에 해당하는 문장이 들어오는 곳입니다.
        </p>
      </section>
      <div className={styles.underLine}></div>
      <section>
        <span>상세위치</span>
        <div>위치지도가 나올 부분</div>
      </section>
      <section>
        <div>
          <ChatBubbleOutlineIcon />
          <span>문의하기</span>
        </div>
        {/* 내일 마무리 하기 */}
      </section>
    </main>
  );
}
