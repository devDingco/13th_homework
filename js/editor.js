// 에디터 생성 함수
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
editor.onInput = () => {
  textCheck();
}

console.log("d");