// ! 글쓰기용 에디터 생성 함수
let editor;
const editorSet = () => SUNEDITOR.create(
  document.getElementById('editArea'), {
  mode: 'classic',
  placeholder: '내용을 입력해주세요.',
  stickyToolbar: "",
  buttonList: [
    // ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['blockquote', 'bold', 'underline', 'italic', 'strike'],
    ['fontColor', 'hiliteColor', 'textStyle'],
  ],
  lang: SUNEDITOR_LANG['ko'],
})


// !일기 내용 작성 확인에 따른 저장 버튼 활성화 함수
const diaryWriteInputCheck = () => {
  const diaryMood = document.querySelectorAll(".moodTypeRadio input:checked").length;
  const diaryTitle = document.querySelector(".diaryTitle").value.length;
  const diaryDesc = document.querySelector(".sun-editor-editable").innerText.replace(/\s/g, '').replace(/\n/g, '').length;
  // console.log(diaryMood, diaryTitle, diaryDesc);

  if (diaryTitle > 0 && diaryDesc > 0 && diaryMood > 0) {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.add("active");
    diaryWriteBtn.disabled = false;
  } else {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.remove("active");
    diaryWriteBtn.disabled = true;
  }
}

