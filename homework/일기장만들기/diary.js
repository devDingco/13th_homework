// ************나의 이상한 주석들 모음**********
// 일기쓰기객체(배열에 넣었음) 인덱스 값으로 해당 클릭하는 일기목록으로 알맞게 내용 넣어주기 - 위에 객체로 덩어리만들어서 innerHtml할때 그냥 다 넣어서 처음부터 만들어줌
// 입력값 체인지 검사란
// const 인풋검사하기 = () => {
//     제목입력값 = document.getElementById("제목입력inputId").value
//     // console.log(제목입력값);

//     내용입력값 = document.getElementById("내용입력inputId").value
//     // console.log(내용입력값);
// }
//*****************************************

// 1. 일기쓰기(기분,제목,내용)의 값을 받을변수를 선언한다
// 2. 등록하기버튼을 눌렀을때 값이 모두 들어간 객체를 생성한다

// 변경해줄값 또는 여러곳에서 쓸 데이터는 먼저 선언해주는것이좋다.
let 체크된값; // 변수를 밖에 선언하면 아래(함수)로 쓸 수 있음
let 제목입력값;
let 내용입력값;
let 기분이미지;
let 작성날짜값;
// 들고갈 데이터 덩어리(객체)를 넣어줄 빈배열

//로컬스토리지
const localdata01 = localStorage.getItem("detailList") ?? "[]";
let localdata02 = JSON.parse(localdata01);

//페이지네이션
let startNum = 1;
let clickPage = 1;
let lastNum;

window.onload = () => {
  // diaryDivPlus(localdata02)
  navColor();
  paginationMake();
  diaryNumlist(clickPage);
};

// 일기쓰기 값을 넣어줘서 일기목록을 만드는 로직
const diaryDivPlusBtn = () => {
  // 일기작성날짜
  const toDayDate = new Date();
  작성날짜값 = `${toDayDate.getFullYear()}.${
    toDayDate.getMonth() + 1
  }.${toDayDate.getDate()}`;

  //getElementsByName 배열로 사용가능
  //기분 radio foreach로 돌리기
  const emoRadio = document.getElementsByName("radioCheck");
  제목입력값 = document.getElementById("제목입력inputId").value;
  내용입력값 = document.getElementById("내용입력inputId").value;

  emoRadio.forEach((num) => {
    if (num.checked === true) {
      체크된값 = num.value;
      const id = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

      // 로컬스토리지에 일기객체 담기 일기목록에 값을 넣어서 뿌려주기위해서
      let detailListData = window.localStorage.getItem("detailList") ?? "[]";
      // 기존의배열을 가져온다 - 새로운 객체를 만들어서 추가한다
      const detailF = JSON.parse(detailListData);
      // Json으로 만들어서 꺼내준다.
      // console.log(JSON.parse(detailListData))

      detailF.push({
        idV: id,
        기분: 체크된값,
        제목: 제목입력값,
        내용: 내용입력값,
        작성날짜: 작성날짜값,
        댓글: [],
      });
      localdata02 = detailF; // 전역에 추가 배열 한번 넣어줌
      localStorage.setItem("detailList", JSON.stringify(detailF));
      // detailListData = localStorage.getItem("detailList")
      // let detaiDataChang = JSON.parse(detailListData)
      // detailList 같은 이름으로 다시 넣어준다.

      console.log(detailF);
      // 문자열로 저장된 detailList이름을 가진 일기는 JSON으로 만들어서 로컬스토리지에서 빼오고 변수에 넣어준다

      diaryNumlist(clickPage); // 자바스크립트에는 로컬스토리지에 들어가도 없어지는게 아니라 남아있다
      clearInput();
    }
  });
};

// 일기쓰기인풋 입력 받은후 clear하기
const clearInput = () => {
  document.getElementById("제목입력inputId").value = null;
  document.getElementById("내용입력inputId").value = null;
  document.getElementsByName("radioCheck").forEach((el) => {
    el.checked = false;
  });
};

// 일기 목록을 눌렀을 때 실행되는 부분
// detailListData : 로컬스토리지에서 가져온 데이터 (일기객체_일기객체데이터가 필요한곳에 map)
// const diaryDivPlus = (localData) => {

