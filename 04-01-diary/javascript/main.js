window.onload = () => {
  console.log("welcome");

// 1. 시작하면 일기 목록에 그리기
JS_drawing();

};



// 스크롤 관련 이벤트
window.addEventListener("scroll", () => {
  const TofooterHeight = document
    .getElementById("footer_section")
    .getBoundingClientRect().top;
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
  if (screenHeight >= TofooterHeight) {
    if (screenWidth >= 849) {
      document.getElementById("floating_button").style = `
      position: relative;
      bottom: 0;
      left: 97%;
    `;
    } else {
      document.getElementById("floating_button").style = `
      position: relative;
      bottom: 0;
      left: 90%;
    `;
    }

    // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
    } else {
      document.getElementById("floating_button").style = `
        position: fixed;
        bottom: 4rem;
        right: 2rem;
      `;
    }
});


const JS_drawing = () => {
  // 1. 스토리지에 저장된 일기목록 가져오기
  const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  // 2. 일기목록 화면에 새롭게 전체 그리기
  const newdiary = diary_list
  .map(
    (element, main) => `
      <a href="./detail.html?number=${main}" style="text-decoration: none;">
        <div class="CSS_diary">
          <div class="diary_image">
          <img class="cancel_button" src="./assets/close_button.png" onclick="JS_cancel(event, ${main})" />
            ${
              element.기분 === "happy"
              ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />'
              : ""
            }
            ${
              element.기분 === "sad"
              ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />'
              : ""
            }
            ${
              element.기분 === "surprise"
              ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />'
              : ""
            }
            ${
              element.기분 === "angry"
              ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />'
              : ""
            }
            ${
              element.기분 === "etc"
              ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />'
              : ""
            }
            </div>
            <div class="diary_content">
            ${
              element.기분 === "happy"
              ? `<div class="feeling happy">행복해요</div>`
              : ""
            }
            ${
              element.기분 === "sad"
              ? `<div class="feeling sad">슬퍼요</div>`
              : ""
            }
            ${
              element.기분 === "surprise"
              ? `<div class="feeling surprise">놀랐어요</div>`
              : ""
            }
            ${
              element.기분 === "angry"
              ? `<div class="feeling angry">화나요</div>`
              : ""
            }
            ${
              element.기분 === "etc"
              ? `<div class="feeling etc">기타</div>`
              : ""
            }
            <div class="date">${element.작성일}</div>
          </div>
        <div class="title"> ${element.제목}</div>
      </div>
    </a>
    `
    )
    .join("");
  window.document.getElementById("show_diary_html").innerHTML =
    newdiary;
};


// 일기 삭제 후에도 필터링 유지
let currentFilter = "all";

// 삭제할 일기 번호를 저장할 변수
let delete_index = null;

// 삭제 모달 띄우기
const JS_cancel = (event, diary_number) => {
  event.preventDefault();
  delete_index = diary_number; // 삭제할 일기 번호 저장
  document.getElementById("html_post_delete").style.display = "block";
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'});
  document.body.style.overflow = 'hidden';
}

// 일기 삭제
const JS_delete = () => {
  // 저장된 일기 목록 가져오기
  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  // 일기 삭제
  if(delete_index !== null) {
    diary_list.splice(delete_index, 1);
  }

  // 변경된 일기 목록 다시 저장
  window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));

  // 화면에 일기 목록 다시 그리기
  JS_close();

  JS_drawing();

  JS_filtering({target: {value: currentFilter}});
};


// const diary_list = [];

const JS_write = () => {
  // 0. 현재 날짜 가져오기

  const date = new Date();

  const options = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    date: date.getDate(),
  };

  // 1-1. 내가쓴 일기 불러오기
  const date_container = options.year + ". " + options.month + ". " + (("00"+options.date.toString()).slice(-2));
  const title_container = window.document.getElementById("html_title").value;
  const content_container = window.document.getElementById("html_content").value;
  let mood_container;
  window.document.getElementsByName("select_feeling").forEach((element) => {
    if (element.checked) mood_container = element.value;
  });


  // 2. 일기목록에 일기 추가하기
  const diary_container = {
    제목: title_container,
    내용: content_container,
    기분: mood_container,
    작성일: date_container,
  };
  console.log(diary_container)

  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);
  diary_list.push(diary_container);
  window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));

  JS_drawing();

  document.getElementById("html_reg_fin").style = "display: block;"

  resetFormData();
  
};

const show_write = (diary_number_container) => {
  const diary_container = diary_list[diary_number_container];
  const title_container = diary_container.제목;
  const content_container = diary_container.내용;

  alert(`
   제목: ${title_container}
   내용: ${content_container}
  `);

  location.href=`./detail.html?diary_number=${diary_number_container}`;
};

