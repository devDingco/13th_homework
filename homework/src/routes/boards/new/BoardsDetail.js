import React from 'react'
import './BoardsDetail.css'
import Carousel from 'react-bootstrap/Carousel';

const BoardsDetail = () => {
  return (
  <div className="container">

    <div className='bigTitleContainer'>
      <div className='bigTitle'>TRIP BLOG</div>
      <div className='subBigTitle'>여행 경험을 나누어보세요.</div>
    </div>

    <div className='aboutContent'>
      <img src='/image/profile.png'/>
      <div className='authorName'>홍길동</div>
      <div className='date'>2024.11.11</div>
    </div>

    <div className="titleContainer">
        <div className="title">Post title1 </div>
    </div>

    <div className='contentContainer'>
      <div className='grid1'>
        <div className='imgContainer'>
          <Carousel>
            <Carousel.Item>
              <img src='/image/sampleimg2.jpg' text="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src='/image/sampleimg2.jpg' text="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src='/image/sampleimg2.jpg' text="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='textContainer'>
          <div className='textContent'>
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

            살겠노라 살겠노라. 바다에 살겠노라.
            나문재, 굴, 조개를 먹고 바다에 살겠노라.
            얄리얄리 얄라셩 얄라리 얄라 <br/>

            가다가 가다가 듣노라. 에정지 가다가 듣노라.
            사슴이 솟대에 올라서 해금을 켜는 것을 듣노라.
            얄리얄리 얄라셩 얄라리 얄라

            가다 보니 배불룩한 술독에 독한 술을 빚는구나.
            조롱박꽃 모양 누룩이 매워 붙잡으니 내 어찌 하리이까.
            얄리얄리 얄라셩 얄라리 얄라

          </div>
        </div>

        <div className='videoContainer'>

        </div>
      </div>
  </div>


    

  </div>
  )
}

export default BoardsDetail
