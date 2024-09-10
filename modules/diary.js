const submitButton = document.getElementById('submitBtn');
const diaryListEl = document.getElementById('diaryList');
const diaryCustomSelectEl = document.getElementById('customSelect_diary');
const photoCustomSelectEl = document.getElementById('customSelect_photo');
const alertDiary = document.getElementById('add-list-alert');
const scrollFloatingButton = document.getElementById('upFloatingButton');
const deleteButtonEl = document.getElementById('deleteButton');

//diary data
let feeling = '';
let customSelect = 'all';
let diaryListArray = [];
let selectedValue = '';

// pagenation
let startPage = 1;
let onPage = 1;

const feelingText = {
  angry: '화나요',
  etc: '기타',
  happy: '행복해요',
  sad: '슬퍼요',
  surprised: '놀랐어요',
  all: '전체',
};

const photoSelect = {
  default: '기본형',
  width: '가로형',
  height: '세로형',
};

const fetchLocalStorageListData = () => {
  if (localStorage.length) {
    localData = localStorage.getItem('diaryListArray');
    diaryListArray = JSON.parse(localData);
    if (alertDiary) {
      diaryListEl.innerHTML = '';
    }
  }
};
fetchLocalStorageListData();

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
    comments: [],
  };

  diaryListArray.push(newDiaryData);

  const addList = document.createElement('li');

  if (alertDiary) {
    classNameChange(alertDiary, 'active', 'none');
  }
  diaryListEl.append(addList);

  addList.innerHTML = diaryCard(newDiaryData);
  localStorage.setItem('diaryListArray', JSON.stringify(diaryListArray));
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('happy').checked = true;
  submitButtonStyleChange('off');
};

const onDeleteButtonClick = (removeId) => {
  diaryListArray = diaryListArray.filter((diary) => diary.id !== removeId);
  localStorage.setItem('diaryListArray', JSON.stringify(diaryListArray));
  fetchLocalStorageListData();
};

const onOptionChecked = (e) => {
  e.preventDefault();
  type = e.target.name;
  if (type === 'photo') {
    customSelect = e ? e.currentTarget.value : 'default';
  } else if (type === 'diary') {
    customSelect = e ? e.currentTarget.value : 'all';
  }

  document.getElementById(`selectedValue_${type}`);
  document
    .querySelectorAll(`#optionList_${type} .option > button`)
    .forEach((option) => {
      option.classList.remove('selected');
    });
  document.getElementById(`${customSelect}_option`).classList.add('selected');
  document.getElementById(`selectedValue_${type}`).innerText = `${
    type === 'diary' ? feelingText[customSelect] : photoSelect[customSelect]
  }`;
  console.log(customSelect);

  if (type === 'diary') {
    diaryListEl.innerHTML = '';
    isList = false;
    diaryListArray.forEach((diaryData) => {
      if (diaryData.feeling === customSelect) {
        const addList = document.createElement('li');
        isList = true;
        console.log(diaryData.title);
        diaryListEl.append(addList);

        addList.innerHTML = diaryCard(diaryData);
      } else if (customSelect === 'all') {
        isList = true;
        renderDiaryList();
      }
    });
  } else if (type === 'photo') {
    switch (customSelect) {
      case 'default':
        document.querySelectorAll('.dog_photo_box').forEach((dogEl) => {
          dogEl.style = 'aspect-ratio: 1/1';
        });
        break;
      case 'width':
        document.querySelectorAll('.dog_photo_box').forEach((dogEl) => {
          dogEl.style = 'aspect-ratio: 16/9';
        });
        break;
      case 'height':
        document.querySelectorAll('.dog_photo_box').forEach((dogEl) => {
          dogEl.style = 'aspect-ratio: 3/4';
        });
        break;
    }
  }
  document.getElementById(`optionList_${type}`).classList.add('hidden');

  if (!isList) {
    diaryListEl.innerHTML =
      '<li id="add-list-alert" class="active">등록된 일기가 없습니다.</li>';
  }
};

function onThemeToggle(event) {
  event.target.checked
    ? document.documentElement.setAttribute('theme', 'dark')
    : document.documentElement.setAttribute('theme', 'light');
}

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

