// 기본 노출 값 셋팅용 데이터
const diaryArray = [
  {
    "moodType": "놀랐어요",
    "writeDate": "2024.09.05",
    "title": "sdf",
    "id": 1
  },
  {
    "moodType": "놀랐어요",
    "writeDate": "2024.09.05",
    "title": "d",
    "content": "<p>d</p>",
    "id": 2
  },
  {
    "moodType": "화나요",
    "writeDate": "2024.09.05",
    "title": "fsdf",
    "content": "<p>sfsdff</p>",
    "id": 3,
    "comment": []
  },
  {
    "moodType": "행복해요",
    "writeDate": "2024.09.05",
    "title": "ㄴㄹㅇ",
    "content": "<p>ㄴㄹㄴㅇㄹㄴㅇㄹ</p>",
    "id": 4
  },
  {
    "moodType": "슬퍼요",
    "writeDate": "2024.09.05",
    "title": "ㄴㄹㄴㅇㄹ",
    "content": "<p>ㄴㅇㄹㄴㅇㄹㅇ</p>",
    "id": 5
  },
  {
    "moodType": "화나요",
    "writeDate": "2024.09.05",
    "title": "ㄴㅇㄹ",
    "content": "<p>ㄴㅇㄹㄴㅇㄹㅇㄹ</p>",
    "id": 6
  },
  {
    "moodType": "행복해요",
    "writeDate": "2024.09.05",
    "title": "ㅓㅘㅓㅘㅓㅏㅓㅘ",
    "content": "<p>ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㄹㄴㅇㄹㄴㄹㄴㅇㄹ</p>",
    "id": 7
  },
  {
    "moodType": "기타",
    "writeDate": "2024.09.05",
    "title": "허ㅗㅗ허ㅗ허호ㅓ",
    "content": "<p>허호ㅓ허ㅗ</p>",
    "id": 8
  },
  {
    "moodType": "행복해요",
    "writeDate": "2024.09.05",
    "title": "sadas",
    "content": "<p>fdssfsdf</p>",
    "id": 9
  },
  {
    "moodType": "화나요",
    "writeDate": "2024.09.05",
    "title": "sdf",
    "content": "<p>sdf</p>",
    "id": 10
  }
]; //[{ "moodType": "놀랐어요", "writeDate": "2024.09.05", "title": "sdf", "id": 1 }]

const moodTypeSet = {
  슬퍼요: { imgSrc: "./img/mood_1.png", colorNum: 1, imgSrcS: "./img/슬퍼요(s).png" },
  놀랐어요: { imgSrc: "./img/mood_2.png", colorNum: 2, imgSrcS: "./img/놀랐어요(s).png" },
  화나요: { imgSrc: "./img/mood_3.png", colorNum: 3, imgSrcS: "./img/화나요(s).png" },
  행복해요: { imgSrc: "./img/mood_4.png", colorNum: 4, imgSrcS: "./img/행복해요(s).png" },
  기타: { imgSrc: "./img/mood_5.png", colorNum: 5, imgSrcS: "./img/기타(s).png" },
};

// !헤더 렌더링 함수
const headerBox = () => {
  const headerElement = document.querySelector("header");
  if (!headerElement) return
  const name = localStorage.getItem("userName");
  // <h1 class="glitch-wrapper"><a class="glitch" data-text="${name}의 다이어리" href="./index.html"><span class="userName"></span>의 다이어리</h1></a>
  headerElement.innerHTML = `
      <h1><a data-text="${name}의 다이어리" href="./index.html"><span class="userName"></span>의 다이어리</h1></a>
      <label class="toggleWrap">다크모드<input class="toggleSwitch" type="checkbox" onclick="darkModeToggle(event)" /></label>
      `
}
headerBox();


// !다크모드 토글 처리 함수
const darkModeToggle = (event) => {
  const targetCheckValue = event.target.checked ? true : false;
  const darkModeSwitch = document.getElementsByClassName("toggleSwitch");
  Array.from(darkModeSwitch).map((el) => el.checked = targetCheckValue);

  const lightStatus = localStorage.getItem("lightStatus");
  if (!lightStatus) {
    localStorage.setItem("lightStatus", "off");
  } else {
    localStorage.setItem("lightStatus", lightStatus === "off" ? "on" : "off");
  }
  document.documentElement.setAttribute("lightStatus", localStorage.getItem("lightStatus"));
}

if (localStorage.getItem("lightStatus") === "off") {
  const darkModeSwitch = document.getElementsByClassName("toggleSwitch")
  Array.from(darkModeSwitch).map((el) => el.checked = true);
  document.documentElement.setAttribute("lightStatus", "off");
}


