const skew = (elem, number) => {
  elem.style = `transform: skew(${number}deg)`;
};

const clickHandler = () => {
  const diaryListString = localStorage.getItem('myDiaryList') !== null ? localStorage.getItem('myDiaryList') : '[]';
  const diaryList = JSON.parse(diaryListString);
  const buttonEdit = document.querySelector('.button-edit');

  skew(buttonEdit, 5);
};
