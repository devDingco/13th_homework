const submitButton = document.getElementById('submitBtn');
const diaryListEl = document.getElementById('diaryList');

let feeling;
let diaryListArray = [];

const feelingText = {
  angry: '화나요',
  etc: '기타',
  happy: '행복해요',
  sad: '슬퍼요',
  surprised: '놀랐어요',
};

const submitButtonStyleChange = (buttonState) => {
  if (buttonState === 'on') {
    submitButton.classList.remove('none');
    submitButton.classList.add('active');
    submitButton.disabled = false;
  } else if (buttonState === 'off') {
    submitButton.classList.remove('active');
    submitButton.classList.add('none');
    submitButton.disabled = true;
  }
};

const onChangeInputValidation = () => {
  document.getElementsByName('feeling').forEach((el) => {
    if (el.checked) {
      feeling = el.id;
    }
  });

  submitButton.classList.remove('active'),
    submitButton.classList.add('none'),
    (submitButton.disabled = true);

  const titleValue = document.getElementById('title').value;
  const contentValue = document.getElementById('content').value;

  titleValue && contentValue && feeling
    ? submitButtonStyleChange('on')
    : submitButtonStyleChange('off');
};

const addDiary = (e) => {
  e.preventDefault();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dateForm = `${year}.${month >= 10 ? month : '0' + month}.${date
    .toString()
    .padStart(2, '0')}`;

  document.getElementsByName('gender').forEach((el) => {
    if (el.checked) {
      genderType = el.value;
    }
  });

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  diaryListArray.push({
    feeling,
    title,
    content,
    createdAt: dateForm,
  });
  const firstDiary = document.querySelector('.add-list-alert');
  const addList = document.createElement('li');
  firstDiary ? (diaryListEl.innerHTML = '') : null;
  diaryListEl.append(addList);

  addList.innerHTML = `
  <button id="${
    diaryListArray.length - 1
  }" onclick="diaryListInfo(event); return false;" >
    <div class="img-wrap">
      <img src="./public/imgs/${feeling}.svg" alt="${feeling}이미지" />
    </div>
    <div class="info-container">
      <div class="tag-wrap">
        <p class="feeling-tag ${feeling}">${feelingText[feeling]}</p>
        <p class="date-tag">${dateForm}</p>
      </div>
      <h3 class="title">
        ${diaryListArray[diaryListArray.length - 1].title}
      </h3>
    </div>
  </button>
  `;
  console.log(diaryListArray);
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('happy').checked = true;
  submitButtonStyleChange('off');
};

document
  .querySelectorAll("#diaryForm input[type='text'], #diaryForm textarea")
  .forEach((input) => {
    input.addEventListener('input', onChangeInputValidation);
  });

const diaryListInfo = (event) => {
  const index = event.currentTarget.id;

  alert(`
    기분 상태: ${feelingText[diaryListArray[diaryListArray.length - 1].feeling]}
    제목: ${diaryListArray[index].title}
    내용: ${diaryListArray[index].content}
    `);
};
