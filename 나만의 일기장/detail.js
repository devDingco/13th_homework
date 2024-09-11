const urlParams = new URLSearchParams(window.location.search);
const diaryIndex = urlParams.get('number');

const prev = () => {
  window.history.back();
};

const renderDiaryDetail = (diary) => {
  const diaryDetail = document.getElementById('diaryDetail');
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
      feelImg = '';
  }

  console.log(diary.date);
  diaryDetail.innerHTML = `
    <div class="detailTitle">${diary.title}</div>
    <div class="detailInfo">
      <div class="feels">
        <img src="${feelImg}" />
        <p class="feeling" style="color: ${feelColor}">${diary.todayFeeling}</p>
      </div>
      <div class="date">${diary.date} 작성</div>
    </div>
    <h4>내용</h4>
    <div class="detailContent">${diary.content}</div>
    <div id = "clipContainer"><button id = "clipboard" onclick = "clipboard()"><img class = "copyImg" src = "./images/copy_icon.png"/>내용 복사</button></div>
    <div class="firstBtn">
      <button class="prevBtn btn" onclick="prev()">이전</button>
      <button class="changeBtn btn" onclick="editDiary()">수정</button>
      <button class ="deleteBtn btn" onclick="openModal('delete')">삭제</button>
    </div>
   <hr />
    <div class="commentsSection">
      <div class = "subInfo">회고</div>
      <div class = "commentContainer">
        <input type="text" id="commentInput" placeholder="회고를 남겨주세요" />
        <button id="addCommentBtn">입력</button>
      </div>
      <ul id="commentList"></ul>
    </div>
    
  `;

  document
    .getElementById('addCommentBtn')
    .addEventListener('click', addComment);

  // 페이지 진입 시 댓글 위치로 스크롤
  const commentsSection = document.querySelector('.commentsSection');
  commentsSection.scrollIntoView({ behavior: 'smooth' });

  renderComments();
};

//toast

const toastMsg = document.createElement('div');
toastMsg.className = 'toastMessage';
document.body.appendChild(toastMsg);

function toastOn() {
  toastMsg.classList.add('active');
  setTimeout(function () {
    toastMsg.classList.remove('active');
  }, 1300);
}

//클립보드 복사
const clipboard = () => {
  const copyContent = document.querySelector('.detailContent').innerText;
  navigator.clipboard.writeText(copyContent);
};

window.onload = () => {
  const copy = document.getElementById('clipboard');
  if (copy) {
    copy.addEventListener('click', function () {
      toastMsg.innerText = '내용 복사';
      // console.log('toast 제대로');
      toastOn();
    });
  }
};

const deleteFunc = () => {
  const diaryList = JSON.parse(localStorage.getItem('diaries')) || [];
  diaryList.splice(diaryIndex, 1); //해당 일기 삭제
  localStorage.setItem('diaries', JSON.stringify(diaryList));

  toastMsg.innerText = '삭제 완료';
  closeModal('delete');
  toastOn();
  setTimeout(() => {
    window.location.href = `./myDiary.html`;
  }, 1200);
};

const editDiary = () => {
  const diaryList = JSON.parse(localStorage.getItem('diaries')) || [];
  const diary = diaryList[diaryIndex];

  const diaryDetail = document.getElementById('diaryDetail');

  diaryDetail.innerHTML = `
  <div id="addContent">
    <p class="subTitle">오늘 기분은 어땠나요?</p>
    <div class="feelingBtn">
      <label for="happyBtn">
        <input type="radio" name="feelingBtn" id="happyBtn" value="행복해요" ${
          diary.todayFeeling === '행복해요' ? 'checked' : ''
        }/> 행복해요
      </label>
      <label for="sadBtn">
        <input type="radio" name="feelingBtn" id="sadBtn" value="슬퍼요" ${
          diary.todayFeeling === '슬퍼요' ? 'checked' : ''
        }/> 슬퍼요
      </label>
      <label for="surpriseBtn">
        <input type="radio" name="feelingBtn" id="surpriseBtn" value="놀랐어요" ${
          diary.todayFeeling === '놀랐어요' ? 'checked' : ''
        }/> 놀랐어요
      </label>
      <label for="madBtn">
        <input type="radio" name="feelingBtn" id="madBtn" value="화나요" ${
          diary.todayFeeling === '화나요' ? 'checked' : ''
        }/> 화나요
      </label>
      <label for="etcBtn">
        <input type="radio" name="feelingBtn" id="etcBtn" value="기타" ${
          diary.todayFeeling === '기타' ? 'checked' : ''
        }/> 기타
      </label>
    </div>
    <div class="titleContainer">
      <p>제목</p>
      <input type="text" id="titleContent" value="${diary.title}" />
    </div>
    <div class="contentContainer">
      <p>내용</p>
      <textarea rows="8" id="contentContainer">${diary.content}</textarea>
    </div>
    <div class="btns">
      <button class="cancel edit" onclick="cancelFunc()">취소</button>
      <button class="saveBtn edit" onclick="saveDiary()">수정하기</button>
    </div>
  `;
};