// 스크롤 시 필터 색상 반전
window.onscroll = function () {
  const selectElement = document.querySelector(".filter");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    // 2. 스크롤이 조금이라도 내려가면 배경색 변경하기
    selectElement.classList.add("change_color");
  } else {
    selectElement.classList.remove("change_color"); // 스크롤이 맨 위로 올라가면 원래 색으로
  }
};

// 드롭다운
const JS_dropdown = (event) => {
  const choose = event.target.value;
  console.log(choose);

  document.getElementById(
    "html_dropdown_title"
  ).style.cssText = `--CSSment: "${choose}"`;
  document.getElementById("html_dropdown_title").click(); // 선택시 자동으로 다시 클릭해서 끄기

  const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);


  let filtering_list;
  switch (choose) {
    case "행복해요": {
      filtering_list = diary_list.filter((element) => element.기분 === "happy");
      break;
    }
    case "슬퍼요": {
      filtering_list = diary_list.filter((element) => element.기분 === "sad");
      break;
    }
    case "놀랐어요": {
      filtering_list = diary_list.filter((element) => element.기분 === "surprise");
      break;
    }
    case "화나요": {
      filtering_list = diary_list.filter((element) => element.기분 === "angry");
      break;
    }
    case "기타": {
      filtering_list = diary_list.filter((element) => element.기분 === "etc");
      break;
    }
    default: {
      filtering_list = diary_list;
      break;
    }
  }
  

  const newdiary = filtering_list
  .map(
    (element, main) => `
      <a href="./detail.html?number=${main}" style="text-decoration: none;">
        <div class="CSS_diary">
          <div class="diary_image">
          <img class="cancel_button" src="./assets/close_button.png" onclick="JS_cancel(event, ${main})" />
            ${
              element.기분 === "happy"
              ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />'
              : ""
            }
            ${
              element.기분 === "sad"
              ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />'
              : ""
            }
            ${
              element.기분 === "surprise"
              ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />'
              : ""
            }
            ${
              element.기분 === "angry"
              ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />'
              : ""
            }
            ${
              element.기분 === "etc"
              ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />'
              : ""
            }
            </div>
            <div class="diary_content">
            ${
              element.기분 === "happy"
              ? `<div class="feeling happy">행복해요</div>`
              : ""
            }
            ${
              element.기분 === "sad"
              ? `<div class="feeling sad">슬퍼요</div>`
              : ""
            }
            ${
              element.기분 === "surprise"
              ? `<div class="feeling surprise">놀랐어요</div>`
              : ""
            }
            ${
              element.기분 === "angry"
              ? `<div class="feeling angry">화나요</div>`
              : ""
            }
            ${
              element.기분 === "etc"
              ? `<div class="feeling etc">기타</div>`
              : ""
            }
            <div class="date">${element.작성일}</div>
          </div>
        <div class="title"> ${element.제목}</div>
      </div>
    </a>
    `
  )
  .join("");
  window.document.getElementById("show_diary_html").innerHTML =
  newdiary;

};


const JS_open = () => {
  document.getElementById("html_modal_group").style = "display: block;"
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'});
  document.body.style.overflow = 'hidden';
}

const JS_close = () => {
  document.getElementById("html_modal_group").style = "display: none;"
  document.getElementById("html_reg_fin").style = "display: none;"
  document.getElementById("html_reg_cancel").style = "display: none;"
  document.getElementById("html_post_delete").style = "display: none;"

  document.body.style.removeProperty('overflow');

  resetFormData();
}

const JS_confirm = () => {
  document.getElementById("html_reg_cancel").style = "display: block;"
}

const JS_back = () => {
  document.getElementById("html_reg_cancel").style = "display: none;"
}

window.addEventListener("keydown", (event) => {
  if(event.key === "Escape") {
        JS_close();
      }
  })


function resetFormData() {
  // 일기 폼 초기화
  const el = document.querySelectorAll("input[type=text], textarea");
  for (let i = 0; i < el.length; i++) {
    el[i].value = "";
  }
};

// 플로팅 버튼
const JS_scroll = () => {
  
  window.scrollTo({top: 0, behavior: "smooth"})
}

// 네비게이션 클릭
const JS_click = (clicked) => {
  switch(clicked) {
      case "diary": {
        location.href = "./main.html"
          break;
      }
      case "photos": {
        location.href = "./main2.html"
          break;
      }
  }
}


