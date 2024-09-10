let diaryList;
let initialScroll = 0;
let timer = null;
const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
const diaries = JSON.parse(diaryListString);

window.onload = () => {
  showDiary();
  renderPhotos();
  renderPageList(1);
  renderPageNumber();
};

window.addEventListener('scroll', () => {
  const filterElem = document.querySelectorAll('.filter select');
  const currentScroll = window.scrollY;

  if (currentScroll === 0 || initialScroll > currentScroll) {
    filterElem.forEach((el) => {
      el.classList.remove('scrolled');
    });
  } else {
    filterElem.forEach((el) => {
      el.classList.add('scrolled');
    });
  }
  initialScroll = currentScroll;

  const scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  if (scrollPercent < 0.7) return;
  if (timer !== null) return;

  renderPhotos();

  timer = setTimeout(() => {
    timer = null;

    const lastScrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    if (lastScrollPercent === 1) renderPhotos();
  }, 1000);
});

const renderPhotos = () => {
  const END_POINT = 'https://dog.ceo/api/breeds/image/random/10';

  const skeletonElem = Array.from({ length: 10 }).map(
    (_) => `<div class="skeleton-area">
    <div class="skeleton photo"></div>
  </div>`
  );

  document.querySelector('.photo-list').innerHTML = skeletonElem;

  setTimeout(() => {
    fetch(END_POINT).then((response) => {
      response
        .json()
        .then((result) => {
          const imageElem = result.message.map(
            (item, index) => `
              <li>
                    <a href="">
                    <img
                        src='${item}'
                        class="photo-item"
                        alt='강아지 사진 ${index + 1}'
                    />
                    </a>
                </li>
            `
          );

          document.querySelector('.photo-list').innerHTML = imageElem.join('');
        })
        .catch(() => {
          alert('알 수 없는 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.');
          location.replace('./index.html');
        });
    });
  }, 3000);
};

const renderData = (array) => {
  return array.map(
    (el, index) => `
  <li class="panel-item">
    <a href="./detail.html?number=${index}#review">
      <div class="emotion-card">
      ${el.emotion === 'happy' ? '<img src="./assets/images/image_emotion_happy.png" alt="" />' : ''}
      ${el.emotion === 'sad' ? '<img src="./assets/images/image_emotion_sad.png" alt="" />' : ''}
      ${el.emotion === 'surprising' ? '<img src="./assets/images/image_emotion_surprising.png" alt="" />' : ''}
      ${el.emotion === 'angry' ? '<img src="./assets/images/image_emotion_angry.png" alt="" />' : ''}
      ${el.emotion === 'etc' ? '<img src="./assets/images/image_emotion_etc.png" alt="" />' : ''}
      </div>

      <div class="panel-delete">
        <button class="button-item-delete" onclick="deleteItem(event, ${index})">
          <img src="./assets/images/icon_delete.svg" alt="일기 삭제하기" />
        </button>
      </div>
      <div class="panel-info">
        <div class="flexbox justify-between">
          <span class="badge-emoticon ${el.emotion}">
          ${el.emotion === 'happy' ? '행복해요' : ''}
            ${el.emotion === 'sad' ? '슬퍼요' : ''}
            ${el.emotion === 'surprising' ? '놀랐어요' : ''}
            ${el.emotion === 'angry' ? '화나요' : ''}
            ${el.emotion === 'etc' ? '기타' : ''}
            </span>
          <span class="date">${el.createdAt}</span>
        </div>
        <h3 class="panel-title">
          ${el.title}
        </h3>
      </div>
    </a>
  </li>
`
  );
};

const searchItem = (event) => {
  const value = event.target.value;

  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);

  clearTimeout(timer);

  timer = setTimeout(() => {
    const result = diaryList.filter((el) => el.title.includes(value));
    document.querySelector('.panel-list').innerHTML = renderData(result).join('');
  }, 1000);
};

const showDiary = () => {
  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);

  if (diaryList.length !== 0) {
    const diaryHTML = renderData(diaryList);
    const diaries = diaryHTML.join('');
    document.querySelector('.panel-list').innerHTML = diaries;
  } else {
    const diaryHTML = `<li class="no-content">
    <p>등록된 일기가 없습니다.<br />오늘의 감정을 기록해 보세요!</p>
  </li>`;

    document.querySelector('.panel-list').innerHTML = diaryHTML;
  }
};

