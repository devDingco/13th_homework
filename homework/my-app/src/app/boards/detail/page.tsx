'use client'
import React from 'react'
import styles from './style.module.css'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const BoardsDetail = () => {
  return (
  <div className={styles.container}>

    <div className={styles.bigTitleContainer}>
      <div className={styles.bigTitle}>TRIP BLOG</div>
      <div className={styles.subBigTitle}>여행 경험을 나누어보세요.</div>
    </div>

    <div className={styles.contentContainer}>
      <div className={styles.grid1}>
        <div className={styles.imgContainer}>
          <Carousel>
            <Carousel.Item>
              <Image src='/image/sampleimg2.jpg' alt='풍경' width={0} height={0} sizes='100vw' className={styles.carouselImage}/>
            </Carousel.Item>
            <Carousel.Item>
            <Image src='/image/sampleimg2.jpg' alt='풍경' width={0} height={0} sizes='100vw' className={styles.carouselImage}/>
            </Carousel.Item>
            <Carousel.Item>
            <Image src='/image/sampleimg2.jpg' alt='풍경' width={0} height={0} sizes='100vw' className={styles.carouselImage}/>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.locationContainer}>
            <div><Image src="/image/location.png" alt="주소아이콘" width={0} height={0} sizes='100vw' /></div>
            <div><Image src="/image/link.png" alt="주소아이콘" width={0} height={0} sizes='100vw' /></div>
          </div>

          <div className={styles.goodBadContainer}>
            <div className={styles.good}>
              <Image src='/image/bad.png' width={0} height={0} sizes='100vw' alt='깨진하트'/> 
              <div>24</div>
            </div>

            <div className={styles.bad}>
              <Image src='/image/good.png' width={0} height={0} sizes='100vw' alt='하트'/> 
              <div>30</div>
            </div>
          </div>
        </div>

        <div className={styles.addressContainer}>
          <div className={styles.address}>서울특별시 강남구 신논현로 111-6</div>
        </div>
        
        
      </div>
      
      <div className={styles.textContainer}>
        <div className={styles.aboutContent}>
          <div className={styles.authorDateContainer}>
          <Image src="/image/profile.png" className={styles.profilebasic} alt="프로필기본이미지" width={0} height={0} sizes='100vw'/>
            <div className={styles.authorName}>홍길동</div>
            <div className={styles.date}>2024.11.11</div>
          </div>

          <div className={styles.titleContainer}>
            <div className={styles.title}>Post title1 </div>
          </div>
        </div>

        <div className={styles.textContent}>
          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          너보다 시름 많은 나도 자고 일어나 우노라.
          얄리얄리 얄라셩 얄라리 얄라 <br/>

          갈던 밭 갈던 밭 보았느냐. 물 아래 갈던 밭 보았느냐
          이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
          얄리얄리 얄라셩 얄라리 얄라

          이럭저럭 하여 낮일랑 지내 왔건만
          올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
          얄리얄리 얄라셩 얄라리 얄라

          어디다 던지는 돌인가 누구를 맞히려던 돌인가.
          미워할 이도 사랑할 이도 없이 맞아서 우노라.
          얄리얄리 얄라셩 얄라리 얄라
          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          너보다 시름 많은 나도 자고 일어나 우노라.
          얄리얄리 얄라셩 얄라리 얄라 <br/>

          갈던 밭 갈던 밭 보았느냐. 물 아래 갈던 밭 보았느냐
          이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
          얄리얄리 얄라셩 얄라리 얄라

          이럭저럭 하여 낮일랑 지내 왔건만
          올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
          얄리얄리 얄라셩 얄라리 얄라

          어디다 던지는 돌인가 누구를 맞히려던 돌인가.
          미워할 이도 사랑할 이도 없이 맞아서 우노라.
          얄리얄리 얄라셩 얄라리 얄라
          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          너보다 시름 많은 나도 자고 일어나 우노라.
          얄리얄리 얄라셩 얄라리 얄라 <br/>

          갈던 밭 갈던 밭 보았느냐. 물 아래 갈던 밭 보았느냐
          이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
          얄리얄리 얄라셩 얄라리 얄라

          이럭저럭 하여 낮일랑 지내 왔건만
          올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
          얄리얄리 얄라셩 얄라리 얄라

          어디다 던지는 돌인가 누구를 맞히려던 돌인가.
          미워할 이도 사랑할 이도 없이 맞아서 우노라.
          얄리얄리 얄라셩 얄라리 얄라
          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          살겠노라 살겠노라. 청산에 살겠노라.
          머루랑 다래를 먹고 청산에 살겠노라.
          얄리얄리 얄랑셩 얄라리 얄라

          우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
        </div>
      </div>
   </div>




   <div className={styles.videoConatiner}>
      <div className={styles.grayBox}>
        <Image src="/image/Frame.png" className={styles.profilebasic} alt="동영상썸네일" width={0} height={0} sizes='100vw'  />
      </div>
   </div>

   <div className={styles.buttonContainer}>
      <button className={styles.gotoListButton}>
        <Image src="/image/list_icon.png" className={styles.buttonIcon} alt="동영상썸네일" width={0} height={0} sizes='100vw'  />
        목록으로
      </button>
      
      <button className={styles.gotoListButton}>
        <Image src="/image/edit_icon.png" className={styles.buttonIcon} alt="동영상썸네일" width={0} height={0} sizes='100vw'  />
        수정하기
      </button>
   </div>




   <div>
    <div className={styles.title}>Comment</div>
   </div>



    

  </div>
  )
}

export default BoardsDetail