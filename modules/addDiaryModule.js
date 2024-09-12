// 일기 추가 모달 유효성검사
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

// 일기 추가 기능
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
