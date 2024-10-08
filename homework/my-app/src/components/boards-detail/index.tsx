'use client'
import React from 'react'
import styles from './style.module.css'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useBoardsDetail } from './hooks';
import { IBoardsDetailprops } from './types';





export default function BoardsDetail(props:IBoardsDetailprops) {
 const {listButton, editButton, data} = useBoardsDetail()


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
              <Image src='/image/sampleimg2.jpg' alt='풍경' width={0} height={0} sizes='100vw' className={styles.carouselImage} style={{borderRadius:"20px"}}/>
            </Carousel.Item>
            <Carousel.Item>
            <Image src='/image/sampleimg2.jpg' alt='풍경' width={0} height={0} sizes='100vw' className={styles.carouselImage} style={{borderRadius:"20px"}}/>
            </Carousel.Item>
            <Carousel.Item>
            <Image src='/image/sampleimg2.jpg' alt='풍경' width={0} height={0} sizes='100vw' className={styles.carouselImage} style={{borderRadius:"20px"}}/>
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
            <div className={styles.authorName}>{data?.fetchBoard.writer}</div>
            <div className={styles.date}>2024.11.11</div>
          </div>

          <div className={styles.titleContainer}> 
            <div className={styles.title}>{data?.fetchBoard.title}</div>
          </div>
        </div>

        <div className={styles.textContent}>
          {data?.fetchBoard.contents}
        </div>
      </div>
   </div>




   <div className={styles.videoConatiner}>
      <div className={styles.grayBox}>
        <Image src="/image/Frame.png" className={styles.profilebasic} alt="동영상썸네일" width={0} height={0} sizes='100vw'  />
      </div>
   </div>

   <div className={styles.buttonContainer}>
      <button className={styles.gotoListButton}  onClick={listButton}>
        <Image src="/image/list_icon.png" className={styles.buttonIcon} alt="동영상썸네일" width={0} height={0} sizes='100vw'  />
        목록으로
      </button>
      
      <button className={styles.gotoListButton} onClick={editButton}>
        <Image src="/image/edit_icon.png" className={styles.buttonIcon} alt="동영상썸네일" width={0} height={0} sizes='100vw'/>
        수정하기
      </button>
   </div>




   <div className={styles.commentContainer}>
      <div className={styles.title}>Add comment</div>
      <div className={styles.titil_sm}>Comment</div>
      <div className={styles.rating}>
        <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
        <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
        <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
        <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
        <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
      </div>
      <textarea className={styles.commentInput} placeholder='댓글을 입력해 주세요.'></textarea>
      <button className={styles.commentUpload}>댓글 등록</button>


      <div className={styles.noComments}>등록된 댓글이 없습니다.</div>

      <div className={styles.commentList}>
        <div className={styles.profileConatiner}>
          <Image src="/image/profile.png" className={styles.profilebasic} alt="프로필기본이미지" width={0} height={0} sizes='100vw'/>
          <div className={styles.authorName}>홍길동</div>
          <div className={styles.rating}>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
        </div>
        </div>
        <div>살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라. 얄리얄리 얄랑셩 얄라리 얄라</div>
        <div className={styles.date}>2024.11.11</div>
      </div>

      <div className={styles.commentList}>
        <div className={styles.profileConatiner}>
          <Image src="/image/profile.png" className={styles.profilebasic} alt="프로필기본이미지" width={0} height={0} sizes='100vw'/>
          <div className={styles.authorName}>홍길동</div>
          <div className={styles.rating}>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
        </div>
        </div>
        <div>살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라. 얄리얄리 얄랑셩 얄라리 얄라</div>
        <div className={styles.date}>2024.11.11</div>
      </div>

      <div className={styles.commentList}>
        <div className={styles.profileConatiner}>
          <Image src="/image/profile.png" className={styles.profilebasic} alt="프로필기본이미지" width={0} height={0} sizes='100vw'/>
          <div className={styles.authorName}>홍길동</div>
          <div className={styles.rating}>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
          <Image src='/image/star.png' width={24} height={24} sizes='100vw' alt='별점별이미지'/>
        </div>
        </div>
        <div>살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라. 얄리얄리 얄랑셩 얄라리 얄라</div>
        <div className={styles.date}>2024.11.11</div>
      </div>
   </div>
 


    

  </div>
  )
}
