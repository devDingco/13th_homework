// !일기 내용 작성 확인에 따른 저장 버튼 활성화 함수
const textCheck = (getText) => {
  const diaryTitle = document.querySelector(".diaryTitle").value;
  const diaryDesc = getText ? getText : "";

  if (diaryTitle.length > 0 && diaryDesc.length > 0) {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.add("active");
    diaryWriteBtn.disabled = false;
  } else {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.remove("active");
    diaryWriteBtn.disabled = true;
  }
}


// ! 글쓰기용 에디터 생성 함수
const editor = SUNEDITOR.create(
  document.getElementById('editArea'), {
  mode: 'classic',
  placeholder: '내용을 입력해주세요.',
  buttonList: [
    // ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['blockquote', 'bold', 'underline', 'italic', 'strike'],
    ['fontColor', 'hiliteColor', 'textStyle'],
  ],
  lang: SUNEDITOR_LANG['ko'],
});
editor.placeholder = "내용을 입력해주세요";
editor.onChange = (event, core) => {
  const getText = core.getContents().replace(/<[^>]*>?/g, '') // 태그 제거
  const locationCheck = location.href.includes("index.html"); // index.html 페이지에서만 실행
  locationCheck ? textCheck(getText) : "";
}



