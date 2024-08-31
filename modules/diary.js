const submitButton = document.getElementById('submitBtn');
const diaryListEl = document.getElementById('diaryList');
const customSelectEl = document.getElementById('cusotmSelect');
const alertDiary = document.getElementById('add-list-alert');

let feeling = '';
let customSelect = 'all';
let diaryListArray = [];
let selectedValue = '';

const feelingText = {
  angry: '화나요',
  etc: '기타',
  happy: '행복해요',
  sad: '슬퍼요',
  surprised: '놀랐어요',
  all: '전체',
};

const renderLocalStorageData = () => {
  if (localStorage.length) {
    localData = localStorage.getItem('diaryListArray');
    diaryListArray = JSON.parse(localData);
    if (alertDiary) {
      diaryListEl.innerHTML = '';
    }

    diaryListArray.map((diary) => {
      const addList = document.createElement('li');

      diaryListEl.append(addList);
      addList.innerHTML = `
        <a id="${diary.id}" href="./diaryDetail.html?id=${diary.id}" >
          <div class="img-wrap">
            <img src="./public/imgs/${diary.feeling}.svg" alt="${
        diary.feeling
      }이미지" />
          </div>
          <div class="info-container">
            <div class="tag-wrap">
              <p class="feeling-tag ${diary.feeling}">${
        feelingText[diary.feeling]
      }</p>
              <p class="date-tag">${dateFormatter()}</p>
            </div>
            <h3 class="title">
              ${diary.title}
            </h3>
          </div>
        </a>
      `;
    });
  }
};
renderLocalStorageData();

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

const onAddDiary = (e) => {
  e.preventDefault();

  if (customSelect !== 'all' && customSelect !== feeling) {
    onOptionChecked();
  }

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const newDiaryData = {
    id: uuid.v4(),
    feeling,
    title,
    content,
    createdAt: dateFormatter(),
  };

  diaryListArray.push(newDiaryData);

  const addList = document.createElement('li');

  if (alertDiary) {
    classNameChange(alertDiary, 'active', 'none');
  }
  diaryListEl.append(addList);

  addList.innerHTML = `
    <a id="${newDiaryData.id}" href="./diaryDetail.html?id=${newDiaryData.id}" >
      <div class="img-wrap">
        <img src="./public/imgs/${newDiaryData.feeling}.svg" alt="${
    newDiaryData.feeling
  }이미지" />
      </div>
      <div class="info-container">
        <div class="tag-wrap">
          <p class="feeling-tag ${newDiaryData.feeling}">${
    feelingText[newDiaryData.feeling]
  }</p>
          <p class="date-tag">${dateFormatter()}</p>
        </div>
        <h3 class="title">
          ${newDiaryData.title}
        </h3>
      </div>
    </a>
  `;
  localStorage.setItem('diaryListArray', JSON.stringify(diaryListArray));
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('happy').checked = true;
  submitButtonStyleChange('off');
};

// const diaryListInfo = (event) => {
//   const diaryId = event.currentTarget.id;
//   diaryListArray.forEach((diaryList) => diaryList === diaryId);
//   console.log(diaryId);

//   alert(`
//     기분 상태: ${feelingText[diaryListArray[diaryListArray.length - 1].feeling]}
//     제목: ${diaryListArray[index].title}
//     내용: ${diaryListArray[index].content}
//     `);
// };

const onOptionChecked = (e) => {
  customSelect = e ? e.currentTarget.value : 'all';
  console.log(customSelect);
  document.getElementById('selectedValue');

  document
    .querySelectorAll('#optionList .option > button')
    .forEach((option) => {
      option.classList.remove('selected');
    });
  document.getElementById(`${customSelect}_option`).classList.add('selected');
  document.getElementById(
    'selectedValue',
  ).innerText = `${feelingText[customSelect]}`;

  diaryListEl.innerHTML = '';
  isList = false;

  const addList = document.createElement('li');
  diaryListArray.forEach((diaryData) => {
    if (diaryData.feeling === customSelect) {
      isList = true;
      diaryListEl.append(addList);
      addList.innerHTML = `
    <a id="${diaryData.id}" href="./diaryDetail.html?id=${diaryData.id}" >
      <div class="img-wrap">
        <img src="./public/imgs/${diaryData.feeling}.svg" alt="${
        diaryData.feeling
      }이미지" />
      </div>
      <div class="info-container">
        <div class="tag-wrap">
          <p class="feeling-tag ${diaryData.feeling}">${
        feelingText[diaryData.feeling]
      }</p>
          <p class="date-tag">${dateFormatter()}</p>
        </div>
        <h3 class="title">
          ${diaryData.title}
        </h3>
      </div>
    </a>
  `;
    } else if (customSelect === 'all') {
      isList = true;
      renderLocalStorageData();
    }
  });

  document.getElementById('optionList').classList.add('hidden');
  if (!isList) {
    diaryListEl.innerHTML =
      '<li id="add-list-alert" class="active">등록된 일기가 없습니다.</li>';
  }
  console.log(isList);
};

function dateFormatter() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}.${month >= 10 ? month : '0' + month}.${date
    .toString()
    .padStart(2, '0')}`;
}

function classNameChange(element, remove, add) {
  element.classList.remove(remove);
  element.classList.add(add);
}

customSelectEl.addEventListener('mouseenter', () => {
  document.getElementById('optionList').classList.remove('hidden');
});

customSelectEl.addEventListener('mouseleave', () => {
  document.getElementById('optionList').classList.add('hidden');
});

document.querySelectorAll('.option > button').forEach((buttonEl) => {
  buttonEl.addEventListener('click', onOptionChecked);
});

document
  .querySelectorAll("#diaryForm input[type='text'], #diaryForm textarea")
  .forEach((input) => {
    input.addEventListener('input', onChangeInputValidation);
  });

document
  .querySelectorAll("#diaryForm input[type='radio']")
  .forEach((radioBtn) => {
    radioBtn.addEventListener('change', onChangeInputValidation);
  });