const cancelFunc = () => {
  window.location.href = `./detail.html?number=${diaryIndex}`;
};

const saveDiary = () => {
  const diaryList = JSON.parse(localStorage.getItem('diaries')) || [];
  const diary = diaryList[diaryIndex];

  const editedTitle = document.getElementById('titleContent').value;
  const editedContent = document.getElementById('contentContainer').value;
  const selectedFeeling = document.querySelector(
    'input[name="feelingBtn"]:checked'
  ).value;

  diary.title = editedTitle;
  diary.content = editedContent;
  diary.todayFeeling = selectedFeeling;

  localStorage.setItem('diaries', JSON.stringify(diaryList));

  alert('일기가 수정되었습니다.');
  renderDiaryDetail(diary);
  window.location.href = `./detail.html?number=${diaryIndex}`;
};

// 댓글 기능 추가
const addComment = () => {
  const commentInput = document.getElementById('commentInput');
  const commentText = commentInput.value.trim();

  if (commentText) {
    let commentList = JSON.parse(localStorage.getItem('comments')) || [];
    const todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
    const newComment = {
      diaryIndex,
      text: commentText,
      date: todayDate,
    };

    commentList.push(newComment);
    localStorage.setItem('comments', JSON.stringify(commentList));

    renderComments();
    commentInput.value = '';
  } else {
    alert('댓글을 입력하세요.');
  }
};

const renderComments = () => {
  const commentList = JSON.parse(localStorage.getItem('comments')) || [];
  const filteredComments = commentList.filter(
    (comment) => comment.diaryIndex === diaryIndex
  );

  const commentListElement = document.getElementById('commentList');
  commentListElement.innerHTML = '';

  filteredComments.forEach((comment) => {
    const commentItem = document.createElement('li');

    // comment.text와 commentDate의 색상을 다르게 설정
    commentItem.innerHTML = `
      <span style="color: black; font-size : 16px;">${comment.text}</span>
      <span style="color: gray; font-size : 16px;"> [${comment.date}]</span>
    `;

    commentListElement.prepend(commentItem);
  });
};

if (diaryIndex !== null) {
  const diaryList = JSON.parse(localStorage.getItem('diaries')) || [];
  const diary = diaryList[diaryIndex];

  if (diary) {
    renderDiaryDetail(diary);
  } else {
    alert('일기를 찾을 수 없습니다.');
  }
} else {
  alert('잘못된 접근입니다.');
}

const addPrevContent = () => {
  const diaryName = document.querySelector('#diaryName');
  const prevBtn = document.createElement('div');
  prevBtn.className = 'prevBack';

  if (window.innerWidth <= 1200) {
    diaryName.textContent = '';
    diaryName.appendChild(prevBtn);
    diaryName.innerHTML = `
    <div class = "prevBack">
      <div>
        <button onclick = "prev()"><</button>
      </div>
      <div>일기 상세</div>
    </div>
    `;
  } else {
    diaryName.textContent = '민정이의 다이어리';
  }
};

window.addEventListener('resize', addPrevContent);
window.addEventListener('DOMContentLoaded', addPrevContent);

const disappearBtn = () => {
  const float = document.querySelector('.floating-btn');

  if (window.scrollY === 0) {
    float.style.display = 'none';
  } else {
    float.style.display = 'block';
  }
};
window.addEventListener('scroll', disappearBtn);

// 모달열기
const openModal = (kind) => {
  // console.log('함수');
  document.getElementById(kind).style.display = 'block';

  document.body.style.overflow = 'hidden';
};

//모달 닫기
const closeModal = (kind) => {
  document.getElementById(kind).style.display = 'none';

  document.body.style.overflow = 'auto';
};