//     // 일기 목록을 뿌려주는 곳 잡아오기
//     const localDataArr = localData.map(el  => `
//                         <a href="./day05_일기상세페이지.html?idV=${el.idV}">
//                             <div id="iconBoxFImgID" class="iconBoxFImg">
//                                 ${
//                                     el.기분 === "행복해요"
//                                     ? '<img src="./CSS&JS 마스터/행복해요 (m).png" width="32px"/>'
//                                     : ""
//                                 }
//                                    ${
//                                     el.기분 === "슬퍼요"
//                                     ? '<img src="./CSS&JS 마스터/슬퍼요 (m).png" width="32px"/>'
//                                     : ""
//                                 }
//                                    ${
//                                     el.기분 === "놀랐어요"
//                                     ? '<img src="./CSS&JS 마스터/놀랐어요 (m).png" width="32px"/>'
//                                     : ""
//                                 }
//                                    ${
//                                     el.기분 === "화나요"
//                                     ? '<img src="./CSS&JS 마스터/화나요 (m).png" width="32px"/>'
//                                     : ""
//                                 }
//                                    ${
//                                     el.기분 === "기타"
//                                     ? '<img src="./CSS&JS 마스터/기타 (m).png" width="32px"/>'
//                                     : ""
//                                    }

//                                 <div onclick="deleteCard(event)" class="delBtn">X</div>
//                                 <div class="iconBoxF두번째">
//                                     <div class="iconBoxF세번째">
//                                         <div>${el.기분}</div>
//                                         <div>${el.작성날짜}</div>
//                                     </div>
//                                     <div class="iconBoxF네번째">${el.제목}</div>
//                                 </div>
//                             </div>
//                         </a>
//     `).join("")

//     // console.log(localDataArr)
//     // console.log(localDataArr.join(""))
//     // 콘솔로 찍었을 때 데이터요소가 추가된 html이 배열로 같이 찍힘
//     // join 배열의 모든 요소를 연결해 하나의 문자열로 만듦 : 정,아,영 -> 배열을 그냥 html찍으면 ',' 도 같이 찍힘

//     let diaryPlusList = document.getElementById("iconBoxFId")
//     diaryPlusList.innerHTML = localDataArr
// }

// 전체화면 기분상태를 필터링하는곳
const navFilter = (event) => {
  const liId = event.target.id;
  console.log(liId);
  const detailListData01 = localStorage.getItem("detailList") ?? "[]";
  const detailListData02 = JSON.parse(detailListData01);

  let navFilterPrint;
  switch (liId) {
    case "everyting": {
      navFilterPrint = detailListData02.filter((el) => el.기분);
      break;
    }
    case "happy": {
      navFilterPrint = detailListData02.filter((el) => el.기분 === "행복해요");
      break;
    }
    case "sad": {
      navFilterPrint = detailListData02.filter((el) => el.기분 === "슬퍼요");
      break;
    }
    case "surprise": {
      navFilterPrint = detailListData02.filter((el) => el.기분 === "놀랐어요");
      break;
    }
    case "angry": {
      navFilterPrint = detailListData02.filter((el) => el.기분 === "화나요");
      break;
    }
    case "different": {
      navFilterPrint = detailListData02.filter((el) => el.기분 === "기타");
      break;
    }
  }

  // diaryNumlist(1, navFilterPrint);
  console.log(navFilterPrint);
  const diaryFilterList = navFilterPrint
    .map(
      (el) => `
                        <a href="./diary_detail.html?idV=${el.idV}">
                            <div id="iconBoxFImgID" class="iconBoxFImg">
                            ${
                              el.기분 === "행복해요"
                                ? '<img src="./CSS&JS 마스터/행복해요 (m).png" width="32px"/>'
                                : ""
                            }
                               ${
                                 el.기분 === "슬퍼요"
                                   ? '<img src="./CSS&JS 마스터/슬퍼요 (m).png" width="32px"/>'
                                   : ""
                               }
                               ${
                                 el.기분 === "놀랐어요"
                                   ? '<img src="./CSS&JS 마스터/놀랐어요 (m).png" width="32px"/>'
                                   : ""
                               }
                               ${
                                 el.기분 === "화나요"
                                   ? '<img src="./CSS&JS 마스터/화나요 (m).png" width="32px"/>'
                                   : ""
                               }
                               ${
                                 el.기분 === "기타"
                                   ? '<img src="./CSS&JS 마스터/기타 (m).png" width="32px"/>'
                                   : ""
                               }
                                <div onclick="deleteCard(event)" class="delBtn">X</div>
                                <div class="iconBoxF두번째">
                                    <div class="iconBoxF세번째">
                                        <div>${el.기분}</div>
                                        <div>${el.작성날짜}</div>
                                    </div>
                                    <div class="iconBoxF네번째">${el.제목}</div>
                                </div>
                            </div>
                        </a>
    `
    )
    .join("");

  document.getElementById("iconBoxFId").innerHTML = diaryFilterList;
};

// 플로팅 버튼 스크롤 이벤트 하는곳
const floatingUp = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  //scrollTo : 요소잡아서 그 top 위치로 스크롤가줘 (기본 윈도우로 잡음)
};