// !헤더 배너 렌더링 함수
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
  const nevList = { "일기보관함": "index.html", "사진보관함": "gallery.html" }
  Object.keys(nevList).map((key, index) => {
    const li = document.createElement("li");
    if (location.pathname.includes(nevList[key])) li.classList.add("active")
    li.innerHTML = `<a href="${nevList[key]}">${key}</a>`;
    navMenu.appendChild(li);
  })
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
        oninput='diaryWriteInputCheck()'
      />${key}
     </label>
    `
  }).join("");
  return `<div class="moodTypeRadio">
  <span>오늘 기분은 어땠나요?</span>
  <div class="radioWrap">${moodRadio}</div>
  </div>`
}

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
  return userName;
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

  // const typeFilterList = {
  //   moodFilter: moodFilter(optionValue),
  //   galleryFilter: galleryFilter(optionValue)
  // }

  // return typeFilterList[type]

  if (type === 'moodFilter') {
    moodFilter(optionValue)
  } else if (type === 'galleryFilter') {
    galleryFilter(optionValue)
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



//! body 스크롤 막기 및 막은것 풀기 함수
const bodyScrollYOff = (action) => {
  const bodyStyle = document.querySelector('body').style;
  bodyStyle.overflowY = action;
}



// !팝업창 닫기 함수
const popupClose = (popupName) => {
  const popupElement = document.querySelector(popupName);
  popupElement.remove();
  bodyScrollYOff('auto');
}


//! 팝업 렌더링 함수 
const popupRender = (popupName, content, type) => {
  // popupName : 팝업창 지정할 클래스명 
  // content : 팝업창 내용
  // type : 팝업창 타입 "alert" 지정시 alert용 스타일 적용

  window.scrollTo({ top: 0 }); // 팝업창 띄워질 때 스크롤 상단으로 이동
  bodyScrollYOff('hidden');  // 팝업창 띄워질 때 body 스크롤 막기

  const popupElement = document.createElement("div");
  document.body.appendChild(popupElement);
  popupElement.classList.add('popup', popupName);
  if (type === "alert") popupElement.classList.add('alert');
  popupElement.innerHTML = `<div class="popupInner">${content}</div>`;

  // 팝업창 바깥 영역 클릭시 팝업창 닫기용
  popupElement.addEventListener('click', (event) => {
    if (event.target.classList.contains(popupName)) {

      popupElement.remove();

      // 일기 등록 완료 팝업의 뒷배경인 경우 다이어리 쓰기 팝업창 같이 닫기
      if (popupName === "saveCompletePop") document.querySelector(".diaryWritePop").remove();

      bodyScrollYOff('auto');
    }
  })
}





// !게시글 삭제 함수
const diaryDelete = (diaryId) => {
  // id : 삭제할 게시글의 id값
  // 삭제할 게시글의 id값을 받아와서 해당 게시글을 제외한 나머지 게시글들을 배열로 저장
  const diaryDelArr = diaryArr.filter((diary, index) => diary.id !== diaryId);
  localStorage.setItem('diaryArray', JSON.stringify(diaryDelArr));
  // 현재 상세페이지에서 삭제할 경우 index.html로 이동, 리스트페이지에서 삭제할 경우 리스트 재렌더링
  location.href.includes('detail.html') ? location.href = './index.html' : diaryListSet(diaryDelArr);
}


// !게시글 삭제 팝업창 함수 호출
const diaryDeletePop = (event, diaryId) => {
  event.preventDefault();
  // id : 삭제할 게시글의 id값
  popupRender("diaryDeletePop",
    `<h2>일기 삭제</h2>
    <p>일기를 삭제하시겠습니까?</p>
    <div class="buttonWrap">
    <button class="whiteBtn" onclick="popupClose('.diaryDeletePop')">취소</button>
    <button class="blackBtn" onclick="diaryDelete(${diaryId}); popupClose('.diaryDeletePop');">삭제</button>
    </div>`
    , "alert");
}




// 선택형 셀렉트 형태 박스 렌더링 함수 
const selectRender = (selector, option) => {
  // option : 셀렉트 박스에 들어갈 옵션 객체
  // 예시 : { 전체: "전체", 행복해요: "행복해요", 슬퍼요: "슬퍼요", 놀랐어요: "놀랐어요", 화나요: "화나요" }
  const selectBox = document.querySelector(selector);
  if (!selectBox) return

  document.querySelector('head').innerHTML += `<link rel="stylesheet" href="./css/select.css" />`
  selectBox.classList.add("selectBox");

  const selectButton = document.createElement("button");
  selectButton.classList.add("filterPopBtn");
  selectButton.innerText = option[Object.keys(option)[0]];
  selectButton.onclick = (event) => optionShow(event)
  selectBox.appendChild(selectButton);

  const selectUl = document.createElement("ul");
  selectUl.classList.add("filterList");
  selectBox.appendChild(selectUl);

  const selectOption = Object.keys(option).map((key, index) => {
    const classSet = index === 0 ? 'class="active"' : '';
    return `<li ${classSet} data-value="${key}" onclick="optionSelect(event, 'galleryFilter')">${option[key]}</li>`
  }).join("");

  selectUl.innerHTML = selectOption;
}

selectRender('.ratioViewType', { 기본형: "기본형", 가로형: "가로형", 세로형: "세로형" });