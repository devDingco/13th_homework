let diaryList;

const showDiary = () => {
  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);

  if (diaryList.length !== 0) {
    const diaryHTML = diaryList.map(
      (el, index) => `
    <li class="panel-item">
      <a href="./diary-detail.html?pageNumber=${index}">
        <div class="emotion-card">
        ${el.emotion === 'happy' ? '<img src="./assets/images/image_emotion_happy.png" alt="" />' : ''}
        ${el.emotion === 'sad' ? '<img src="./assets/images/image_emotion_sad.png" alt="" />' : ''}
        ${el.emotion === 'surprising' ? '<img src="./assets/images/image_emotion_surprising.png" alt="" />' : ''}
        ${el.emotion === 'angry' ? '<img src="./assets/images/image_emotion_angry.png" alt="" />' : ''}
        ${el.emotion === 'etc' ? '<img src="./assets/images/image_emotion_etc.png" alt="" />' : ''}
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

    const diaries = diaryHTML.join('');
    document.querySelector('.panel-list').innerHTML = diaries;
  } else {
    const diaryHTML = `<li class="no-content">
    <p>등록된 일기가 없습니다.<br />오늘의 감정을 기록해 보세요!</p>
  </li>`;

    document.querySelector('.panel-list').innerHTML = diaryHTML;
  }
};

window.onload = () => {
  showDiary();
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

  let previousData = JSON.parse(localStorage.getItem('myDiaryList')) || [];

  diaryList = [...previousData, data];

  localStorage.setItem('myDiaryList', JSON.stringify(diaryList));

  showDiary();
};

const filterEmotion = (event) => {
  const target = event.target.value;
  const convertedTarget = target === '행복해요' ? 'happy' : target === '슬퍼요' ? 'sad' : target === '화나요' ? 'angry' : target === '놀랐어요' ? 'surprising' : target === '기타' ? 'etc' : '';

  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);

  const filteredList = diaryList.filter((el) => el.emotion == convertedTarget);

  const filteredListHTML = filteredList.map(
    (el, index) => `
  <li class="panel-item">
      <a href="./diary-detail.html?pageNumber=${index}">
        <div class="emotion-card">
        ${el.emotion === 'happy' ? '<img src="./assets/images/image_emotion_happy.png" alt="" />' : ''}
        ${el.emotion === 'sad' ? '<img src="./assets/images/image_emotion_sad.png" alt="" />' : ''}
        ${el.emotion === 'surprising' ? '<img src="./assets/images/image_emotion_surprising.png" alt="" />' : ''}
        ${el.emotion === 'angry' ? '<img src="./assets/images/image_emotion_angry.png" alt="" />' : ''}
        ${el.emotion === 'etc' ? '<img src="./assets/images/image_emotion_etc.png" alt="" />' : ''}
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

  document.querySelector('.panel-list').innerHTML = filteredListHTML.join('');
};