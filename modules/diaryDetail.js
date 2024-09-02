const queryString = location.search;
const queryData = new URLSearchParams(queryString);

const viewEl = document.getElementById('view');
const editEl = document.getElementById('edit');

const titleViewEl = document.getElementById('titleView');
const feelingTextEl = document.getElementById('feeling_text');
const createdAtEl = document.getElementById('createdAtDate');
const contentTextEl = document.getElementById('contentText');
const feelingCircleEl = document.getElementById('feeling_circle');
const detailEditButton = document.getElementById('detailEdit');
const editTitleInputEl = document.getElementById('editTitleInput');
const editContentInputEl = document.getElementById('editContentInput');
const feelingRadios = document.getElementsByName('feeling');
const submitButton = document.getElementById('submitBtn');
const cancelButton = document.getElementById('cancelBtn');

let queryId = queryData.get('id');
let diaryListArray;
let diaryDetail;

const feelingText = {
  angry: '화나요',
  etc: '기타',
  happy: '행복해요',
  sad: '슬퍼요',
  surprised: '놀랐어요',
};

const loadData = () => {
  queryId = queryData.get('id');
  diaryListArray = JSON.parse(localStorage.getItem('diaryListArray'));

  diaryDetail = diaryListArray.find((diaryData) => diaryData.id === queryId);

  titleViewEl.innerText = `${diaryDetail.title}`;
  feelingTextEl.innerText = `${feelingText[diaryDetail.feeling]}`;
  createdAtEl.innerText = `${diaryDetail.createdAt} 작성`;
  contentTextEl.innerText = `${diaryDetail.content}`;
  feelingTextEl.className = `${diaryDetail.feeling}`;
  feelingCircleEl.className = `${diaryDetail.feeling}`;

  editTitleInputEl.value = `${diaryDetail.title}`;
  editContentInputEl.value = `${diaryDetail.content}`;

  feelingRadios.forEach((el) => {
    if (el.id === diaryDetail.feeling) {
      el.checked = true;
    }
  });
};
loadData();

let changedFeeling;
let changedDetail;

const classNameChange = (element, remove, add) => {
  element.classList.remove(remove);
  element.classList.add(add);
};

detailEditButton.addEventListener('click', () => {
  classNameChange(viewEl, 'view', 'none');
  classNameChange(editEl, 'none', 'edit');
});

const onChangeInputValidation = () => {
  document.getElementsByName('feeling').forEach((el) => {
    if (el.checked) {
      changedFeeling = el.id;
    }
  });

  classNameChange(submitButton, 'active', 'none');
  submitButton.disabled = true;

  const titleValue = document.getElementById('editTitleInput').value;
  const contentValue = document.getElementById('editContentInput').value;

  titleValue &&
  contentValue &&
  changedFeeling &&
  (diaryDetail.title !== titleValue ||
    diaryDetail.content !== contentValue ||
    changedFeeling !== diaryDetail.feeling)
    ? (classNameChange(submitButton, 'none', 'active'),
      (submitButton.disabled = false))
    : (classNameChange(submitButton, 'active', 'none'),
      (submitButton.disabled = true));
};

const onEditDiary = (e) => {
  e.preventDefault();

  const titleValue = document.getElementById('editTitleInput').value;
  const contentValue = document.getElementById('editContentInput').value;

  let prevDiaryIndex;
  diaryListArray.forEach((diaryData, index) => {
    if (diaryData.id === queryId) {
      return (prevDiaryIndex = index);
    }
  });

  diaryListArray.splice(prevDiaryIndex, 1, {
    id: diaryDetail.id,
    title: titleValue,
    content: contentValue,
    feeling: changedFeeling,
    createdAt: diaryDetail.createdAt,
    isEdit: dateFormatter(),
  });
  console.log(diaryListArray);
  localStorage.setItem('diaryListArray', JSON.stringify(diaryListArray));

  classNameChange(submitButton, 'active', 'none');
  submitButton.disabled = true;
  classNameChange(viewEl, 'none', 'view');
  classNameChange(editEl, 'edit', 'none');
  loadData();
};

const onCancleEdit = () => {
  editTitleInputEl.value = `${diaryDetail.title}`;
  editContentInputEl.value = `${diaryDetail.content}`;

  feelingRadios.forEach((el) => {
    if (el.id === diaryDetail.feeling) {
      el.checked = true;
    }
  });
  classNameChange(viewEl, 'none', 'view');
  classNameChange(editEl, 'edit', 'none');
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

submitButton.addEventListener('click', onEditDiary);
cancelButton.addEventListener('click', onCancleEdit);

document
  .querySelectorAll("#edit input[type='text'], #edit textarea")
  .forEach((input) => {
    input.addEventListener('input', onChangeInputValidation);
  });

document.querySelectorAll("#edit input[type='radio']").forEach((radioBtn) => {
  radioBtn.addEventListener('change', onChangeInputValidation);
});
