// localStorage에 diaryList가 있으면, 있는거 그대로
const diaryList = JSON.parse(localStorage.getItem('diaryList')) ?? [];

// localStorage에 저장된 dairy 초기 렌더링
window.onload = () => {
  renderDiaryInstance();
};

// window 스크롤 감지시, 필터 배경색 변경하기
window.addEventListener('scroll', () => {
  const scrollDepth = window.scrollY;
  if (scrollDepth > 0) {
    document.getElementById('mood-selection').style =
      'background-color: black; color: white;';
    document
      .querySelectorAll('#mood-selection option')
      .forEach((el) => (el.style = 'background-color: black; color: white;'));
  } else {
    document.getElementById('mood-selection').style = '';
    document
      .querySelectorAll('#mood-selection option')
      .forEach((el) => (el.style = ''));
  }
});

const JS_모달열기기능 = (모달종류) => {
  document.getElementById(모달종류).style = 'display: block;';
};
const JS_모달닫기기능 = (모달종류) => {
  document.getElementById(모달종류).style = 'display: none;';
};

const JS_모달모두닫기기능 = (모달리스트) => {
  모달리스트.forEach((el) => JS_모달닫기기능(el));
  renderDiaryInstance();
};

const JS_등록하기버튼토글 = () => {
  // 제목과 내용 input 요소 가져오기
  const inputs = document.querySelectorAll('.mood-textbox-input');
  const registerButton = document.getElementById(
    'button_gen_dairy__register_btn'
  );

  // 제목이나 내용 중 하나라도 입력이 시작되면 버튼 활성화
  if (inputs[0].value.trim() || inputs[1].value.trim()) {
    registerButton.disabled = false;
    registerButton.style.backgroundColor = 'black'; // 버튼 배경색을 검정으로 설정
    registerButton.style.color = '#FFF';
  } else {
    registerButton.disabled = true;
    registerButton.style.backgroundColor = '#C7C7C7'; // 버튼 배경색을 기본 색으로 설정
  }
};

const onClickTopScroller = () => {
  // 플로팅 버튼 클릭시 ViewPort의 최상단으로 이동
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onClickDeleteButton = (e, idx) => {
  e.preventDefault();
  alert('삭제되었습니다.');
  diaryList.splice(idx, 1);
  localStorage.setItem('diaryList', JSON.stringify(diaryList));
  renderDiaryInstance();
};

const onClickButton = (event) => {
  // mood, 제목, 내용 가져오기
  const myMood = document.querySelector('input[name="mood"]:checked');
  const [myTitle, myContent] =
    document.getElementsByClassName('mood-textbox-input');
  // mood, 제목, 내용 없으면 해당 기능 실행 취소
  if (!myMood || !myTitle.value || !myContent.value) {
    alert('일기쓰기의 값이 비었거나, 값의 양식에 문제가 있습니다!');
    return;
  }

  // dairy 객체 생성
  const dairy = {
    myTitle: myTitle.value,
    myMood: myMood.id,
    createdAt: new Date().toLocaleDateString(),
    myContent: myContent.value,
    comments: [],
  };
  // diaryList에 추가
  diaryList.push(dairy);
  localStorage.setItem('diaryList', JSON.stringify(diaryList));

  // 렌더링
  renderDiaryInstance();

  // 일기쓰기에서 선택한 값 초기화
  myContent.checked = false;
  myContent.value = '';
  myTitle.value = '';

  JS_모달열기기능('CSS_등록완료모달그룹');
};

const renderDiaryInstance = () => {
  const elementArr = JSON.parse(localStorage.getItem('diaryList'));

  if (!elementArr) {
    console.log('🚀 ~ renderDiaryInstance ~ elementArr:', elementArr);
    return;
  }

  const resRendering = elementArr.map(
    (el, idx) => `
      <div class="dairy">
        <a href="./detail.html?idx=${idx}">
          <div class="mood-img">
            <img id="mood-face-img" src="./asset/${el.myMood}.jpg" alt="${
      el.myMood
    }}">
            <img onclick="onClickDeleteButton(event, ${idx})" id="dairy-delete-btn" src="./asset/close icon.jpg" />
          </div>
          <div class="daiary-summary-wrapper">
            <div class="daiary-summary">
              <div class="mood-${el.myMood}">${el.myMood}</div>
              <div class="created-at">${el.createdAt}</div>
            </div>
            <div class="my-title">${el.myTitle.substring(0, 40)}</div>
          </div>
        </a>
    </div>
    `
  );
  document.getElementById('dairy-list').innerHTML = resRendering.join('');
};
