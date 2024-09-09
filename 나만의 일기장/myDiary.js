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

//toast 메시지
const toastMsg = document.createElement('div');
toastMsg.className = 'toastMessage';
document.body.appendChild(toastMsg);
function toastOn() {
  toastMsg.classList.add('active');
  setTimeout(function () {
    toastMsg.classList.remove('active');
  }, 1300);
}

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

  // alert('일기가 등록되었습니다!');

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
    openModal('delete');
    const deleteBtn = document.getElementById('deleteBtn');

    deleteBtn.onclick = () => {
      toastMsg.innerText = '삭제 완료';
      diaryList.splice(index, 1); //diaryList에서 해당 항목 삭제
      localStorage.setItem('diaries', JSON.stringify(diaryList)); //스토리지 업데이트
      renderDiaries();
      closeModal('delete');
      toastOn();
    };
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

//모바일 환경되면 filter를 가운데로 이동
// function relocateFilter() {
//   const filter = document.querySelector('.filter');
//   const showImgContent = document.querySelector('#showImgContent');
//   const addContent = document.querySelector('#addContent');

//   if (window.innerWidth <= 1200) {
//     if (filter.nextElementSibling !== addContent) {
//       showImgContent.parentNode.insertBefore(filter, addContent);
//     }
//   } else {
//     const container = document.querySelector('.container');
//     if (filter.nextElementSibling !== showImgContent) {
//       container.insertBefore(filter, document.querySelector('.mainContent'));
//     }
//   }
// }

// 초기 실행 및 윈도우 크기 변경 시 이벤트 등록
// window.addEventListener('resize', relocateFilter);
// window.addEventListener('DOMContentLoaded', relocateFilter);

//플로팅 버튼 맨 위일땐 사라지게 하기
const disappearBtn = () => {
  const float = document.querySelector('.floating-btn');

  if (window.scrollY === 0) {
    float.style.display = 'none';
  } else {
    float.style.display = 'block';
  }
};
window.addEventListener('scroll', disappearBtn);

// register하면서 이중모달도 열리게 하기
const handleSubmit = (event) => {
  // console.log('함수');
  event.preventDefault();
  registerDiary();
  openModal('complete');
};

//이중모달에서 확인버튼 나오면 뒤에것도 한번에 없애기
const handleClose = (event) => {
  // console.log('두번째');
  event.preventDefault();
  closeModal('complete');
  closeModal('writeModal');
};

//일기 등록 취소 중첩모달
const handleCancel = (event) => {
  event.preventDefault();
  document.getElementById('addContent').reset();
  btnColorFunc();
  closeModal('cancel');
  closeModal('writeModal');
};

//일기쓰기 모달
const openModal = (kind) => {
  // console.log('함수');
  document.getElementById(kind).style.display = 'block';

  // 뒷배경 스크롤 막기
  document.body.style.overflow = 'hidden';
};

const closeModal = (kind) => {
  document.getElementById(kind).style.display = 'none';

  //스크롤 다시 활성화
  document.body.style.overflow = 'auto';
};
