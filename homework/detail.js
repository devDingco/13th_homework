// QueryString 에서 data 가져오기
const urlSearchParams = new URLSearchParams(location.search);
const paramsObj = Object.fromEntries(urlSearchParams.entries());
const { idx } = paramsObj;
const daiaryList = JSON.parse(localStorage.getItem('dairyList'));
const el = daiaryList[idx];
let { myTitle, myMood, createdAt, myContent } = el;

window.onload = () => {
  initialRendering();
};

const initBodyRendering = () => {
  // 원본 body 영역 리렌더링
  document.getElementById('body').innerHTML = `
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
    <div id="section-footer">
      <div class="delete-btn-area">
        <button onclick="onClickDeleteButton()" id="delete-btn">삭제</button>
      </div>
      <div class="modify-btn-area">
        <button onclick="onClickModifyButton()" id="modify-btn">수정</button>
      </div>
    </div>
  `;
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

const onClickDeleteButton = () => {};

const onClickCancelModifyButton = () => {
  // 원본 body 영역 리렌더링
  initBodyRendering();
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
  };
  localStorage.setItem('dairyList', JSON.stringify(dairyList));

  // 갱신된 data와 함께 리렌더링
  initBodyRendering();
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
