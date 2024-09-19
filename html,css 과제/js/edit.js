
// !일기 수정하기 컴포넌트 불러오기
const diaryModifyBoxRender = () => {
  // ~일기 수정하기와 일기쓰기 구분
  const diaryModifyElement = document.querySelector(".editWrap .diaryWrite");
  diaryModifyElement.innerHTML = `
        ${diaryMoodTypeRender()}
        <div class="diaryContent">
          <label>
            <span>제목</span>
            <input
              class="diaryTitle"
              type="text"
              placeholder="제목을 입력해 주세요."
            />
          </label>
          <label>
            <span>내용</span>
            <textarea id="editArea" class="diaryDesc"></textarea>
          </label>
        </div>
      <div class="buttonBox">
        <button class="whiteBtn" onclick="history.back()">취소</button></button>
        <button class="diaryModifyBtn blackBtn" onclick="diaryModifySave()">수정하기</button>
      </div>`;
}
diaryModifyBoxRender();


// !수정 상세페이지 내용 셋팅용
const diaryEditData = () => {
  editor = editorSet() // 에디터 함수 호출

  const diaryQueryId = queryStringGet();
  const diary = diaryArr.find((diary) => diary.id === diaryQueryId); // 수정할 일기 데이터를 아이디 값으로 찾아옴
  // console.log(diary);

  const moodTypeRadio = document.querySelectorAll('input[name="moodType"]');
  const diaryTitle = document.querySelector('.diaryTitle');
  // const diaryDesc = document.querySelector('.diaryDesc');

  const diaryMood = Array.from(moodTypeRadio).find((radio) => radio.value === diary.moodType);
  diaryMood.checked = true;
  diaryTitle.value = diary.title;

  editor.setContents(diary.content);
}
diaryEditData();

// !일기 수정하기 함수
const diaryModifySave = () => {
  const diaryId = queryStringGet();
  const moodTypeValue = document.querySelector("input[name='moodType']:checked").value;
  console.log(moodTypeValue);
  const diaryTitle = document.querySelector(".diaryTitle").value;
  console.log(diaryTitle);

  const diaryDataFind = diaryArr.filter((diary) => diary.id === diaryId)[0];

  diaryDataFind.moodType = moodTypeValue;
  diaryDataFind.title = diaryTitle;
  diaryDataFind.content = editor.getContents();
  diaryDataFind.modifyDate = new Date().toISOString().slice(0, 10).replace(/-/g, ".");

  const newDiaryArr = diaryArr.map((diary) => {
    if (diary.id === diaryId) {
      return diaryDataFind;
    }
    return diary;
  });
  console.log("수정한 데이터 확인", newDiaryArr);

  localStorage.setItem("diaryArray", JSON.stringify(newDiaryArr));
  alert("수정이 완료되었습니다.");
  location.href = "./detail.html?diaryId=" + diaryId;

}



