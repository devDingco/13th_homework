"use client";

import React, { useState } from "react";
import styles from "@/components/product-detail/detail/styles.module.css";
import { Tooltip } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { FiShare, FiBookmark } from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper";
import { useProductDetail } from "./hook";

export default function ProductDetail() {
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const {
    onClickPurchase,
    isPurchase,
    onClickCancel,
    onClickBuy,
    setIsPurchase,
  } = useProductDetail();

  return (
    <div className={styles.saleLayout}>
      {isPurchase === true ? (
        <div>
          <div
            className={styles.modalBackground}
            onClick={() => setIsPurchase((prev) => !prev)}
          ></div>
          <div className={styles.checkPurchase}>
            해당 숙박권을 구매 하시겠어요?
            <span className={styles.purchaseNotice}>
              해당 숙박권은 포인트로만 구매 가능합니다.
            </span>
            <div className={styles.checkButtons}>
              <button className={styles.cancelButton} onClick={onClickCancel}>
                취소
              </button>
              <button className={styles.buyButton} onClick={onClickBuy}>
                구매
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.saleContainer}>
        <div className={styles.saleTitle}>
          <div className={styles.firstSection}>
            <span className={styles.titleText}>
              포항 : 숙박권 명이 여기에 들어갑니다
            </span>
            <div className={styles.components}>
              <FiShare className={styles.icon} />
              {/* <Tooltip
                placement="bottomRight"
                title={props.data?.fetchBoard.boardAddress?.address}
                arrow={mergedArrow}
              > */}
              <button className={styles.locationButton}>
                <IoLocationOutline className={styles.icon} />
              </button>
              {/* </Tooltip> */}
              <button className={styles.bookmark}>
                <FiBookmark className={styles.icon} />
                <p>24</p>
              </button>
            </div>
          </div>
          <span className={styles.subTitle}>
            모던한 분위기의 감도 높은 숙소
          </span>
          <span className={styles.hashtag}>
            #6인_이하 #건식_사우나 #애견동반_가능
          </span>
        </div>
        <div className={styles.purchaseSection}>
          <div className={styles.purchaseContainer}>
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className={styles.swiperLayout}
            >
              <SwiperSlide className={styles.swiperSlide}>
                <Image
                  src="/images/Beachfront.png"
                  alt="swiper image1"
                  width={640}
                  height={480}
                  style={{
                    width: "640px",
                    height: "480px",
                    borderRadius: "10px",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <Image
                  src="/images/Umbrellas.png"
                  alt="swiper image2"
                  width={640}
                  height={480}
                  style={{
                    width: "640px",
                    height: "480px",
                    borderRadius: "10px",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <Image
                  src="/images/Umbrellas.png"
                  alt="swiper image3"
                  width={640}
                  height={480}
                  style={{
                    width: "640px",
                    height: "480px",
                    borderRadius: "10px",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <Image
                  src="/images/Umbrellas.png"
                  alt="swiper image3"
                  width={640}
                  height={480}
                  style={{
                    width: "640px",
                    height: "480px",
                    borderRadius: "10px",
                  }}
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className={styles.swiperPreview}
            >
              <SwiperSlide className={styles.previewSwiperSlide}>
                <div className={styles.prevImg}>
                  <Image
                    src="/images/Beachfront.png"
                    alt="small img1"
                    width={180}
                    height={136}
                    style={{
                      width: "180px",
                      height: "136px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.previewSwiperSlide}>
                <div className={styles.prevImg}>
                  <Image
                    src="/images/Umbrellas.png"
                    alt="small img2"
                    width={180}
                    height={136}
                    style={{
                      width: "180px",
                      height: "136px",
                      borderRadius: "10px",
                      opacity: 0.8,
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.previewSwiperSlide}>
                <div className={styles.prevImg}>
                  <Image
                    src="/images/Umbrellas.png"
                    alt="small img2"
                    width={180}
                    height={136}
                    style={{
                      width: "180px",
                      height: "136px",
                      borderRadius: "10px",
                      opacity: 0.5,
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.previewSwiperSlide}>
                <div className={styles.prevImg}>
                  <Image
                    src="/images/Umbrellas.png"
                    alt="small img2"
                    width={180}
                    height={136}
                    style={{
                      width: "180px",
                      height: "136px",
                      borderRadius: "10px",
                      opacity: 0.3,
                    }}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.notice}>
            <div className={styles.purchaseInfo}>
              <div className={styles.infoSection}>
                <div className={styles.price}>32,500원</div>
                <ul className={styles.caution}>
                  <li>
                    숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                  </li>
                  <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
                </ul>
              </div>
              <button
                className={styles.purchaseButton}
                onClick={onClickPurchase}
              >
                구매하기
              </button>
            </div>
            <div className={styles.sellerInfo}>
              판매자
              <div className={styles.sellerName}>
                <Image
                  src="/icon/profile_img.png"
                  alt="판매자 프로필 사진"
                  width={40}
                  height={40}
                />
                김상훈
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.discription}>
          <span className={styles.detailTitle}>상세 설명</span>
          <div className={styles.contents}>
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고
            쳥산(靑山)애 살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라
            새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라
            리얄리 얄라셩 얄라리 얄라 가던 새 가던 새 본다 믈 아래 가던 새 본다
            잉무든 장글란 가지고 믈 아래 가던 새 본다 얄리얄리 얄라셩 얄라리
            얄라
            <br /> 이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌 오리도 가리도 업슨
            바므란 ᄯᅩ 엇디 호리라 얄리얄리 얄라셩 얄라리 얄라
            <br /> 어듸라 더디던 돌코 누리라 마치던 돌코 믜리도 괴리도 업시
            마자셔 우니노라 얄리얄리 얄라셩 얄라리 얄라
            <br /> 살어리 살어리랏다 바ᄅᆞ래 살어리랏다 ᄂᆞᄆᆞ자기 구조개랑 먹고
            바ᄅᆞ래 살어리랏다 얄리얄리 얄라셩 얄라리 얄라
            <br /> 가다가 가다가 드로라 에졍지 가다가 드로라 사ᄉᆞ미 지ᇝ대예
            올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라 얄리얄리 얄라셩 얄라리 얄라
            <br />
            가다니 ᄇᆡ브른 도긔 설진 강수를 비조라 조롱곳 누로기 ᄆᆡ와 잡ᄉᆞ와니
            내 엇디 ᄒᆞ리잇고 얄리얄리 얄라셩 얄라리 얄라
          </div>
        </div>
        <div className={styles.mapSections}>
          <span className={styles.locationText}>상세 위치</span>
          <div className={styles.map}>지도들어올자리..</div>
        </div>
      </div>
    </div>
  );
}
