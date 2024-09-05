const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const itemNumber = parameters.get('number');

window.onload = () => {
  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);

  const diaryDetail = diaryList[itemNumber];

  let emotion = diaryDetail.emotion;
  let emotionText;
  let emotionImage;

  switch (emotion) {
    case 'happy':
      emotionText = '행복해요';
      emotionImage = './assets/images/icon_emotion_happy.png';
      break;
    case 'sad':
      emotionText = '슬퍼요';
      emotionImage = './assets/images/icon_emotion_sad.png';
      break;
    case 'surprising':
      emotionText = '놀랐어요';
      emotionImage = './assets/images/icon_emotion_surprising.png';
      break;
    case 'angry':
      emotionText = '화나요';
      emotionImage = './assets/images/icon_emotion_angry.png';
      break;
    case 'etc':
      emotionText = '기타';
      emotionImage = './assets/images/icon_emotion_etc.png';
      break;
  }

  const line = diaryDetail.content
    .split('\n')
    .map((item) => `<p>${item}<br/></p>`)
    .join('');

  document.querySelector('.detail-title').innerHTML = `<h2>${diaryDetail.title}</h2>`;
  document.querySelector('.badge-emoticon').innerHTML = `<span>${emotionText}</span>`;
  document.querySelector('.emotion-thumbnail').innerHTML = `<img src="${emotionImage}" alt="" />`;
  document.querySelector('.detail-date').innerHTML = `${diaryDetail.createdAt} 작성</span>`;
  document.querySelector('.detail-content-text').innerHTML = `
  <p>${line}</p>`;
};

const goToEdit = () => {
  window.location.href = `./edit.html?number=${itemNumber}`;
};

const deleteItem = () => {
  const diaryListString = window.localStorage.getItem('myDiaryList') !== null ? window.localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);
  if (itemNumber !== null) {
    const filteredList = diaryList.filter((_, index) => index !== parseInt(itemNumber));

    console.log(typeof itemNumber);
    console.log(filteredList);

    window.localStorage.setItem('myDiaryList', JSON.stringify(filteredList));

    alert('일기가 삭제되었습니다.');

    location.replace('./index.html');
  }
};
