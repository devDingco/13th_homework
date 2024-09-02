
const diaryArray = [
  // {
  //   moodType: "슬퍼요",
  //   writeDate: "2021-07-01",
  //   title: "타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다.",
  //   content: "내용 영역입니다."
  //   id: 1,
  //   comment:[
  //     { commentId: 1, content: "댓글내용" },
  //   ]
  // },
];

const moodTypeSet = {
  슬퍼요: { imgSrc: "./img/mood_1.png", colorNum: 1, imgSrcS: "./img/슬퍼요(s).png" },
  놀랐어요: { imgSrc: "./img/mood_2.png", colorNum: 2, imgSrcS: "./img/놀랐어요(s).png" },
  화나요: { imgSrc: "./img/mood_3.png", colorNum: 3, imgSrcS: "./img/화나요(s).png" },
  행복해요: { imgSrc: "./img/mood_4.png", colorNum: 4, imgSrcS: "./img/행복해요(s).png" },
  기타: { imgSrc: "./img/mood_5.png", colorNum: 5, imgSrcS: "./img/기타(s).png" },
};

const headerBox = () => {
  const headerElement = document.querySelector("header");
  if (!headerElement) return
  headerElement.innerHTML = `
      <h1><span class="userName"></span>의 다이어리</h1>
      <!-- <fieldset class="toggleSwitch">
        <label>
          <input role="switch" type="checkbox" />
          <span>다크모드</span>
        </label>
      </fieldset> -->
  `
}
headerBox();

const headerBanner = () => {
  const headerBanner = document.querySelector(".headerBanner");
  if (!headerBanner) return
  headerBanner.innerHTML = `
  <img src="./img/mainBanner.jpeg" alt="메인이미지입니다." />
  `;
}
headerBanner();


const navMenu = () => {
  const navElement = document.querySelector("nav");
  if (!navElement) return
  const navMenu = document.createElement("ul");
  navMenu.classList.add("navMenu");
  navMenu.innerHTML = `
    <li class="active"><a href="./index.html">일기보관함</a></li>
    <li>사진보관함</li>
  `;
  navElement.prepend(navMenu);
}
navMenu();

const footerBox = () => {
  const footerElement = document.querySelector("footer");
  if (!footerElement) return
  footerElement.innerHTML = `
    <div class="footerInner">
        <h2><span class="userName"></span>의 다이어리</h2>
        <p><span class="userName"></span>의 일상을 기록하는 공간입니다.</p>
        <p>© 2024. All rights reserved.</p>
    </div>
  `
}
footerBox();

// 로컬에 저장된 일기 데이터 가져오기 함수
const diaryArrGet = () => {
  if (!localStorage.getItem("diaryArray")) {
    // 로컬스토리지에 diaryArray가 없을 경우 위에 선언한 diaryArray를 저장
    localStorage.setItem("diaryArray", JSON.stringify(diaryArray));
  }

  // 로컬스토리지에 저장된 diaryArray를 가져와서 변수에 저장
  const diaryArr = JSON.parse(localStorage.getItem("diaryArray"));
  return diaryArr;
}

const diaryArr = diaryArrGet();