window.addEventListener("scroll", () => {
  const scrollFooter = document
    .getElementById("footerBoxId")
    .getBoundingClientRect().top;
  // 내가잡은 요소의 위까지의 보이는 길이를 넣어줌
  const scrollFix = window.innerHeight;
  // 눈에 보이는 브라우저 화면의 높이

  if (scrollFix >= scrollFooter) {
    document.getElementById("floatingBtn").style = `
        position: relative;
        bottom: 20px;
        left: 90%;
        `;
  } else {
    document.getElementById("floatingBtn").style = `
        position: fixed;
        bottom: 50px;
        left: 70%;
        `;
  }
});

// nav를 상단에 고정해서 스크롤이 올라갈때 필터 div색 반전하기
const navColor = () => {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const navBoxFix = document.getElementById("navSelect");

    if (scrollY > 0) {
      navBoxFix.style = "background-color : gray";
    } else {
      navBoxFix.style = "background-color : none";
    }
  });
};

//모달 열기 만들기
const modalOpen = (modal) => {
  console.log(modal);
  if (modal === "modalEndWrite") {
    document.getElementById(modal).style = "display : block";
  } else if (modal === "modalWrite") {
    document.getElementById(modal).style = "display : block";
    document.getElementById("modalNull").style = "display : none";
  }
};

//모달 닫기 만들기
const modalClose = (modal) => {
  console.log(modal);
  if (modal === "modalWrite") {
    document.getElementById(modal).style = "display : none";
    document.getElementById("modalNull").style = "display : block";
  } else if (modal === "modalNull") {
    document.getElementById("modalNull").style = "display : none";
  } else if (modal === "modalEndWrite") {
    document.getElementById(modal).style = "display : none";
    document.getElementById("modalWrite").style = "display : none";
  }
};

// 페이지네이션 만들기
const paginationMake = () => {
  // 마지막 페이지 구하기
  lastNum = Math.ceil(localdata02.length / 12);

  //이전버튼기능
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (startNum === 1) {
      alert("첫페이지입니다");
    } else {
      // 어차피 안내려옴
      startNum = startNum - 3;
      clickPage = startNum;
      btnPrint();
    }
  });

  //다음버튼기능
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (startNum + 3 <= lastNum) {
      startNum = startNum + 3;
      clickPage = startNum;
      btnPrint();
    } else {
      alert("마지막페이지입니다");
    }
  });

  btnPrint();
};

//페이지네이션 숫자바 그리기
const btnPrint = () => {
  const paginArrNum = new Array(3).fill();
  const ArrNum = paginArrNum
    .map((el, index) => {
      let pageNum = index + startNum;
      const actionClass = pageNum === clickPage ? "class='btnAction'" : "";

      return pageNum <= lastNum
        ? `<button 
                onclick="pageClick(${pageNum})"
                ${actionClass}
                >${pageNum}
            </button>`
        : "";
    })
    .join(" ");

  //onclick안에 함수로 넣어준다 보기 용이하기위해서

  console.log(clickPage);
  document.getElementById("pagination").innerHTML = ArrNum;
};

//내가 클릭한 페이지 번호 만들기
const pageClick = (pageNum) => {
  diaryNumlist(pageNum);
  clickPage = pageNum; // 페이지번호와 클릭한페이지번호를 넣어주며 값은 같다
  paginationMake(); // 페이지번호를 클릭페이지번호로 넣어주며 다시 페이지네이션 만들어줌
};

// 일기목록 한페이지에 12개만 보이도록 만들기
// window.onlode 할때 먼저 로컬에 받아온 12개가 뿌려져 있어야함
const diaryNumlist = (Num) => {
  // const diaryPage = localdata02.filter( (el, index) =>  index <= 11 )// 인덱스가 하나작으니까 12를 띄우고싶다면 11로비교
  const diaryPage = localdata02.filter((el, index) => {
    // 필터의 el은 아직 필터되기전의 모든 배열 요소를 잡아온다
    const list = 12;
    const jump = (Num - 1) * 12;

    if (jump <= index && index < jump + list) {
      // 뭔가 이해하고 쓴느낌은 아님
      return true;
    } else {
      return false;
    }
  });

  // 일기장그려주기
  document.getElementById("iconBoxFId").innerHTML = diaryPage
    .map(
      (el) => `
            <a href="./diary_detail.html?idV=${el.idV}">
            <div id="iconBoxFImgID" class="iconBoxFImg">
            ${
              el.기분 === "행복해요"
                ? '<img src="./CSS&JS 마스터/행복해요 (m).png" width="32px"/>'
                : ""
            }
               ${
                 el.기분 === "슬퍼요"
                   ? '<img src="./CSS&JS 마스터/슬퍼요 (m).png" width="32px"/>'
                   : ""
               }
               ${
                 el.기분 === "놀랐어요"
                   ? '<img src="./CSS&JS 마스터/놀랐어요 (m).png" width="32px"/>'
                   : ""
               }
               ${
                 el.기분 === "화나요"
                   ? '<img src="./CSS&JS 마스터/화나요 (m).png" width="32px"/>'
                   : ""
               }
               ${
                 el.기분 === "기타"
                   ? '<img src="./CSS&JS 마스터/기타 (m).png" width="32px"/>'
                   : ""
               }
                <img src="./CSS&JS 마스터/close_outline_light_m.svg" alt="" onclick="diaryDelete(event, ${
                  el.idV
                })">
                <div class="iconBoxF두번째">
                    <div class="iconBoxF세번째">
                        <div>${el.기분}</div>
                        <div>${el.작성날짜}</div>
                    </div>
                    <div class="iconBoxF네번째">${el.제목}</div>
                </div>
            </div>
        </a>`
    )
    .join("");
  paginationMake();
};