const saveDiary = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDay()).padStart(2, '0');
  const createdAt = `${year}. ${month}. ${day}`;

  const title = document.querySelector('#input-title').value;
  const content = document.querySelector('#input-content').value;

  const emotion =
    document.querySelector('#happy').checked === true
      ? 'happy'
      : document.querySelector('#sad').checked === true
      ? 'sad'
      : document.querySelector('#angry').checked === true
      ? 'angry'
      : document.querySelector('#surprising').checked === true
      ? 'surprising'
      : document.querySelector('#etc').checked === true
      ? 'etc'
      : '';

  const data = {
    title,
    content,
    createdAt,
    emotion,
  };

  let previousData = JSON.parse(window.localStorage.getItem('myDiaryList')) ?? [];

  diaryList = [...previousData, data];

  window.localStorage.setItem('myDiaryList', JSON.stringify(diaryList));

  showDiary();
};

const filterEmotion = (event) => {
  const target = event.target.value;
  const convertedTarget = target === '행복해요' ? 'happy' : target === '슬퍼요' ? 'sad' : target === '화나요' ? 'angry' : target === '놀랐어요' ? 'surprising' : target === '기타' ? 'etc' : '';

  const diaryListString = window.localStorage.getItem('myDiaryList') !== null ? window.localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);

  const filteredList = diaryList.filter((el) => el.emotion == convertedTarget);

  const filteredListHTML = renderData(filteredList);

  document.querySelector('.panel-list').innerHTML = filteredListHTML.join('');
};

const deleteItem = (event, itemIndex) => {
  event.preventDefault();

  const diaryListString = window.localStorage.getItem('myDiaryList') !== null ? window.localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);
  const filteredList = diaryList.filter((_, index) => index !== itemIndex);

  window.localStorage.setItem('myDiaryList', JSON.stringify(filteredList));

  alert('일기가 삭제되었습니다.');

  showDiary();
};

const toggleMenu = () => {
  const menu = document.querySelectorAll('.menu-list li');
  const content = document.querySelectorAll('.content');

  menu.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      menu.forEach((menu) => {
        menu.classList.remove('active');
      });

      content.forEach((content) => {
        content.classList.remove('active');
      });

      menu[index].classList.add('active');
      content[index].classList.add('active');
    });
  });
};

let startPage = 1;
let clickedPage = 1;
const lastPage = Math.ceil(diaries?.length / 4);

const prevPage = () => {
  if (startPage === 1) {
    alert('처음입니다. 더 이상 내려갈 수 없어요.');
    return;
  } else {
    startPage = startPage - 5;
    clickedPage = startPage;
    renderPageNumber();
    renderPageList(clickedPage);
  }
};
const nextPage = () => {
  startPage = startPage + 5;

  if (startPage <= lastPage) {
    clickedPage = startPage;
    renderPageNumber();
    renderPageList(clickedPage);
  } else {
    alert('마지막입니다. 더 이상 불러올 수 없어요.');
    return;
  }
};
const renderPageList = (pageListNumber) => {
  const pageList = diaries.filter((_, index) => {
    const showNumber = 4;
    const skipNumber = (pageListNumber - 1) * showNumber;

    if (skipNumber <= index && index < skipNumber + showNumber) {
      return true;
    } else {
      return false;
    }
  });

  document.querySelector('.panel-list').innerHTML = renderData(pageList);
};

const renderPageNumber = () => {
  const numberArray = new Array(4).fill(1);

  const pages = numberArray
    .map((_, index) => {
      const pageNumber = index + startPage;

      return pageNumber <= lastPage
        ? `
      <li class="${clickedPage === pageNumber ? 'page-number active' : 'page-number'}">
        <button type="button" href="" onclick="renderPageList(${pageNumber}); clickedPage = ${pageNumber}; renderPageNumber();"
        >${pageNumber}</button>
      </li>
    `
        : '';
    })
    .join('');

  document.querySelector('.page-list').innerHTML = pages;
};