// 검색어 입력
const JS_search = (event) => {
let timer;
clearTimeout(timer);
timer = setTimeout(() => {
  const keyword = event.target.value;
  console.log(keyword)

  const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  const results = diary_list.filter((element) =>
    element.제목.includes(keyword)
  );
  const newdiary = results
    .map(
      (element, main) => `
        <a href="./detail.html?number=${main}" style="text-decoration: none;">
          <div class="CSS_diary">
          <div class="diary_image">
          <img class="cancel_button" src="./assets/close_button.png" onclick="JS_cancel(event, ${main})" />
            ${
              element.기분 === "happy"
              ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />'
              : ""
            }
            ${
              element.기분 === "sad"
              ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />'
              : ""
            }
            ${
              element.기분 === "surprise"
              ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />'
              : ""
            }
            ${
              element.기분 === "angry"
              ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />'
              : ""
            }
            ${
              element.기분 === "etc"
              ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />'
              : ""
            }
            </div>
            <div class="diary_content">
            ${
              element.기분 === "happy"
              ? `<div class="feeling happy">행복해요</div>`
              : ""
            }
            ${
              element.기분 === "sad"
              ? `<div class="feeling sad">슬퍼요</div>`
              : ""
            }
            ${
              element.기분 === "surprise"
              ? `<div class="feeling surprise">놀랐어요</div>`
              : ""
            }
            ${
              element.기분 === "angry"
              ? `<div class="feeling angry">화나요</div>`
              : ""
            }
            ${
              element.기분 === "etc"
              ? `<div class="feeling etc">기타</div>`
              : ""
            }
            <div class="date">${element.작성일}</div>
          </div>
        <div class="title"> ${element.제목}</div>
      </div>
    </a>
    `
  )
  .join("");
  window.document.getElementById("show_diary_html").innerHTML =
  newdiary;

  }, 1000);
};



// 다크모드
const JS_dark = (event) => {
if (event.target.checked === true) {
  document.documentElement.setAttribute("darkmode", "on");
} else {
  document.documentElement.setAttribute("darkmode", "off");
}
};

// 내용 미입력 시 등록 버튼 비활성화
window.addEventListener("keyup", () => {
// 제목, 내용이 모두 입력됐는지 확인
const title_box = window.document.getElementById("html_title");
const content_box = window.document.getElementById("html_content");
if (title_box && content_box) {
  const regist = document.getElementById("regist_button");
  if (title_box.value !== "" && content_box.value !== "") {
    regist.disabled = false;
    document.getElementById("regist_button").style = "display: block;"
  } else if (title_box.value === "" || content_box.value === "") {
    document.getElementById("regist_button").style = "background-color: #C7C7C7; color: rgba(242, 242, 242, 1)";
    regist.disabled = true;
  }
}
});


// 페이지네이션
const JS_pagenation = (clickPage) => {
  // 로컬 스토리지에서 'list_of_diary'라는 키에 저장된 데이터를 가져옴. 만약 데이터가 없다면 빈 배열("[]")을 사용
  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]"; 
  const diary_list = JSON.parse(storage_diary); // JSON 형식의 문자열을 JavaScript 객체로 변환

  const pageItem = 12; // 한 페이지에 표시할 일기의 개수
  const pageSize = 5; // 한 번에 표시할 페이지 번호의 개수
  const lastPage = Math.ceil(diary_list.length / pageItem); // 총 페이지 수 계산

  // 현재 페이지 그룹(페이지 번호 모음)의 위치 계산
  const pageGroup = Math.ceil(clickPage / pageSize); 
  const startGroupPage = (pageGroup - 1) * pageSize + 1; // 현재 그룹에서 가장 첫 번째 페이지 번호
  const lastGroupPage = Math.min(startGroupPage + pageSize - 1, lastPage); // 현재 그룹에서 가장 마지막 페이지 번호

  // 페이지 번호 버튼을 생성하는 부분
  const buttons = new Array(pageSize)
    .fill(1)
    .map((element, main) => {
      const pageNumber = main + startGroupPage; // 각 버튼에 표시될 페이지 번호 계산

      // 페이지 번호 버튼을 HTML로 생성
      return pageNumber <= lastPage
        ? `<button 
      onclick="JS_cardDrawing(${pageNumber});JS_pagenation(${pageNumber})"
      class=${clickPage === pageNumber ? "Pclicked_button" : "page_button"}>${pageNumber}</button>`
        : ``; // 페이지 번호가 마지막 페이지보다 크면 빈 문자열 반환
    })
    .join(" "); // 생성된 버튼들을 하나의 문자열로 결합

  // 왼쪽 방향 화살표 버튼 생성
  let leftArrow =
    startGroupPage > 1
      ? `<img class="pageMoveButton" src="./assets/leftside_icon.png" onclick="JS_beforePage(${startGroupPage})">`
      : `<img class="pageMoveButton" src="./assets/leftside_icon.png" onclick="JS_beforePage(${startGroupPage})">`;

  // 오른쪽 방향 화살표 버튼 생성
  let rightArrow =
    lastGroupPage < lastPage
      ? `<img class="pageMoveButton" src="./assets/rightside_button.png" onclick="JS_nextPage(${lastGroupPage}, ${lastPage})">`
      : `<img class="pageMoveButton" src="./assets/rightside_button.png" onclick="JS_nextPage(${lastGroupPage}, ${lastPage})">`;

  // 위에서 생성한 버튼들을 HTML의 특정 요소에 삽입
  document.getElementById("pagination_html").innerHTML = leftArrow + buttons + rightArrow;
};

