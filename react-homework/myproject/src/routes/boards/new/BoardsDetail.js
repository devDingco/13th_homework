import React, { useState } from 'react';

const BoardsDetail = () => {
  return (
    <div className='post-detail-page'>

      <div className='title'>이곳은 제목입니다.</div>

      <div className='info-box'>

        <div className='info-user-box'>
          <div className='info-user'>
            <img className='user-profile' src='/images/profile.png' />
            <div className='user-name'>작성자</div>
          </div>
          <div className='user-date'>2024.09.21</div>
        </div>

        <hr />

        <div className="link-location-btn-group">
          <button className='link-btn-box'><img src='/images/link.png' /></button>
          <button className='location-btn-box'><img src='/images/location.png' /></button>
        </div>
      </div>
      <div className='image-box'>
        <img src='/images/beach.png' />
      </div>
      <div className='content-box'>
        이곳에는 내용이 들어갑니다.
        이곳에는 내용이 들어갑니다.
        이곳에는 내용이 들어갑니다.
        이곳에는 내용이 들어갑니다.
      </div>
      <div className='video-box'>
        <img src='/images/video.png' />
      </div>
      <div className='reaction-btn-group'>
        <div className='bad-btn-group'>
          <button className='bad-btn'><img src='/images/bad.png' /></button>
          <div className='bad-count'>10</div>
        </div>
        <div className='good-btn-group'>
          <button className='good-btn'><img src='/images/good.png' /></button>
          <div className='good-count'>10</div>
        </div>
      </div>
      <div className='list-edit-btn-group'>
        <button className='list-btn'>
          <img src='/images/list.png' />
          목록으로
        </button>
        <button className='edit-btn'>
          <img src='/images/edit.png' />
          수정하기
        </button>
      </div>
    </div>
  )
}

export default BoardsDetail