//일기장x버튼 누를때 카드 삭제하기
const diaryDelete = (event, one) => {
  //로컬스토리지 배열가져오기
  // 가져온 배열에 아이디값을 가져와서 그 아이디값이 아닌것들만 필터해서 뻄 다시 로컬스토리지에 넣음

  event.preventDefault();
  const deletSto = localdata02.filter((el) => el.idV != one);
  localStorage.setItem("detailList", JSON.stringify(deletSto));

  window.location.href = "./diary.html";
  // diaryNum(1) // 왜 안그려짐?????
};

// 일기보관함,사진보관함 누를 때 기능
const saveClick = (element) => {
  console.log(element);
  switch (element) {
    case "saveDiary": {
      console.log(1);
      document.getElementById("contentBox02Id").style = "display : block";
      document.getElementById("contentBox03Id").style = "display : none";
      break;
    }
    case "savePoto": {
      document.getElementById("contentBox02Id").style = "display : none";
      document.getElementById("contentBox03Id").style = "display : block";
      break;
    }
  }
};

// 일기,사진보관함 드롭다운 display
const dropDownDisplay = (element) => {
  console.log(element);

  switch (element) {
    case "saveBox": {
      document.getElementById("stickyBoxId").style = "display : block";
      document.getElementById("imgnavPotoId").style = "display : none";
      break;
    }
    case "savePoto": {
      document.getElementById("stickyBoxId").style = "display : none";
      document.getElementById("imgnavPotoId").style = "display : block";
      break;
    }
  }
};

//api 사진보관함
const potoApi = () => {
  fetch("https://dog.ceo/api/breeds/image/random/10").then((poto) => {
    poto.json().then((jsonPoto) => {
      console.log(jsonPoto);
      const imgList = jsonPoto.message;

      // 드롭다운 클릭했을때 값을
      const imgDog = imgList.map((el) => {
        document.getElementById(
          "imgScrollId"
        ).innerHTML += `<img class="imgdog" src="${el}" alt="강아지이미지">`;
      });
    });
  });
};
// 무한스크롤
window.addEventListener("scroll", () => {
  let timer = null;
  const scroll01 = document.documentElement.scrollTop;
  const scroll02 =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = scroll01 / scroll02;
  console.log(`타이머 :${timer}`);

  if (scrollPercent < 0.9) return; // 현재나의 스크롤이 80%작을때 실행하지마
  if (timer !== null) {
    console.log(`타이머가 null이 아닐때 실행해 :${timer}`);
    return;
  }
  console.log("그려줘");
  potoApi(); // 버튼 눌렀을때 한번 실행-> 조건에 false일때 또 실행

  setTimeout(() => {
    timer = null;
    console.log(`setTimeout 내부 :${timer}`);

    // if (scrollPercent === 1) {
    //   potoApi();
    // }
  }, 3000);
});

// 사진 비율에 따른 필터적용
const potoDesign = (event) => {
  const eventCho = event.target.value;
  const imgDogClass = document.querySelectorAll(".imgdog");
  // querySelectorAll은 nodeList를 반환하고 nodeList에 각 요소에 대한 개별적으로 스타일을 적용해야한다
  console.log(imgDogClass);

  imgDogClass.forEach((el) => {
    switch (eventCho) {
      case "기본": {
        el.style.aspectRatio = "1/1";
        el.style.width = "640px";
        console.log("들어옴?");
        break;
      }
      case "가로형": {
        el.style.aspectRatio = "4/3";
        el.style.width = "640px";
        break;
      }
      case "세로형": {
        el.style.aspectRatio = "3/4";
        el.style.width = "640px";
        break;
      }
    }
  });
};