function diaryCard(dataFrom) {
  return `
      <a id="${dataFrom.id}" class="diary_card" 
      href="./diaryDetail.html?id=${dataFrom.id}#commentscontainer" >
      <div class="img-wrap">
        <img src="./public/imgs/${dataFrom.feeling}.svg" alt="${
    dataFrom.feeling
  }이미지" />
      </div>
      <div class="info-container">
        <div class="tag-wrap">
          <p class="feeling-tag ${dataFrom.feeling}">${
    feelingText[dataFrom.feeling]
  }</p>
          <p class="date-tag">${dateFormatter()}</p>
        </div>
        <h3 class="title">
          ${dataFrom.title}
        </h3>
      </div>
      <button id="deleteButton" onclick="modalOn(1, 'modal_remove_list', event)" >
        <img src="./public/icons/close_outline_light_s.svg" class="${
          dataFrom.id
        }" />
      </button>
    </a>`;
}

let removeListID;
let modalDepth;

const modalOn = (depth, content, event) => {
  modalDepth = depth;
  document.body.style.overflow = 'hidden';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (content === 'modal_remove_list') {
    event.stopPropagation();
    event.preventDefault();
    removeListID = event.target.classList[0];
  }
  document.getElementById(`modal_depth${depth}`).style.display = 'flex';
  document.getElementById(content).style.display = 'flex';

  if (content === 'added_modal') {
    event.preventDefault();
  }
  if (content === 'modal_remove_list') {
  }
};

const modalClose = (isOne, closeModal1, closeModal2, nextFnc) => {
  const modalBack1 = document.getElementById('modal_depth1');
  const modalBack2 = document.getElementById('modal_depth2');
  document.body.style.overflow = '';

  !isOne
    ? ((document.getElementById(closeModal1).style.display = 'none'),
      (document.getElementById(closeModal2).style.display = 'none'),
      (modalBack1.style.display = 'none'),
      (modalBack2.style.display = 'none'),
      (document.body.style.overflow = 'auto'))
    : ((document.getElementById(closeModal1).style.display = 'none'),
      closeModal1 === 'cancel_prompt_modal'
        ? (modalBack2.style.display = 'none')
        : (modalBack1.style.display = 'none'),
      (modalBack2.style.display = 'none'));
  if (nextFnc === 'DELETE') {
    console.log(removeListID);
    onDeleteButtonClick(removeListID);
  }
};

document.getElementById('modal_depth1').addEventListener('click', () => {
  document.getElementById('modal_depth1').style.display = 'none';
  document
    .querySelectorAll('.depth1')
    .forEach((el) => (el.style.display = 'none'));
});

document.getElementById('modal_depth2').addEventListener('click', () => {
  document.getElementById('modal_depth2').style.display = 'none';
  document
    .querySelectorAll('.depth2')
    .forEach((el) => (el.style.display = 'none'));
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById(`modal_depth${modalDepth}`).style.display = 'none';
    document
      .querySelectorAll(`.depth${modalDepth}`)
      .forEach((el) => (el.style.display = 'none'));
    modalDepth -= 1;
  }
});

scrollFloatingButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

diaryCustomSelectEl.addEventListener('mouseenter', () => {
  document.getElementById('optionList_diary').classList.remove('hidden');
});

diaryCustomSelectEl.addEventListener('mouseleave', () => {
  document.getElementById('optionList_diary').classList.add('hidden');
});

photoCustomSelectEl.addEventListener('mouseenter', () => {
  document.getElementById('optionList_photo').classList.remove('hidden');
});