// 일기 쓰기 컴포넌트 불러오기
const diaryWriteBox = () => {
  const diaryWriteElement = document.querySelector(".diaryWrite");
  if (!diaryWriteElement) {
    return;
  }
  const diaryModifyElement = document.querySelector(".editWrap .diaryWrite");
  const diaryWrite = !diaryModifyElement ? diaryWriteElement : diaryModifyElement;
  let title = !diaryModifyElement
    ? `<h3>📍<span class="userName"></span>의 일기 쓰기</h3>`
    : ""
  let button = !diaryModifyElement
    ? `<button class="diaryWriteBtn" onclick="diarySave()" disabled>
        등록하기
      </button>`
    : `<div class="buttonBox">
        <button class="whiteBtn" onclick="location.href='index.html'">취소</button></button>
        <button class="diaryModifyBtn blackBtn" onclick="diaryModifySave()">수정 하기</button>
       </div>`

  let checked = !diaryModifyElement ? "checked" : "";
  let textCheck = !diaryModifyElement ? "oninput='textCheck()'" : "";
  diaryWrite.innerHTML = `
        ${title}
        <div>
          <div class="moodTypeRadio">
            <span>오늘 기분은 어땠나요?</span>
            <div class="radioWrap">
              <label
                ><input
                  type="radio"
                  name="moodType"
                  value="행복해요"
                  ${checked}
                />행복해요</label
              >
              <label
                ><input
                  type="radio"
                  name="moodType"
                  value="슬퍼요"
                />슬퍼요</label
              >
              <label
                ><input
                  type="radio"
                  name="moodType"
                  value="놀랐어요"
                />놀랐어요</label
              >
              <label
                ><input
                  type="radio"
                  name="moodType"
                  value="화나요"
                />화나요</label
              >
              <label
                ><input type="radio" name="moodType" value="기타" />기타</label
              >
            </div>
          </div>
        </div>

        <div class="diaryContent">
          <label>
            <span>제목</span>
            <input
              class="diaryTitle"
              type="text"
              placeholder="제목을 입력해 주세요."
              ${textCheck}
            />
          </label>
          <label>
            <span>내용</span>
            <textarea
              id="editArea"
              class="diaryDesc"
              placeholder="내용을 입력해 주세요."
              ${textCheck}
            ></textarea>
          </label>
        </div>

      ${button}
 `;

}
diaryWriteBox();

// 쿼리에서 diaryId 가져오는 함수
const queryStringGet = () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('diaryId');
  return Number(id);
}


// 이름 설정
const nameSet = () => {
  let userName;
  if (!localStorage.getItem("userName")) {
    userName = prompt("이름을 적어주세요: ");
    localStorage.setItem("userName", userName);
  } else {
    userName = localStorage.getItem("userName");
  }
  const nameElement = document.querySelectorAll(".userName");
  nameElement.forEach((element) => {
    element.innerText = userName;
  });
}
nameSet();




// 셀렉트 박스 클릭시 필터 항목들 보이도록 처리 함수
const optionShow = (event) => {
  const eventTarget = event.target; // 클릭한 요소
  console.log(eventTarget);
  eventTarget.parentNode.querySelector(".filterList").classList.toggle("show");
}



// 필터 항목 클릭시 선택된 값으로 변경 함수
const optionSelect = (event, type) => {
  const optionTarget = event.target;
  const optionValue = optionTarget.innerText;

  const selectButton = optionTarget.parentNode.parentNode.querySelector("button")
  selectButton.innerText = optionValue;

  const listLi = optionTarget.parentNode.querySelectorAll("li")
  Array.from(listLi).map((li) => {
    if (li === optionTarget) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  })

  optionTarget.parentNode.classList.remove("show");

  // 옵션선택과 타입에 따른 노출 처리 함수 호출
  if (type === 'moodFilter') {
    moodFilter(optionValue)
    // diaryListSet(diaryArr);
  }
}


// 게시글 삭제 함수
const deleteBtn = (event, id) => {
  event.preventDefault(); // 이벤트 전파 중지

  // id : 삭제할 게시글의 id값
  const diaryDelArr = diaryArr.filter((diary, index) => diary.id !== id);
  console.log(diaryDelArr);

  const prompt = confirm('정말 삭제하시겠습니까?');
  if (prompt) {
    const diaryDelArr = diaryArr.filter((diary, index) => diary.id !== id);
    localStorage.setItem('diaryArray', JSON.stringify(diaryDelArr));
    alert('삭제가 완료되었습니다.');
    location.href = './index.html';
  }
}


// 스크롤 상단으로 이동 함수
const scrollTopAction = () => {
  const windowScrollTop = window.scrollY;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}