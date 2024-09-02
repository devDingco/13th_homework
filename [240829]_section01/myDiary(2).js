let diaryList = JSON.parse(localStorage.getItem('diaries')) || [];

window.onload = () => {
  renderDiaries();
};

const registerDiary = () => {
  const selectedFeeling = document.querySelector(
    'input[name="feelingBtn"]:checked'
  );
  const diaryTitle = document.getElementById('titleContent');
  const diaryContent = document.getElementById('contentContainer');
  const info = document.getElementById('info');

  if (!selectedFeeling || !diaryTitle.value || !diaryContent.value) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  const todayDate = new Date();
  let year = todayDate.getFullYear();
  let month = String(todayDate.getMonth() + 1).padStart(2, '0');
  let day = String(todayDate.getDate()).padStart(2, '0');

  const imgFeeling = {
    행복해요: './images/happy_m.png',
    슬퍼요: './images/슬퍼요 (m).png',
    놀랐어요: './images/놀랐어요 (m).png',
    화나요: './images/화나요 (m).png',
    기타: './images/기타 (m).png',
  };

  const contentList = {
    title: diaryTitle.value,
    content: diaryContent.value,
    date: `${year}.${month}.${day}`,
    todayFeeling: selectedFeeling.value,
    img: imgFeeling[selectedFeeling.value],
  };

  diaryList.push(contentList);
  localStorage.setItem('diaries', JSON.stringify(diaryList));

  alert('일기가 등록되었습니다!');

  diaryTitle.value = '';
  diaryContent.value = '';
  selectedFeeling.checked = false;

  renderDiaries();
  btnColorFunc();
};

const renderDiaries = () => {
  const cardContainer = document.getElementById('card');
  cardContainer.innerHTML = '';
  diaryList.forEach((diary, index) => showCardFunc(diary, index));
};

const filterDiaries = () => {
  const filterContent = document.getElementById('filterBtn').value;
  const filteredDiaries =
    filterContent === '전체'
      ? diaryList
      : diaryList.filter((diary) => diary.todayFeeling === filterContent);

  const cardContainer = document.getElementById('card');
  cardContainer.innerHTML = '';
  filteredDiaries.forEach((diary, index) => showCardFunc(diary, index));
};

// Function to display a diary card
const showCardFunc = (diary, index) => {
  const cardContainer = document.getElementById('card');
  const newContentCard = document.createElement('div');

  let feelColor;
  switch (diary.todayFeeling) {
    case '행복해요':
      feelColor = '#EA5757';
      break;
    case '슬퍼요':
      feelColor = '#28B4E1';
      break;
    case '놀랐어요':
      feelColor = '#D59029';
      break;
    case '화나요':
      feelColor = '#777777';
      break;
    case '기타':
      feelColor = '#A229ED';
      break;
    default:
      feelColor = 'black';
  }

  newContentCard.className = 'newCard';
  newContentCard.innerHTML = `
    <div class="container0">
      <img src="${diary.img}" alt="${diary.todayFeeling}" />
    </div>
    <div class="container1">
      <p class="feel" style="color: ${feelColor}">${diary.todayFeeling}</p>
      <p class="date">${diary.date}</p>
    </div>
    <div class="container2">
      <p class="title">${diary.title}</p>
    </div>
  `;

  cardContainer.prepend(newContentCard); //appenChild는 맨뒤로 추가, prepand는 그 반대(최신순)

  newContentCard.addEventListener('click', function () {
    window.location.href = `./detail.html?number=${index}`; // 상세 페이지로 이동하고 쿼리스트링에 인덱스를 추가
  });
};

const btnColorFunc = () => {
  const selectedFeeling = document.querySelector(
    'input[name="feelingBtn"]:checked'
  );
  const diaryTitle = document.getElementById('titleContent');
  const diaryContent = document.getElementById('contentContainer');
  const registerBtn = document.getElementById('registerBtn');

  if (diaryContent.value && diaryTitle.value && selectedFeeling) {
    registerBtn.style.backgroundColor = '#194d89';
    registerBtn.style.cursor = 'pointer';
  } else {
    registerBtn.style.backgroundColor = '';
  }
};
