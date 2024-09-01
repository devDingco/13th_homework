
// 다이어리 리스트 노출 함수
const diaryListSet = (arr) => {
  const diaryElement = document.querySelector(".diaryList");

  if (arr.length === 0) {
    console.log("작성된 일기가 없습니다.");
    return diaryElement.innerHTML = "<p class='empty'>등록된 일기가 없습니다.</p>";
  } else {
    diaryElement.innerHTML = "";
  }

  let diaryUl = diaryElement.querySelector('ul');
  if (!diaryUl) {
    // 다이어리 리스트가 없을 경우 ul 생성
    diaryUl = document.createElement("ul");
    diaryElement.appendChild(diaryUl);
  }

  // console.log(arr);
  diaryUl.innerHTML = arr.map((diary, index) => {
    const moodType = diary.moodType;
    const moodTypeInfo = moodTypeSet[moodType];
    return `<li>
      <a href="./detail.html?diaryId=${index}">
      <figure>
        <img src="${moodTypeInfo.imgSrc}" alt="오늘의 기분 ${moodType}" />
        <figcaption>
          <div class="infoTop">
            <span class="moodText moodTextType${moodTypeInfo.colorNum}">${moodType}</span>
            <span class="diaryDate">${diary.writeDate}</span>
          </div>
          <h3>${diary.title}</h3>
        </figcaption>
      </figure>
      </a>
    </li>
    `;
  }).join("");
}

diaryListSet(diaryArr);

// 일기 내용 작성 확인에 따른 저장 버튼 활성화 함수
const textCheck = (e) => {
  const diaryTitle = document.querySelector(".diaryTitle");
  const diaryDesc = document.querySelector(".diaryDesc");
  if (diaryTitle.value.length > 0 && diaryDesc.value.length > 0) {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.add("active");
    diaryWriteBtn.disabled = false;
  } else {
    const diaryWriteBtn = document.querySelector(".diaryWriteBtn");
    diaryWriteBtn.classList.remove("active");
    diaryWriteBtn.disabled = true;
  }
}

// 일기 저장 함수
const diarySave = () => {


  const moodTypeValue = document.querySelector("input[name='moodType']:checked").value;
  console.log(moodTypeValue);
  const diaryTitle = document.querySelector(".diaryTitle").value;
  console.log(diaryTitle);
  const diaryDesc = document.querySelector(".diaryDesc").value;
  console.log(diaryDesc);

  const diary = {
    moodType: moodTypeValue,
    writeDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    title: diaryTitle,
    content: diaryDesc
  };

  diaryArr.push(diary);
  localStorage.setItem("diaryArray", JSON.stringify(diaryArr));

  diaryListSet(diaryArr);

}



// 일기 필터에 따른 노출 처리 함수
const moodFilter = () => {
  // select option 값 가져오기
  const moodType = document.querySelector(".diaryFilter option:checked").value;
  console.log(moodType);

  // 필터에서 선택한 기분값에 따른 저장된 일기 필터링리스트
  const diaryFilterList = diaryArr.filter((diary) => {
    const diaryMoodType = diary.moodType; // 저장된 일기의 기분 값
    return moodType === diaryMoodType
  })

  // 필터링된 일기 리스트 노출 : 전체 선택시 전체 리스트 노출
  diaryListSet(moodType === "전체" ? diaryArr : diaryFilterList);

  console.log(diaryFilterList);
}