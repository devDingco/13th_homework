const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const itemNumber = parameters.get('number');

window.onload = () => {
  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);

  document.querySelector('#input-title').value = diaryList[itemNumber].title;
  document.querySelector('#input-content').value = diaryList[itemNumber].content;
  window.document.getElementsByName('emotion').forEach((el) => {
    if (el.id === diaryList[itemNumber].emotion) el.checked = true;
  });
};

const skew = (elem, number) => {
  elem.style = `transform: skew(${number}deg)`;
};

const clickHandler = () => {
  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);
  const buttonEdit = document.querySelector('.button-edit');

  const newTitle = document.querySelector('#input-title').value;
  const newContent = document.querySelector('#input-content').value;
  const newEmotion =
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
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDay()).padStart(2, '0');
  const newDate = `${year}. ${month}. ${day}`;

  diaryList[itemNumber] = {
    title: newTitle,
    content: newContent,
    emotion: newEmotion,
    createdAt: newDate,
  };

  window.localStorage.setItem('myDiaryList', JSON.stringify(diaryList));

  skew(buttonEdit, 5);

  location.replace(`./detail.html?number=${itemNumber}`);
};

const goToBack = () => {
  window.location.replace(`./detail.html?number=${itemNumber}`);
};
