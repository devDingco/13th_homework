
// !다이어리 리스트 노출 함수
const diaryListSet = (arr) => {
  const diaryElement = document.querySelector(".diaryList");

  if (arr.length === 0) {
    // console.log("작성된 일기가 없습니다.");
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
    const diaryId = diary.id;
    const moodColorNum = moodTypeInfo.colorNum;
    // console.log(diaryId);
    return `<li>
    <a href="./detail.html?diaryId=${diaryId}&#commentListWrap">
    <button class="closeBtn" onclick="diaryDeletePop(event,${diaryId})">
    <img src="./img/close_outline_light_m.svg" alt="일기 삭제 버튼">
    </button>
      <figure>
        <div class="imgBox imgBox_${moodColorNum}"><img src="${moodTypeInfo.imgSrc}" alt="오늘의 기분 ${moodType}" /></div>
        <figcaption>
          <div class="infoTop">
            <span class="moodText moodTextType${moodColorNum}">${moodType}</span>
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




// !일기 쓰기 취소 팝업창 렌더링 함수
const writeCancelPop = () => popupRender("writeCancelPop",
  `<h3>일기 등록 취소</h3>
  <p>일기 등록을 취소하시겠습니까?</p>
  <div class="buttonWrap">
  <button class="whiteBtn" onclick="popupClose('.writeCancelPop');">계속 작성</button>
  <button class="blackBtn" onclick="popupClose('.diaryWritePop'); popupClose('.writeCancelPop')">등록 취소</button>
  </div>`
  , "alert"
);


// !일기 쓰기 클릭시 일기 쓰기 팝업창 렌더링 함수
const diaryWritePop = () => {
  popupRender("diaryWritePop",
    `<div class="diaryWrite">
    <h3>📍<span class="userName"></span>의 일기 쓰기</h3>
          <div class="diaryWriteInner">
          ${diaryMoodTypeRender()}
          <div class="diaryContent">
            <label>
              <span>제목</span>
              <input
                class="diaryTitle"
                type="text"
                placeholder="제목을 입력해 주세요."
                oninput='diaryWriteInputCheck()'
              />
            </label>
            <label>
              <span>내용</span>
              <textarea id="editArea"></textarea>
            </label>
          </div>
          </div>
          <div class="buttonWrap">
            <button onclick="writeCancelPop()">닫기</button>
            <button class="diaryWriteBtn" onclick="diarySave()" disabled>
              등록하기
            </button>
          </div>
      </div>`) // 팝업창 렌더링 함수 호출

  editor = editorSet(); // 팝업 오픈 후 에디터 함수 호출
  editor.onChange = (event, core) => {
    console.log(core.getContents());
    location.href.includes("index.html") && diaryWriteInputCheck()
  }
}



// !일기 저장 함수
const diarySave = () => {
  const moodTypeValue = document.querySelector("input[name='moodType']:checked").value;
  const diaryTitle = document.querySelector(".diaryTitle").value;
  const diaryDesc = editor.getContents();
  const setId = diaryArr.length + 1; // id값은 배열 길이 + 1

  const diary = {
    moodType: moodTypeValue,
    writeDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    title: diaryTitle,
    content: diaryDesc,
    id: setId
  };

  diaryArr.push(diary);
  localStorage.setItem("diaryArray", JSON.stringify(diaryArr));

  diaryListSet(diaryArr);

  // 입력창 초기화
  document.querySelector(".diaryTitle").value = "";
  editor.setContents("");
  document.querySelector("input[name='moodType']:checked").checked = false;
  document.querySelector(".diaryWriteBtn").classList.remove("active");

  // 등록 완료 팝업 노출 
  popupRender("saveCompletePop",
    `<h3>일기 등록 완료</h3>
    <p>등록이 완료 되었습니다.</p>
    <button class="oneBtn blackBtn" onclick="popupClose('.saveCompletePop'); popupClose('.diaryWritePop')">확인</button>`
    , "alert"
  );

}

// !일기 필터에 따른 노출 처리 함수
const moodFilter = (optionValue) => {
  // // select option 값 가져오기
  // const moodType = document.querySelector(".diaryFilter option:checked").value;
  const moodType = optionValue;
  console.log(moodType);

  // 필터에서 선택한 기분값에 따른 저장된 일기 필터링리스트
  const diaryFilterList = diaryArr.filter((diary) => {
    const diaryMoodType = diary.moodType; // 저장된 일기의 기분 값
    return moodType === diaryMoodType
  })

  // 필터링된 일기 리스트 노출 : 전체 선택시 전체 리스트 노출
  diaryListSet(moodType === "전체" ? diaryArr : diaryFilterList);

  // console.log(diaryArr);
}


// !검색 필터 옵션 선택에 따른 처리 함수
const searchFilter = (event) => {
  const searchType = event.target.parentNode.querySelector(".searchFilter li.active").dataset.value; // 검색 옵션 값
  const searchValue = event.target.value; // 검색어 값

  console.log(searchType, searchValue);
  if (event.key === "Enter") {
    // 필터에서 선택한 기분값에 따른 저장된 일기 필터링리스트
    const diaryFilterList = diaryArr.filter((diary) => {
      const diaryTitle = diary.title;
      const diaryContent = diary.content.replace(/<[^>]*>?/g, ''); // html 태그 제거한 텍스트 내용만 가져오기
      console.log(diaryTitle, diaryContent);

      if (searchType === "제목") {
        return diaryTitle.includes(searchValue);
      } else if (searchType === "내용") {
        return diaryContent.includes(searchValue);
      } else
        if (searchType === "제목+내용") {
          return diaryTitle.includes(searchValue) || diaryContent.includes(searchValue);
        }
    })

    // 필터링된 일기 리스트 노출
    diaryListSet(diaryFilterList);

  }
}


// !스크롤시 필터 고정 관련 스타일 추가 함수
const stickyAddStyle = () => {
  const scrollY = window.scrollY;
  const stickyEl = document.querySelector('.navBottom')
  const elTop = stickyEl.offsetTop - 20;
  // console.log(scrollY, elTop);
  if (scrollY >= elTop) {
    stickyEl.classList.add('stickyAddStyle');
  } else {
    stickyEl.classList.remove('stickyAddStyle');
  }

}
window.addEventListener('scroll', stickyAddStyle);


// !모바일 검색버튼 클릭시 검색창 노출 처리용 함수
const searchShow = () => {
  const searchBox = document.querySelector('.searchBox');
  const searchMobilePopBtn = document.querySelector('.searchMobilePopBtn');

  searchBox.classList.toggle('active');
  searchMobilePopBtn.classList.toggle('active');
}