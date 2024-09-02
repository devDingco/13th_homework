const urlParams = new URLSearchParams(window.location.search);
const diaryIndex = urlParams.get('number');

const prev = () => {
  window.history.back();
};

if (diaryIndex !== null) {
  const diaryList = JSON.parse(localStorage.getItem('diaries')) || [];
  const diary = diaryList[diaryIndex];

  const miniTodayFeeling = {
    행복해요: './images/행복해요 (s).png',
    슬퍼요: './images/슬퍼요 (s).png',
    놀랐어요: './images/놀랐어요 (s).png',
    화나요: './images/화나요 (s).png',
    기타: './images/기타 (s).png',
  };

  let feelImg;
  let feelColor;
  switch (diary.todayFeeling) {
    case '행복해요':
      feelColor = '#EA5757';
      feelImg = miniTodayFeeling.행복해요;
      break;
    case '슬퍼요':
      feelColor = '#28B4E1';
      feelImg = miniTodayFeeling.슬퍼요;
      break;
    case '놀랐어요':
      feelColor = '#D59029';
      feelImg = miniTodayFeeling.놀랐어요;
      break;
    case '화나요':
      feelColor = '#777777';
      feelImg = miniTodayFeeling.화나요;
      break;
    case '기타':
      feelColor = '#A229ED';
      feelImg = miniTodayFeeling.기타;
      break;
    default:
      feelColor = 'black';
  }

  if (diary) {
    const diaryDetail = document.getElementById('diaryDetail');
    diaryDetail.innerHTML = `
          <div class = "detailTitle">${diary.title}</div>
          <div class = "detailInfo">
            <div class = "feels">
              <img src = "${feelImg}"/>
              <p class = "feeling" style="color: ${feelColor}">${diary.todayFeeling}</p>
            </div>
            <div class = "date">${diary.date} 작성</div>
          </div>
          <div class = "detailContent">${diary.content}</div>
          <div class = "btns">
            <button class="prevBtn" onclick="prev()">이전</button>
            <button class = "changeBtn">수정</button>
          </div>
        `;
  } else {
    alert('일기를 찾을 수 없습니다.');
  }
} else {
  alert('잘못된 접근입니다.');
}
