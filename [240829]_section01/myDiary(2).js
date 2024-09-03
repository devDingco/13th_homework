let diaryList = JSON.parse(localStorage.getItem('diaries')) || [];

window.onload = () => {
  renderDiaries();
};

//스크롤 시 필터 배경색 변경
window.addEventListener('scroll', () => {
  const filter = document.getElementById('filterBtn');
  const isScrolled = window.scrollY > 0;
  filter.style.backgroundColor = isScrolled ? 'black' : 'white';
  filter.style.color = isScrolled ? 'white' : 'black';
});

// 플로팅 버튼 클릭 시 맨 위로 스크롤
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

  console.log(diaryList);
  if (diaryList.length > 0) {
    info.style.display = 'none';
  }

  renderDiaries();
  btnColorFunc();
};

const renderDiaries = () => {
  const cardContainer = document.getElementById('card');
  const info = document.getElementById('info');
  if (diaryList.length === 0) {
    info.style.display = 'block';
    // info.innerHTML = '오늘의 기분을 담은 일기를 써보세요!';
  } else {
    info.style.display = 'none';
  }
  cardContainer.innerHTML = '';
  diaryList.forEach((diary, index) => showCardFunc(diary, index));
};

const filterDiaries = (e) => {
  const info = document.getElementById('info');
  const filterContent = e.target.value;

  const filteredDiaries =
    filterContent === '전체'
      ? diaryList
      : diaryList.filter((diary) => diary.todayFeeling === filterContent);

  if (filteredDiaries.length === 0) {
    info.style.display = 'block';
    info.innerHTML = `해당하는 일기가 존재하지 않습니다.`;
  } else {
    info.style.display = 'none';
  }

  const cardContainer = document.getElementById('card');
  cardContainer.innerHTML = '';
  filteredDiaries.forEach((diary, index) => showCardFunc(diary, index));
};

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

  const deleteIcon = document.createElement('div');
  deleteIcon.className = 'delete-icon';
  deleteIcon.innerHTML = 'X';

  deleteIcon.onclick = (e) => {
    e.stopPropagation();
    if (confirm('일기를 삭제하시겠습니까?')) {
      diaryList.splice(index, 1);
      localStorage.setItem('diaries', JSON.stringify(diaryList));
      renderDiaries();
    }
  };
  // deleteIcon을 newContentCard의 container0에 추가
  newContentCard.querySelector('.container0').appendChild(deleteIcon);

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
