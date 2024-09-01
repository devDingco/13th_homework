
const diaryArray = [
  // {
  //   moodType: "슬퍼요",
  //   writeDate: "2021-07-01",
  //   title: "타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다. 타이틀 영역입니다.",
  //   content: "내용 영역입니다."
  // },
  // {
  //   moodType: "놀랐어요",
  //   writeDate: "2021-07-01",
  //   title: "타이틀 영역입니다.",
  //   content: "내용 영역입니다."
  // },
  // {
  //   moodType: "화나요",
  //   writeDate: "2021-07-01",
  //   title: "타이틀 영역입니다.",
  //   content: "내용 영역입니다."
  // },
  // {
  //   moodType: "행복해요",
  //   writeDate: "2021-07-01",
  //   title: "타이틀 영역입니다.",
  //   content: "내용 영역입니다."
  // },
  // {
  //   moodType: "기타",
  //   writeDate: "2021-07-01",
  //   title: "타이틀 영역입니다.",
  //   content: "내용 영역입니다."
  // },
  // {
  //   moodType: "행복해요",
  //   writeDate: "2021-07-01",
  //   title: "타이틀 영역입니다.",
  //   content: "내용 영역입니다."
  // }
];

const moodTypeSet = {
  슬퍼요: { imgSrc: "./img/mood_1.png", colorNum: 1 },
  놀랐어요: { imgSrc: "./img/mood_2.png", colorNum: 2 },
  화나요: { imgSrc: "./img/mood_3.png", colorNum: 3 },
  행복해요: { imgSrc: "./img/mood_4.png", colorNum: 4 },
  기타: { imgSrc: "./img/mood_5.png", colorNum: 5 }
};

const headerBox = () => {
  const headerElement = document.querySelector("header");
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
  headerBanner.innerHTML = `
  <img src="./img/mainBanner.jpeg" alt="메인이미지입니다." />
  `;
}
headerBanner();


const navMenu = () => {
  const navElement = document.querySelector("nav");
  const navMenu = document.createElement("ul");
  navMenu.classList.add("navMenu");
  navMenu.innerHTML = `
    <li class="active">일기보관함</li>
    <li>사진보관함</li>
  `;
  navElement.prepend(navMenu);
}
navMenu();

const footerBox = () => {
  const footerElement = document.querySelector("footer");
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


// 이름 설정
const nameSet = () => {
  if (!localStorage.getItem("userName")) {
    let userName = prompt("이름을 적어주세요: ");
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



// // 일기 상세 팝업 함수
// const popDetail = (index) => {
//   const diary = diaryArr[index];
//   alert(`
//   기분: ${diary.moodType}
//   날짜: ${diary.writeDate}
//   제목: ${diary.title}
//   내용: ${diary.content}
//   `);
// }