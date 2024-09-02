// localStorage에 dairyList가 있으면, 있는거 그대로
const dairyList = JSON.parse(localStorage.getItem('dairyList')) ?? [];

// localStorage에 저장된 dairy 초기 렌더링
window.onload = () => {
  renderDiaryInstance();
};

const onClickButton = () => {
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
  };
  // dairyList에 추가
  dairyList.push(dairy);
  localStorage.setItem('dairyList', JSON.stringify(dairyList));

  // 렌더링
  renderDiaryInstance();

  // 일기쓰기에서 선택한 값 초기화
  myContent.checked = false;
  myContent.value = '';
  myTitle.value = '';
};

const renderDiaryInstance = () => {
  const elementArr = JSON.parse(localStorage.getItem('dairyList'));
  console.log(elementArr);
  const resRendering = elementArr.map(
    (el, idx) => `
      <div onclick="onClickDairy()" class="dairy">
        <a href="./detail.html?idx=${idx}">
          <div class="mood-img">
            <img src="./asset/${el.myMood}.jpg" alt="${el.myMood}}">
          </div>
          <div class="daiary-summary-wrapper">
            <div class="daiary-summary">
              <div class="mood-${el.myMood}">${el.myMood}</div>
              <div class="created-at">${el.createdAt}</div>
            </div>
            <div class="my-title">${el.myTitle}</div>
          </div>
        </a>
    </div>
    `
  );
  document.getElementById('dairy-list').innerHTML = resRendering.join('');
};