photoCustomSelectEl.addEventListener('mouseleave', () => {
  document.getElementById('optionList_photo').classList.add('hidden');
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

const onNavigationClick = (type) => {
  const diary_main = document.getElementById('diaryList');
  const photo_main = document.getElementById('photoList');
  const diary_nav = document.getElementById('diary_navigate');
  const photo_nav = document.getElementById('photo_navigate');
  const diary_filter = document.getElementById('customSelect_diary');
  const photo_filter = document.getElementById('customSelect_photo');

  switch (type) {
    case 'diary':
      diary_main.style.display = 'grid';
      photo_main.style.display = 'none';
      classNameChange(diary_nav, 'none', 'active');
      classNameChange(photo_nav, 'active', 'none');
      diary_filter.style.display = 'block';
      photo_filter.style.display = 'none';

      break;
    case 'photo':
      diary_main.style.display = 'none';
      photo_main.style.display = 'flex';
      classNameChange(photo_nav, 'none', 'active');
      classNameChange(diary_nav, 'active', 'none');
      diary_filter.style.display = 'none';
      photo_filter.style.display = 'block';
      dogImageApi();
      break;
  }
  // classNameChange();
  // classNameChange();
};

async function dogImageApi() {
  const photo_main = document.getElementById('photoList');
  photo_main.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    photo_main.innerHTML += `
    <li class="dog_photo_box">
      <div class="skeleton_stick"></div>
      <img />
    </li>
    `;
  }

  document.querySelectorAll('.skeleton_stick').forEach((el) => {
    el.innerHTML = el.style.animation = 'skeleton_ui 0.5s linear infinite';
  });

  const dogImageSkeletons = document.querySelectorAll('.dog_photo_box img');
  const skeletonStick = document.querySelectorAll('.skeleton_stick');
  fetch('https://dog.ceo/api/breeds/image/random/10').then((res) => {
    res.json().then((data) => {
      const dogImageList = data.message;

      for (let i = 0; i < dogImageList.length; i++) {
        dogImageSkeletons[i].src = dogImageList[i];
        skeletonStick[i].style.display = 'none';
      }
    });
  });
}

let searchTimer;
const searchFnc = (event) => {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {
    const searchValue = event.target.value;

    const searchDiary = diaryListArray.filter((diary) =>
      diary.title.includes(searchValue),
    );
    console.log(searchDiary);
    diaryListEl.innerHTML = '';

    searchDiary.forEach((diaryData) => {
      const addList = document.createElement('li');
      isList = true;
      console.log(diaryData.title);
      diaryListEl.append(addList);

      addList.innerHTML = diaryCard(diaryData);
    });
  }, 500);
};

let infinityTimer = null;
window.addEventListener('scroll', () => {
  const scrollPercent =
    document.documentElement.scrollTop /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
  if (scrollPercent < 0.9) return;
  if (infinityTimer !== null) return;
  // });
  console.log('불러옵니다');
  dogImageApi();

  infinityTimer = setTimeout(() => {
    clearTimeout(infinityTimer);
    infinityTimer = null;

    const scrollPercent =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);
    if (scrollPercent === 1) dogImageApi();
  }, 5000);
});
//
//
//
//
//
//

const lastPage = Math.ceil(diaryListArray.length / 12);
const prevPage = () => {
  if (startPage === 1) {
    alert('처음이에요! 더 이상 내려갈 수 없어요!');
  } else {
    startPage = startPage - 12;
    pageRender();
  }
};
const nextPage = () => {
  if (startPage + 12 <= lastPage) {
    startPage = startPage + 12;
    onPage = startPage;
    pageRender();
  } else {
    alert('lastPage번호를 넘어갑니다. 더 이상 보여줄 수 없어요.');
  }
};

const pageRender = () => {
  const pages = new Array(12)
    .fill(1)
    .map((el, index) => {
      const pageNum = index + startPage;

      return pageNum <= lastPage
        ? `<button onclick="itemRender(${pageNum});onPage=${pageNum};pageRender();" 
            class=${
              onPage === pageNum ? 'clickPagenation' : ''
            }>${pageNum}</button>`
        : ``;
    })
    .join(' ');

  document.getElementById('pagenation_list').innerHTML = pages;
};

const itemRender = (pageNum) => {
  const result = diaryListArray.filter(
    (el, index) => index < pageNum * 12 && index >= (pageNum - 1) * 12,
  );

  diaryListEl.innerHTML = result
    .map((el) => `<li>${diaryCard(el)}</li>`)
    .join('');
};

function renderDiaryList() {
  pageRender();
  itemRender(startPage);
}

window.onload = () => {
  renderDiaryList();
};
