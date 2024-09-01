

// 수정 상세페이지 내용 셋팅용
const diaryEditData = () => {
  const diaryId = queryStringGet();
  const diary = diaryArr[diaryId];

  const moodTypeRadio = document.querySelectorAll('input[name="moodType"]');
  const diaryTitle = document.querySelector('.diaryTitle');
  // const diaryDesc = document.querySelector('.diaryDesc');

  const diaryMood = Array.from(moodTypeRadio).find((radio) => radio.value === diary.moodType);
  diaryMood.checked = true;
  diaryTitle.value = diary.title;

  editor.setContents(diary.content);
  // diaryDesc.value = diary.content;
}
diaryEditData();

// 일기 수정하기 함수
const diaryModifySave = () => {
  const diaryId = queryStringGet();
  const moodTypeValue = document.querySelector("input[name='moodType']:checked").value;
  console.log(moodTypeValue);
  const diaryTitle = document.querySelector(".diaryTitle").value;
  console.log(diaryTitle);
  // const diaryDesc = document.querySelector(".diaryDesc").value;
  // console.log(diaryDesc);

  console.log(editor.getContents());
  const diary = {
    moodType: moodTypeValue,
    writeDate: diaryArr[diaryId].writeDate,
    modifyDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    title: diaryTitle,
    content: editor.getContents(),
    id: diaryId,
  };

  diaryArr[diaryId] = diary;
  // console.log(diary);
  localStorage.setItem("diaryArray", JSON.stringify(diaryArr));

  alert("수정이 완료되었습니다.");
  location.href = "./detail.html?diaryId=" + diaryId;

}

