
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
  const name = localStorage.getItem("userName");
  // <h1 class="glitch-wrapper"><a class="glitch" data-text="${name}의 다이어리" href="./index.html"><span class="userName"></span>의 다이어리</h1></a>
  headerElement.innerHTML = `
      <h1><a data-text="${name}의 다이어리" href="./index.html"><span class="userName"></span>의 다이어리</h1></a>
      <fieldset class="toggleSwitch">
        <label>
          <input role="switch" type="checkbox" />
          <span>다크모드</span>
        </label>
      </fieldset>
  `
}
headerBox();

const headerBanner = () => {
  const headerBanner = document.querySelector(".headerBanner");
  if (!headerBanner) return
  headerBanner.innerHTML = `
  <swiper-container class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="0"
    centered-slides="true" autoplay-delay="2500" autoplay-disable-on-interaction="false">
    <swiper-slide><img src="./img/mainBanner.jpeg" alt="메인이미지입니다." /></swiper-slide>
    <swiper-slide><img src="./img/mainBanner.jpeg" alt="메인이미지입니다." /></swiper-slide>
  </swiper-container>
  `
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

// 상세페이지 상단 헤더 렌더링 함수
const detailHeaderTop = () => {
  const detailHeaderElement = document.querySelector(".detailHeaderTop");
  if (!detailHeaderElement) return
  const title = detailHeaderElement.innerText;
  detailHeaderElement.innerHTML = `
   <a href="javascript:window.history.back()">
   <img src="./img/back_outline_light_m.svg" alt="왼쪽화살표" />
   </a>${title}
  `
}
detailHeaderTop();


// !로컬에 저장된 일기 데이터 가져오기 함수
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




// !일기 쓰기의 기분 선택 라디오 랜더링 함수
const diaryMoodTypeRender = () => {
  const moodRadio = Object.keys(moodTypeSet).map((key) => {
    return `<label>
     <input
        type="radio"
        name="moodType"
        value="${key}"
        oninput='textCheck()'
      />${key}
     </label>
    `
  }).join("");
  return `<div class="moodTypeRadio">
  <span>오늘 기분은 어땠나요?</span>
  <div class="radioWrap">${moodRadio}</div>
  </div>`
}

// !일기 쓰기 컴포넌트 불러오기
const diaryWriteBox = () => {
  const diaryWriteElement = document.querySelector(".diaryWrite");
  if (!diaryWriteElement) {
    return;
  }

  // ~일기 수정하기와 일기쓰기 구분
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
        <button class="whiteBtn" onclick="history.back()">취소</button></button>
        <button class="diaryModifyBtn blackBtn" onclick="diaryModifySave()">수정</button>
       </div>`

  let textCheck = !diaryModifyElement ? "oninput='textCheck()'" : "";
  diaryWrite.innerHTML = `
        ${title}
        ${diaryMoodTypeRender()}
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
            ></textarea>
          </label>
        </div>
      ${button}
 `;

}
diaryWriteBox();

// !쿼리에서 diaryId 가져오는 함수
const queryStringGet = () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('diaryId');
  return Number(id);
}


// !이름 설정
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




// !셀렉트 박스 클릭시 필터 항목들 보이도록 처리 함수
const optionShow = (event) => {
  const eventTarget = event.target; // 클릭한 요소
  console.log(eventTarget);
  eventTarget.parentNode.querySelector(".filterList").classList.toggle("show");
}



// !필터 항목 클릭시 선택된 값으로 변경 함수
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


// !게시글 삭제 함수
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


// !스크롤 상단으로 이동 함수
const scrollTopAction = () => {
  const windowScrollTop = window.scrollY;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// !스크롤 버튼 렌더링 함수
const scrollBtnRender = () => {
  const scrollBtn = document.querySelector('.scrollBox');
  if (!scrollBtn) return
  scrollBtn.innerHTML = `
   <button class="scrollUpBtn" onclick="scrollTopAction()">
        <img src="./img/up_outline_light_xl.svg" alt="scrollUp" />
        <span class="blind">맨위로 이동</span>
   </button>
  `
}
scrollBtnRender();




//! 팝업 렌더링 함수
const popupRender = (content) => {

  const popupElement = document.createElement("div");
  document.body.appendChild(popupElement);
  popupElement.classList.add("popup");
  popupElement.addEventListener("click", (event) => {
    if (event.target === popupElement || event.target.classList.contains('popupClose')) {
      // popupInner 바깥쪽을 클릭하거나 팝업 닫기 클래스 버튼 클릭시에만 팝업창 닫기
      popupElement.remove();
    }
  });

  popupElement.innerHTML = `<div class="popupInner">${content}</div>`;
}



// !일기 쓰기 클릭시 팝업창 렌더링 함수
const diaryWritePop = () => {
  const content = `
  <div class="diaryWrite">
        <h3>📍<span class="userName"></span>의 일기 쓰기</h3>
        ${diaryMoodTypeRender()}
        <div class="diaryContent">
          <label>
            <span>제목</span>
            <input
              class="diaryTitle"
              type="text"
              placeholder="제목을 입력해 주세요."
              oninput='textCheck()'
            />
          </label>
          <label>
            <span>내용</span>
            <textarea id="editArea"></textarea>
          </label>
        </div>
        <div class="buttonWrap">
          <button class="popupClose">닫기</button>
          <button class="diaryWriteBtn" onclick="diarySave()" disabled>
            등록하기
          </button>
        </div>
    </div>
  `

  popupRender(content) // 팝업창 렌더링 함수 호출
  editor() // 에디터 함수 호출
}


