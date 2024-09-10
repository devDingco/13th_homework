// 날짜 포맷 util
function dateFormatter() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}.${month >= 10 ? month : '0' + month}.${date
    .toString()
    .padStart(2, '0')}`;
}

// 클래스명 변경 util
function classNameChange(element, remove, add) {
  element.classList.remove(remove);
  element.classList.add(add);
}

// 제출 버튼 클래스명 변경
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

export { dateFormatter, classNameChange, submitButtonStyleChange };
