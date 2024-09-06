// QueryString 에서 data 가져오기
const urlSearchParams = new URLSearchParams(location.search);
const paramsObj = Object.fromEntries(urlSearchParams.entries());
const { idx } = paramsObj;

// 일기 목록 가져오기
const diaryList = JSON.parse(localStorage.getItem('diaryList'));
console.log('🚀 ~ diaryList:', diaryList);
const el = diaryList[idx];
let { myTitle, myMood, createdAt, myContent, comments } = el;

window.onload = () => {
  initialRendering();
  renderReplyList();
  goToReplyListSmoothly();
};

const onClickCopy = () => {
  const text = document.getElementById('section-main').innerText;
  navigator.clipboard.writeText(text);
  alert('복사되었습니다!');
};

const initialRendering = () => {
  // 상세페이지에 data 그리기
  document.getElementById('title').innerText = myTitle;
  document.getElementById('date').innerHTML = createdAt + ' 작성';
  document.getElementById('section-main').innerText = myContent;
  // TODO: myMood에 맞는 img 필요함
  document.getElementById('mood').innerHTML = `
  <div id="mood-img">
    <img src="./asset/상세/행복해요.jpg" alt="">
  </div>
  <div class="mood-${myMood}">${myMood}</div>
`;
};

const goToReplyListSmoothly = () => {
  const target = document.getElementById('회고리스트');

  // 특정 요소의 위치를 가져오기
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;

  // 부드럽게 스크롤
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

const renderReplyList = () => {
  let tags = '';
  comments.map((el) => {
    tags += `
      <div class="회고인스턴스">
      ${el}
      <div class="회고작성일자">[${new Date().toLocaleDateString()}]</div>
      </div>
    `;
  });

  document.getElementById('회고리스트').innerHTML = tags;
};

// 댓글 입력시, 댓글 Arr에 저장하고, localStorage를 업데이트
const onClickInputButton = () => {
  let inputValue = document.getElementById('회고입력창').value;
  console.log('🚀 ~ onClickInputButton ~ inputValue:', inputValue);
  comments.push(inputValue);
  localStorage.setItem('dairyList', JSON.stringify(diaryList));
  // 회고리스트에 렌더링
  renderReplyList();
  // input창 초기화
  document.getElementById('회고입력창').value = '';
  console.log('🚀 ~ onClickInputButton ~ inputValue:', inputValue);
};

const renderMain = () => {
  // 원본 body 영역 리렌더링
  document.getElementById('main').innerHTML = `
      <div id="section-header">
        <div id="title"></div>
        <div id="mood-and-date">
          <div id="mood"></div>
          <div id="date"></div>
        </div>
      </div>
      <div id="section-body">
        <div class="section-title">내용</div>
        <div id="section-main"></div>
      </div>
      <div class="CSS_내용복사영역" onclick="onClickCopy()">
        <div id="CSS_내용복사아이콘">
          <img src="./asset/content_copy_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 1.jpg" alt="">
        </div>
        <div id="CSS_내용복사문구">
          <p>내용복사</p>
        </div>
      </div>
      <div id="section-footer">
        <div class="delete-btn-area">
          <button onclick="JS_모달열기기능('CSS_삭제확인모달그룹')" id="delete-btn">삭제</button>
        </div>
        <div class="modify-btn-area">
          <button onclick="onClickModifyButton()" id="modify-btn">수정</button>
        </div>
      </div>
      <div id="회고영역">
        <div id="회고영역_타이틀">회고</div>
        <div id="회고입력부">
          <input id="회고입력창" type="text" placeholder="회고를 남겨보세요.">
          <button id="회고입력창입력버튼" onclick="onClickInputButton()">입력</button>
        </div>
        <div id="회고리스트">
        </div>
      </div>
    </div>
  `;
};

const JS_모달열기기능 = (모달종류) => {
  document.getElementById(모달종류).style = 'display: block;';
};

const JS_모달닫기기능 = (모달종류) => {
  document.getElementById(모달종류).style = 'display: none;';
};

const onClickDeleteButton = () => {
  alert('삭제되었습니다.');
  diaryList.splice(idx, 1);
  localStorage.setItem('diaryList', JSON.stringify(diaryList));
  window.history.back();
};

const onClickCancelModifyButton = () => {
  // 원본 body 영역 리렌더링
  renderMain();
  initialRendering();
};

const onClickCompleteModifyButton = () => {
  // 수정완료 버튼 기울이기
  // document.getElementById('complete-modify-btn').classList.toggle('tilt');

  // data 값 변경
  if (!document.querySelector('input[name="mood"]:checked')) {
    alert('오늘의 기분이 선택되지 않았습니다!');
    return;
  }
  myTitle = document.getElementById('section-title-textarea').value;
  myContent = document.getElementById('section-content-textarea').value;
  myMood = document.querySelector('input[name="mood"]:checked').id;

  // localStorage 도 업데이트
  const dairyList = JSON.parse(localStorage.getItem('dairyList'));
  dairyList[idx] = {
    myTitle: myTitle,
    myMood: myMood,
    createdAt: createdAt,
    myContent: myContent,
    comments: comments,
  };
  localStorage.setItem('dairyList', JSON.stringify(dairyList));

  // 갱신된 data와 함께 리렌더링
  renderMain();
  initialRendering();
};

const onClickModifyButton = () => {
  // title 부분 리렌더링
  document.getElementById('title').innerHTML = `
  <div id="generator-body">
    <div id="mood-radio">
      <div id="mood-question-title">오늘 기분은 어땟나요?</div>
      <div id="mood-radio-area">
        <div class="mood-radio-instance">
          <input type="radio" name="mood" id="행복해요"><label for="행복해요">행복해요</label>
        </div>
        <div class="mood-radio-instance">
          <input type="radio" name="mood" id="슬퍼요"><label for="슬퍼요">슬퍼요</label>
        </div>
        <div class="mood-radio-instance">
          <input type="radio" name="mood" id="놀랐어요"><label for="놀랐어요">놀랐어요</label>
        </div>
        <div class="mood-radio-instance">
          <input type="radio" name="mood" id="화나요"><label for="화나요">화나요</label>
        </div>
        <div class="mood-radio-instance">
          <input type="radio" name="mood" id="기타"><label for="기타">기타</label>
        </div>
      </div>
    </div>
  </div>
  `;
  // section-body 부분 리렌더링
  document.getElementById('section-body').innerHTML = `
  <div class="section-title">제목</div>
  <textarea id="section-title-textarea">${myTitle}</textarea>
  <div class="section-title">내용</div>
  <textarea id="section-content-textarea">${myContent}</textarea>
  `;
  // section-footer 부분 리렌더링
  document.getElementById('section-footer').style = 'justify-content: center;';
  document.getElementById('section-footer').innerHTML = `
    <div class="delete-btn-area">
      <button id="cancel-modify-btn" onclick="onClickCancelModifyButton()">취소</button>
    </div>
    <div class="modify-btn-area">
      <button id="complete-modify-btn" onclick="onClickCompleteModifyButton()">수정완료</button>
    </div>
  `;
};