const JS_beforePage = (startPage) => {
  if (startPage > 1) { // 시작 페이지가 1보다 클 때만 이전으로 이동 가능
    startPage -= 5; // 페이지 그룹 크기(5)만큼 뒤로 이동
    JS_pagenation(startPage); // 업데이트된 페이지 그룹을 기반으로 페이지네이션 다시 생성
    JS_cardDrawing(startPage); // 새로운 페이지에 해당하는 일기 목록을 화면에 표시
  } else {
    alert("첫 페이지입니다!"); // 페이지의 시작 부분일 때 경고 메시지 표시
  }
};

const JS_nextPage = (startPage, lastPage) => {
  if (startPage + 5 <= lastPage) { // 시작 페이지에서 5를 더한 값이 마지막 페이지보다 작거나 같을 때만 이동 가능
    startPage += 5; // 페이지 그룹 크기(5)만큼 앞으로 이동
    JS_pagenation(startPage); // 업데이트된 페이지 그룹을 기반으로 페이지네이션 다시 생성
    JS_cardDrawing(startPage); // 새로운 페이지에 해당하는 일기 목록을 화면에 표시
  } else {
    alert("마지막 페이지입니다."); // 마지막 페이지일 때 경고 메시지 표시
  }
};

const JS_cardDrawing = (page) => {
  clickPage = page; // 클릭된 페이지를 현재 페이지로 설정
  const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  const diary_list = JSON.parse(storage_diary);

  // 현재 페이지에 해당하는 일기 목록을 필터링하여 가져옴
  const results = diary_list.filter((_, main) => {
    const shownumb = 12; // 한 페이지에 보여줄 일기 개수
    const jumpnumb = (page - 1) * shownumb; // 앞 페이지에서 건너뛸 일기의 개수
    if (jumpnumb <= main && main < jumpnumb + shownumb) {
      return true; // 현재 페이지에 해당하는 일기만 필터링
    } else {
      return false; // 나머지는 제외
    }
  });

  // 필터링된 일기 목록을 HTML로 변환하여 화면에 표시
  document.getElementById("show_diary_html").innerHTML = results
  .map(
    (element, main) => `
      <a href="./detail.html?number=${main}" style="text-decoration: none;">
        <div class="CSS_diary">
          <div class="diary_image">
          <img class="cancel_button" src="./assets/close_button.png" onclick="JS_cancel(event, ${main})" />
            ${
              element.기분 === "happy"
              ? '<img class="feeling_image" src="./assets/happy.png" alt="happy" />'
              : ""
            }
            ${
              element.기분 === "sad"
              ? '<img class="feeling_image" src="./assets/sad.png" alt="sad" />'
              : ""
            }
            ${
              element.기분 === "surprise"
              ? '<img class="feeling_image" src="./assets/surprise.png" alt="surprise" />'
              : ""
            }
            ${
              element.기분 === "angry"
              ? '<img class="feeling_image" src="./assets/angry.png" alt="angry" />'
              : ""
            }
            ${
              element.기분 === "etc"
              ? '<img class="feeling_image" src="./assets/etc.png" alt="etc" />'
              : ""
            }
            </div>
            <div class="diary_content">
            ${
              element.기분 === "happy"
              ? `<div class="feeling happy">행복해요</div>`
              : ""
            }
            ${
              element.기분 === "sad"
              ? `<div class="feeling sad">슬퍼요</div>`
              : ""
            }
            ${
              element.기분 === "surprise"
              ? `<div class="feeling surprise">놀랐어요</div>`
              : ""
            }
            ${
              element.기분 === "angry"
              ? `<div class="feeling angry">화나요</div>`
              : ""
            }
            ${
              element.기분 === "etc"
              ? `<div class="feeling etc">기타</div>`
              : ""
            }
            <div class="date">${element.작성일}</div>
          </div>
        <div class="title"> ${element.제목}</div>
      </div>
    </a>
    `
  )
  .join("");
};
