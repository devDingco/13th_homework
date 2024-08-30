let diaryList = []; //일기를 담을 배열
const registerBtn = () => {
  const selectedFeeling = document.querySelector(
    'input[name="feelingBtn"]:checked'
  );
  const diaryTitle = document.getElementById('titleContent');
  const diaryContent = document.getElementById('contentContainer');
  const info = document.getElementById('info');

  if (!selectedFeeling || !diaryTitle || !diaryContent) {
    alert('모든 필드를 입력해주세요.');
    return; // 필드가 비어있으면 함수 종료
  }

  const todayDate = new Date();
  let year = todayDate.getFullYear();
  let month = String(todayDate.getMonth() + 1).padStart(2, '0');
  let day = String(todayDate.getDate()).padStart(2, '0');

  let selectedImg;

  const imgFeeling = {
    행복해요: './images/happy_m.png',
    슬퍼요: './images/슬퍼요 (m).png',
    놀랐어요: './images/놀랐어요 (m).png',
    화나요: './images/화나요 (m).png',
    기타: './images/기타 (m).png',
  };

  selectedImg = imgFeeling[selectedFeeling.value]; // 선택된 버튼의 value를 사용하여 이미지 경로 가져오기

  const contentList = {
    title: diaryTitle.value,
    content: diaryContent.value,
    date: `${year}.${month}.${day}`,
    todayFeeling: selectedFeeling.value,
    img: selectedImg,
  };
  diaryList.push(contentList); // diaryList에 추가
  // console.log(diaryList);

  alert('일기가 등록되었습니다!');

  diaryTitle.value = '';
  diaryContent.value = '';
  selectedFeeling.checked = false;

  if (contentList) {
    info.style.display = 'none';
  }

  // 새로운 일기를 카드로 보여주기
  showCardFunc(contentList);
  btnColorFunc();
};

//카드에 추가되어서 div 추가 및 alert
const showCardFunc = (diary) => {
  const cardContainer = document.getElementById('card');
  const newContentCard = document.createElement('div');
  const miniTodayFeeling = {
    행복해요: './images/행복해요 (s).png',
    슬퍼요: './images/슬퍼요 (s).png',
    놀랐어요: './images/놀랐어요 (s).png',
    화나요: './images/화나요 (s).png',
    기타: './images/기타 (s).png',
  };
  const miniImg = miniTodayFeeling[diary.todayFeeling] || '';

  // let
  console.log(miniImg);

  newContentCard.className = 'newCard';
  newContentCard.innerHTML = `
    <div class="container0">
      <img src="${diary.img}" alt="${diary.todayFeeling}" />
    </div>
    <div class="container1">
      <p class="feel">${diary.todayFeeling}</p>
      <p class="date">${diary.date}</p>
    </div>
    <div class="container2">
      <p class="title">${diary.title}</p>
    </div>
  
  `;

  cardContainer.appendChild(newContentCard); // 카드 추가

  // <img src = "${miniImg}"/> alert뜰때 미니 버전 뜨는거 한번 해보기

  newContentCard.addEventListener('click', function () {
    alert(`
      제목 : ${diary.title}
      내용 : ${diary.content}
      오늘의 기분 : ${diary.todayFeeling}
      작성일 : ${diary.date}
      `);
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
